import { Router } from 'express';
import { PaymentController } from '../controllers/payment.controller';

const router = Router();
const paymentController = new PaymentController();

/**
 * VNPay Routes
 */
// Return URL - User redirect after payment
router.get('/vnpay-return', (req, res, next) => paymentController.vnpayReturn(req, res, next));

// IPN - Instant Payment Notification from VNPay
router.get('/vnpay-ipn', (req, res, next) => paymentController.vnpayIPN(req, res, next));

/**
 * MoMo Routes
 */
// Return URL - User redirect after payment
router.get('/momo-return', (req, res, next) => paymentController.momoReturn(req, res, next));

// IPN - Instant Payment Notification from MoMo
router.post('/momo-ipn', (req, res, next) => paymentController.momoIPN(req, res, next));

/**
 * ZaloPay Routes
 */
// Return URL - User redirect after payment
router.get('/zalopay-return', (req, res, next) => paymentController.zalopayReturn(req, res, next));

// Callback - Payment notification from ZaloPay
router.post('/zalopay-ipn', (req, res, next) => paymentController.zalopayIPN(req, res, next));

export default router;
