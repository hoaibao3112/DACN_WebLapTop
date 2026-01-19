const crypto = require('crypto');
const https = require('https');

// Test ZaloPay API với sandbox keys
// Keys chính xác từ docs: https://docs.zalopay.vn/v2/start/
const config = {
    app_id: 2553,  // Sandbox App ID (number)
    key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",  // Sandbox Key1
    key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",  // Sandbox Key2
    endpoint: "https://sb-openapi.zalopay.vn/v2/create"
};

async function testZaloPay() {
    const transID = Math.floor(Math.random() * 1000000);
    const embed_data = "{}";
    const items = "[]";
    
    const order = {
        app_id: parseInt(config.app_id),
        app_trans_id: `${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}_${transID}`,
        app_user: "user123",
        app_time: Date.now(),
        item: items,
        embed_data: embed_data,
        amount: 50000,
        description: `Lazada order #${transID}`,
        bank_code: "",
        callback_url: "https://webhook.site/unique-id-here"
    };

    // Create MAC theo đúng định dạng ZaloPay yêu cầu
    const data = config.app_id + "|" + order.app_trans_id + "|" + order.app_user + "|" + order.amount + "|" + order.app_time + "|" + order.embed_data + "|" + order.item;
    order.mac = crypto.createHmac('sha256', config.key1).update(data).digest('hex');

    console.log('📦 Request Data:', JSON.stringify(order, null, 2));
    console.log('🔑 MAC String:', data);
    console.log('\n🔗 Endpoint:', config.endpoint);

    try {
        const querystring = require('querystring');
        const postData = querystring.stringify(order);
        
        console.log('\n📤 POST Data:', postData);
        
        const response = await fetch(config.endpoint, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(postData)
            },
            body: postData
        });
        
        const data = await response.json();
        console.log('\n✅ Response:', JSON.stringify(data, null, 2));
        
        if (data.return_code === 1) {
            console.log('\n🎉 SUCCESS! Payment URL:', data.order_url);
        } else {
            console.log('\n❌ ERROR:', data.return_message);
            console.log('Sub code:', data.sub_return_code);
            console.log('Sub message:', data.sub_return_message);
        }
    } catch (error) {
        console.error('\n💥 Exception:', error.message);
    }
}

testZaloPay();
