import { Router } from 'express';
import adminController from '../controllers/admin.controller';
import { authenticate } from '../middleware/auth.middleware';
import { requirePermission } from '../middleware/rbac.middleware';

const router = Router();

// All admin routes require authentication and specific permissions
router.use(authenticate);

/**
 * @route   GET /api/admin/stats
 * @desc    Get dashboard statistics
 */
router.get('/stats', requirePermission('dashboard.view'), adminController.getStats);

/**
 * @route   GET /api/admin/orders
 * @desc    Get all orders
 */
router.get('/orders', requirePermission('order.view'), adminController.getOrders);
router.patch('/orders/:id', requirePermission('order.view'), adminController.updateOrder);

/**
 * @route   GET /api/admin/users
 * @desc    Get all users
 */
router.get('/users', requirePermission('user.view'), adminController.getUsers);
router.patch('/users/:id', requirePermission('user.view'), adminController.toggleUser);

export default router;
