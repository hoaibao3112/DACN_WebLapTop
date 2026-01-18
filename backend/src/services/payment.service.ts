import crypto from 'crypto';
import querystring from 'querystring';
import { env } from '../config/env';

export class PaymentService {
    /**
     * Create VNPay payment URL
     */
    createVNPayUrl(orderCode: string, amount: number, orderInfo: string, ipAddr: string): string {
        const vnp_TmnCode = env.VNP_TMN_CODE;
        const vnp_HashSecret = env.VNP_HASH_SECRET;
        const vnp_Url = env.VNP_URL;
        const vnp_ReturnUrl = env.VNP_RETURN_URL;

        // Fix IPv6 loopback
        if (ipAddr === '::1' || ipAddr === '::ffff:127.0.0.1') {
            ipAddr = '127.0.0.1';
        }

        // Use Vietnam timezone (GMT+7)
        const date = new Date(new Date().getTime() + 7 * 60 * 60 * 1000);
        const createDate = date.toISOString().replace(/[-:T.]/g, '').slice(0, 14);

        const expireDateObj = new Date(date.getTime() + 15 * 60 * 1000);
        const expireDate = expireDateObj.toISOString().replace(/[-:T.]/g, '').slice(0, 14);

        let vnp_Params: any = {
            vnp_Version: '2.1.0',
            vnp_Command: 'pay',
            vnp_TmnCode: vnp_TmnCode,
            vnp_Locale: 'vn',
            vnp_CurrCode: 'VND',
            vnp_TxnRef: orderCode,
            vnp_OrderInfo: orderInfo,
            vnp_OrderType: 'other',
            vnp_Amount: Math.floor(amount) * 100,
            vnp_ReturnUrl: vnp_ReturnUrl,
            vnp_IpAddr: ipAddr,
            vnp_CreateDate: createDate,
            vnp_ExpireDate: expireDate,
        };

        vnp_Params = this.sortObject(vnp_Params);

        const signData = querystring.stringify(vnp_Params);
        const hmac = crypto.createHmac('sha512', vnp_HashSecret);
        const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
        vnp_Params['vnp_SecureHash'] = signed;

        return vnp_Url + '?' + querystring.stringify(vnp_Params);
    }

    /**
     * Create MoMo payment URL
     */
    async createMoMoUrl(orderCode: string, amount: number, orderInfo: string): Promise<string> {
        const partnerCode = env.MOMO_PARTNER_CODE;
        const accessKey = env.MOMO_ACCESS_KEY;
        const secretKey = env.MOMO_SECRET_KEY;
        const requestId = `${orderCode}_${Date.now()}`;
        const redirectUrl = env.MOMO_REDIRECT_URL;
        const ipnUrl = env.MOMO_IPN_URL;
        const requestType = 'captureWallet';
        const extraData = '';

        const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderCode}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
        const signature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');

        const requestBody = {
            partnerCode,
            accessKey,
            requestId,
            amount,
            orderId: orderCode,
            orderInfo,
            redirectUrl,
            ipnUrl,
            extraData,
            requestType,
            signature,
            lang: 'vi',
        };

        try {
            const response = await fetch(env.MOMO_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody),
            });

            const data = await response.json() as any;

            if (data.resultCode === 0) {
                return data.payUrl;
            } else {
                console.error('MoMo API Error:', data);
                // Throw the specific message from MoMo for clarity (e.g., amount limit)
                throw new Error(data.localMessage || data.message || `MoMo payment failed: ${data.resultCode}`);
            }
        } catch (error: any) {
            console.error('MoMo Connection Error:', error);
            // If it's already an Error with a specific message from MoMo, rethrow it
            if (error.message && !error.message.includes('fetch')) {
                throw error;
            }
            throw new Error(`Cannot connect to MoMo: ${error.message || 'Network error'}`);
        }
    }

    /**
     * Create ZaloPay payment URL
     */
    async createZaloPayUrl(orderCode: string, amount: number, orderInfo: string): Promise<string> {
        const appid = parseInt(env.ZALOPAY_APP_ID);
        const key1 = env.ZALOPAY_KEY1;
        const endpoint = env.ZALOPAY_ENDPOINT;

        const transID = `${Date.now()}`;
        const apptime = Date.now();
        const embeddata = JSON.stringify({});
        const item = JSON.stringify([]);

        const order: any = {
            app_id: appid,
            app_trans_id: `${new Date().getFullYear()}${new Date().getMonth() + 1}${new Date().getDate()}_${orderCode}`,
            app_user: 'user123',
            app_time: apptime,
            item: item,
            embed_data: embeddata,
            amount: amount,
            description: orderInfo,
            bank_code: '',
            callback_url: env.ZALOPAY_IPN_URL,
        };

        const data =
            appid +
            '|' +
            order.app_trans_id +
            '|' +
            order.app_user +
            '|' +
            order.amount +
            '|' +
            order.app_time +
            '|' +
            order.embed_data +
            '|' +
            order.item;
        order.mac = crypto.createHmac('sha256', key1).update(data).digest('hex');

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: querystring.stringify(order),
            });

            const result = await response.json() as any;

            if (result.return_code === 1) {
                return result.order_url;
            } else {
                throw new Error(result.return_message || 'ZaloPay payment creation failed');
            }
        } catch (error) {
            throw new Error('Cannot connect to ZaloPay');
        }
    }

    /**
     * Generate VietQR code
     */
    generateVietQR(orderId: number, amount: number): string {
        // VietQR format: BankID|AccountNumber|Template|Amount|Description|AccountName
        const bankId = '970422'; // MB Bank (có thể thay đổi)
        const accountNo = '0123456789'; // Số tài khoản (cần cấu hình thật)
        const template = 'compact2';
        const description = `DH${orderId}`;
        const accountName = 'LAPTOP SHOP';

        // Generate QR URL (sử dụng API VietQR)
        const qrUrl = `https://img.vietqr.io/image/${bankId}-${accountNo}-${template}.png?amount=${amount}&addInfo=${encodeURIComponent(description)}&accountName=${encodeURIComponent(accountName)}`;

        return qrUrl;
    }

    /**
     * Verify VNPay IPN
     */
    verifyVNPayIPN(vnp_Params: any): boolean {
        const secureHash = vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];

        vnp_Params = this.sortObject(vnp_Params);

        const signData = querystring.stringify(vnp_Params);
        const hmac = crypto.createHmac('sha512', env.VNP_HASH_SECRET);
        const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

        return secureHash === signed;
    }

    /**
     * Verify MoMo IPN
     */
    verifyMoMoIPN(data: any): boolean {
        const {
            partnerCode,
            orderId,
            requestId,
            amount,
            orderInfo,
            orderType,
            transId,
            resultCode,
            message,
            payType,
            responseTime,
            extraData,
            signature,
        } = data;

        const rawSignature = `accessKey=${env.MOMO_ACCESS_KEY}&amount=${amount}&extraData=${extraData}&message=${message}&orderId=${orderId}&orderInfo=${orderInfo}&orderType=${orderType}&partnerCode=${partnerCode}&payType=${payType}&requestId=${requestId}&responseTime=${responseTime}&resultCode=${resultCode}&transId=${transId}`;
        const expectedSignature = crypto
            .createHmac('sha256', env.MOMO_SECRET_KEY)
            .update(rawSignature)
            .digest('hex');

        return signature === expectedSignature;
    }

    private sortObject(obj: any): any {
        const sorted: any = {};
        const keys = Object.keys(obj).sort();
        keys.forEach((key) => {
            sorted[key] = obj[key];
        });
        return sorted;
    }
}
