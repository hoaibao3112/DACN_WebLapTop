import { Router } from 'express';
import paymentController from '../controllers/payment.controller';

const router = Router();

/**
 * VNPay Routes
 */
// Return URL - User redirect after payment
router.get('/vnpay-return', paymentController.vnpayReturn);

// IPN - Instant Payment Notification from VNPay
router.get('/vnpay-ipn', paymentController.vnpayIPN);

/**
 * MoMo Routes
 */
// Return URL - User redirect after payment
router.get('/momo-return', paymentController.momoReturn);

// IPN - Instant Payment Notification from MoMo
router.post('/momo-ipn', paymentController.momoIPN);

/**
 * ZaloPay Routes
 */
// Return URL - User redirect after payment
router.get('/zalopay-return', paymentController.zalopayReturn);

// Callback - Payment notification from ZaloPay
router.post('/zalopay-ipn', paymentController.zalopayIPN);

export default router;
