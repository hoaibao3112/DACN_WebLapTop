require('dotenv').config();
const crypto = require('crypto');
const querystring = require('querystring');

// ZaloPay Test
async function testZaloPay() {
    console.log('🧪 Testing ZaloPay Integration...\n');

    const appid = parseInt(process.env.ZALOPAY_APP_ID);
    const key1 = process.env.ZALOPAY_KEY1;
    const endpoint = process.env.ZALOPAY_ENDPOINT;

    console.log('📋 Config:');
    console.log('APP_ID:', appid);
    console.log('ENDPOINT:', endpoint);
    console.log('KEY1:', key1 ? '***' + key1.substring(key1.length - 4) : 'NOT SET');
    console.log('');

    const testOrderCode = 'TEST' + Date.now();
    const apptime = Date.now();
    const embeddata = JSON.stringify({});
    const item = JSON.stringify([]);

    const order = {
        app_id: appid,
        app_trans_id: `${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}_${testOrderCode}`,
        app_user: 'user123',
        app_time: apptime,
        item: item,
        embed_data: embeddata,
        amount: 50000,
        description: 'Test payment - Do not pay',
        bank_code: '',
        callback_url: process.env.ZALOPAY_IPN_URL,
    };

    const data = appid + '|' + order.app_trans_id + '|' + order.app_user + '|' + order.amount + '|' + order.app_time + '|' + order.embed_data + '|' + order.item;
    order.mac = crypto.createHmac('sha256', key1).update(data).digest('hex');

    console.log('📦 Order Data:');
    console.log('app_trans_id:', order.app_trans_id);
    console.log('amount:', order.amount);
    console.log('mac:', order.mac);
    console.log('');

    try {
        console.log('🚀 Sending request to ZaloPay...\n');

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: querystring.stringify(order),
        });

        const result = await response.json();

        console.log('📨 Response from ZaloPay:');
        console.log(JSON.stringify(result, null, 2));
        console.log('');

        if (result.return_code === 1) {
            console.log('✅ SUCCESS! ZaloPay credentials work!');
            console.log('Payment URL:', result.order_url);
        } else {
            console.log('❌ FAILED! Error from ZaloPay:');
            console.log('Return code:', result.return_code);
            console.log('Message:', result.return_message);
            console.log('Sub return code:', result.sub_return_code);
            console.log('Sub return message:', result.sub_return_message);
        }
    } catch (error) {
        console.error('❌ Network Error:', error.message);
    }
}

// VietQR Test
function testVietQR() {
    console.log('\n\n🧪 Testing VietQR Integration...\n');

    const bankId = '970422'; // MB Bank
    const accountNo = '0123456789';
    const template = 'compact2';
    const description = 'DH12345';
    const accountName = 'LAPTOP SHOP';
    const amount = 50000;

    const qrUrl = `https://img.vietqr.io/image/${bankId}-${accountNo}-${template}.png?amount=${amount}&addInfo=${encodeURIComponent(description)}&accountName=${encodeURIComponent(accountName)}`;

    console.log('📋 VietQR Config:');
    console.log('Bank ID:', bankId);
    console.log('Account:', accountNo);
    console.log('Amount:', amount);
    console.log('');
    console.log('✅ VietQR URL Generated:');
    console.log(qrUrl);
    console.log('');
    console.log('⚠️  Note: VietQR does not have sandbox.');
    console.log('⚠️  This QR code is REAL - if scanned, money will be transferred!');
    console.log('⚠️  For demo purposes, use a fake account number or your real bank account.');
}

// Run tests
(async () => {
    await testZaloPay();
    testVietQR();
})();
