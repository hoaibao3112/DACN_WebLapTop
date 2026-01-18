import { Router } from 'express';
import orderController from '../controllers/order.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// All order routes require authentication
router.use(authenticate);

// Create order
router.post('/', orderController.createOrder);

// Get user's orders
router.get('/', orderController.getUserOrders);

// Get order by ID
router.get('/:id', orderController.getOrderById);

// Cancel order
router.put('/:id/cancel', orderController.cancelOrder);

export default router;
