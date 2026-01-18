// Test MoMo API Connection
// Run: node test-momo.js

const crypto = require('crypto');

const testMoMo = async () => {
    const partnerCode = 'MOMO';
    const accessKey = 'F8BBA842ECF85';
    const secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
    const requestId = `test_${Date.now()}`;
    const orderId = '123';
    const amount = 50000;
    const orderInfo = 'Test order';
    const redirectUrl = 'http://localhost:5000/payments/momo-return';
    const ipnUrl = 'http://localhost:5000/payments/momo-ipn';
    const requestType = 'captureWallet';
    const extraData = '';

    const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
    const signature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');

    const requestBody = {
        partnerCode,
        accessKey,
        requestId,
        amount,
        orderId,
        orderInfo,
        redirectUrl,
        ipnUrl,
        extraData,
        requestType,
        signature,
        lang: 'vi',
    };

    console.log('Testing MoMo API...');
    console.log('Request Body:', JSON.stringify(requestBody, null, 2));

    try {
        const response = await fetch('https://test-payment.momo.vn/v2/gateway/api/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody),
        });

        const data = await response.json();
        console.log('\n✅ MoMo Response:');
        console.log(JSON.stringify(data, null, 2));

        if (data.resultCode === 0) {
            console.log('\n✅ SUCCESS! Payment URL:', data.payUrl);
        } else {
            console.log('\n❌ FAILED! Result Code:', data.resultCode);
            console.log('Message:', data.message);
        }
    } catch (error) {
        console.error('\n❌ Connection Error:', error.message);
    }
};

testMoMo();
