import { PaymentService } from './src/services/payment.service';
import dotenv from 'dotenv';
dotenv.config();

const paymentService = new PaymentService();

async function testVNPay() {
    console.log('--- Testing VNPay URL Generation ---');
    try {
        const orderId = 123456;
        const amount = 50000;
        const orderInfo = 'Thanh toan don hang test';
        const ipAddr = '::1';

        const url = paymentService.createVNPayUrl(orderId, amount, orderInfo, ipAddr);
        console.log('Generated URL:', url);

        // Check for required components
        if (!url.includes('vnp_TmnCode=')) console.error('Missing TmnCode');
        if (!url.includes('vnp_SecureHash=')) console.error('Missing SecureHash');
        if (!url.includes('vnp_IpAddr=127.0.0.1')) console.error('IP address not fixed correctly');

        const params = new URL(url).searchParams;
        const createDate = params.get('vnp_CreateDate');
        console.log('vnp_CreateDate:', createDate);

        // Basic check for GMT+7 date (should be around now)
        // Note: this depends on local time vs GMT+7
        console.log('Current ISO time (UTC):', new Date().toISOString());

        console.log('Done.');
    } catch (error) {
        console.error('Error during test:', error);
    }
}

testVNPay();
