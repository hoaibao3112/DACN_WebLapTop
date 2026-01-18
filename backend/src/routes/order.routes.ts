import { Router } from 'express';
import { OrderController } from '../controllers/order.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();
const orderController = new OrderController();

// All order routes require authentication
router.use(authenticate);

// Create order
router.post('/', (req, res, next) => orderController.createOrder(req as any, res, next));

// Get user's orders
router.get('/', (req, res, next) => orderController.getOrders(req as any, res, next));

// Get order by ID
router.get('/:id', (req, res, next) => orderController.getOrderById(req as any, res, next));

// Cancel order
router.put('/:id/cancel', (req, res, next) => orderController.cancelOrder(req as any, res, next));

export default router;
