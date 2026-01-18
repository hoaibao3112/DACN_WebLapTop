import { Request, Response, NextFunction } from 'express';
import { PaymentService } from '../services/payment.service';
import { HoaDon } from '../models';

const paymentService = new PaymentService();

export class PaymentController {
    /**
     * GET /api/payments/vnpay-return
     * VNPay return URL handler (user redirect)
     */
    /**
     * GET /api/payments/vnpay-return
     * VNPay return URL handler (user redirect)
     */
    async vnpayReturn(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const vnp_Params = req.query;

            // Verify signature
            const isValid = paymentService.verifyVNPayIPN(vnp_Params);

            if (!isValid) {
                res.redirect(`${process.env.FRONTEND_URL}/payment/failed?message=Invalid signature`);
                return;
            }

            const orderCode = vnp_Params.vnp_TxnRef as string;
            const responseCode = vnp_Params.vnp_ResponseCode;

            const order = await HoaDon.findOne({ where: { ma_don_hang: orderCode } });

            if (responseCode === '00') {
                // Payment successful
                if (order) {
                    await order.update({ trangthai: 'Đang giao' });
                }
                res.redirect(`${process.env.FRONTEND_URL}/payment/success?orderId=${order?.id_hoadon || orderCode}`);
            } else {
                // Payment failed
                res.redirect(`${process.env.FRONTEND_URL}/payment/failed?orderId=${order?.id_hoadon || orderCode}`);
            }
        } catch (error) {
            next(error);
        }
    }

    /**
     * GET /api/payments/vnpay-ipn
     * VNPay IPN (Instant Payment Notification) handler
     */
    async vnpayIPN(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const vnp_Params = req.query;

            // Verify signature
            const isValid = paymentService.verifyVNPayIPN(vnp_Params);

            if (!isValid) {
                res.status(200).json({ RspCode: '97', Message: 'Invalid signature' });
                return;
            }

            const orderCode = vnp_Params.vnp_TxnRef as string;
            const responseCode = vnp_Params.vnp_ResponseCode;

            // Check if order exists
            const order = await HoaDon.findOne({ where: { ma_don_hang: orderCode } });
            if (!order) {
                res.status(200).json({ RspCode: '01', Message: 'Order not found' });
                return;
            }

            if (responseCode === '00') {
                // Payment successful - update order status
                await order.update({ trangthai: 'Đang giao' });
                res.status(200).json({ RspCode: '00', Message: 'Success' });
            } else {
                // Payment failed - cancel order
                await order.update({ trangthai: 'Hủy' });
                res.status(200).json({ RspCode: '00', Message: 'Success' });
            }
        } catch (error) {
            res.status(200).json({ RspCode: '99', Message: 'System error' });
        }
    }

    /**
     * GET /api/payments/momo-return
     * MoMo return URL handler (user redirect)
     */
    async momoReturn(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { orderId, resultCode } = req.query;
            const orderCode = orderId as string;

            if (resultCode === '0') {
                // Payment successful
                const order = await HoaDon.findOne({ where: { ma_don_hang: orderCode } });
                if (order) {
                    await order.update({ trangthai: 'Đang giao' });
                }
                res.redirect(`${process.env.FRONTEND_URL}/payment/success?orderId=${order?.id_hoadon || orderCode}`);
            } else {
                // Payment failed
                const order = await HoaDon.findOne({ where: { ma_don_hang: orderCode } });
                res.redirect(`${process.env.FRONTEND_URL}/payment/failed?orderId=${order?.id_hoadon || orderCode}`);
            }
        } catch (error) {
            next(error);
        }
    }

    /**
     * POST /api/payments/momo-ipn
     * MoMo IPN handler
     */
    async momoIPN(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const momoData = req.body;

            // Verify signature
            const isValid = paymentService.verifyMoMoIPN(momoData);

            if (!isValid) {
                res.status(200).json({ resultCode: 97, message: 'Invalid signature' });
                return;
            }

            const orderCode = momoData.orderId as string;
            const resultCode = momoData.resultCode;

            // Check if order exists
            const order = await HoaDon.findOne({ where: { ma_don_hang: orderCode } });
            if (!order) {
                res.status(200).json({ resultCode: 1, message: 'Order not found' });
                return;
            }

            if (resultCode === 0) {
                // Payment successful
                await order.update({ trangthai: 'Đang giao' });
                res.status(200).json({ resultCode: 0, message: 'Success' });
            } else {
                // Payment failed
                await order.update({ trangthai: 'Hủy' });
                res.status(200).json({ resultCode: 0, message: 'Success' });
            }
        } catch (error) {
            res.status(200).json({ resultCode: 99, message: 'System error' });
        }
    }

    /**
     * GET /api/payments/zalopay-return
     * ZaloPay return URL handler (user redirect)
     */
    async zalopayReturn(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { apptransid, status } = req.query;

            // Extract orderCode from apptransid (format: YYYYMMDD_orderCode)
            const orderCode = apptransid?.toString().split('_').slice(1).join('_') || '';

            if (status === '1') {
                // Payment successful
                const order = await HoaDon.findOne({ where: { ma_don_hang: orderCode } });
                if (order) {
                    await order.update({ trangthai: 'Đang giao' });
                }
                res.redirect(`${process.env.FRONTEND_URL}/payment/success?orderId=${order?.id_hoadon || orderCode}`);
            } else {
                // Payment failed
                const order = await HoaDon.findOne({ where: { ma_don_hang: orderCode } });
                res.redirect(`${process.env.FRONTEND_URL}/payment/failed?orderId=${order?.id_hoadon || orderCode}`);
            }
        } catch (error) {
            next(error);
        }
    }

    /**
     * POST /api/payments/zalopay-ipn
     * ZaloPay callback handler
     */
    async zalopayIPN(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const zalopayData = req.body;
            const dataStr = zalopayData.data;
            const reqMac = zalopayData.mac;

            // Verify signature
            const crypto = require('crypto');
            const mac = crypto
                .createHmac('sha256', process.env.ZALOPAY_KEY2 || '')
                .update(dataStr)
                .digest('hex');

            if (mac !== reqMac) {
                res.status(200).json({ return_code: -1, return_message: 'Invalid signature' });
                return;
            }

            // Parse data
            const dataJson = JSON.parse(dataStr);
            const apptransid = dataJson.app_trans_id;
            const orderCode = apptransid.split('_').slice(1).join('_');

            // Check if order exists
            const order = await HoaDon.findOne({ where: { ma_don_hang: orderCode } });
            if (!order) {
                res.status(200).json({ return_code: 2, return_message: 'Order not found' });
                return;
            }

            // Payment successful
            await order.update({ trangthai: 'Đang giao' });

            res.status(200).json({ return_code: 1, return_message: 'Success' });
        } catch (error) {
            res.status(200).json({ return_code: 0, return_message: 'System error' });
        }
    }
}
