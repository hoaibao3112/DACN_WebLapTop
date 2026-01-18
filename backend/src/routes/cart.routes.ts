import { Router } from 'express';
import { CartController } from '../controllers/cart.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();
const cartController = new CartController();

// All cart routes require authentication
router.use(authenticate);

// Get cart
router.get('/', (req, res, next) => cartController.getCart(req as any, res, next));

// Add item to cart
router.post('/items', (req, res, next) => cartController.addItem(req as any, res, next));

// Update cart item
router.put('/items/:id', (req, res, next) => cartController.updateItem(req as any, res, next));

// Remove item from cart
router.delete('/items/:id', (req, res, next) => cartController.removeItem(req as any, res, next));

// Clear cart
router.delete('/', (req, res, next) => cartController.clearCart(req as any, res, next));

export default router;
