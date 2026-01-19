import crypto from 'crypto';
import moment from 'moment';

// APP INFO, xem trong portal: https://docs.zalopay.vn/v2
const config = {
  app_id: "2553",
  key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
  key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
  endpoint: "https://sb-openapi.zalopay.vn/v2/create"
};

const embed_data = {
  redirecturl: "https://docs.zalopay.vn/result"
};

const items = [];
const transID = Math.floor(Math.random() * 1000000);

const order = {
  app_id: config.app_id,
  app_trans_id: `${moment().format('YYMMDD')}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
  app_user: "user123",
  app_time: Date.now(), // miliseconds
  item: JSON.stringify(items),
  embed_data: JSON.stringify(embed_data),
  amount: 50000,
  //description: `Lazada - Payment for the order #${transID}`,
  description: `Lazada - Thanh toán cho đơn hàng #${transID}`,
  bank_code: "",
  callback_url: "https://b074-1-53-37-194.ngrok-free.app/callback"
};

// appid|app_trans_id|appuser|amount|apptime|embeddata|item
const data = config.app_id + "|" + order.app_trans_id + "|" + order.app_user + "|" + order.amount + "|" + order.app_time + "|" + order.embed_data + "|" + order.item;
order.mac = crypto.createHmac('sha256', config.key1).update(data).digest('hex');

console.log(order);

try {
  const response = await fetch(config.endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams(order).toString()
  });

  const result = await response.json();
  console.log(result);
} catch (error) {
  console.log(error);
}
