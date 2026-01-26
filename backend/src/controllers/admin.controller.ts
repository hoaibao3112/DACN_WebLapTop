import { Request, Response, NextFunction } from 'express';
import adminService from '../services/admin.service';

export class AdminController {
    /**
     * Get dashboard statistics
     */
    async getStats(req: Request, res: Response, next: NextFunction) {
        try {
            const stats = await adminService.getDashboardStats();
            res.json({
                success: true,
                data: stats,
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Get all orders
     */
    async getOrders(req: Request, res: Response, next: NextFunction) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const result = await adminService.getAllOrders(page, limit);
            res.json({
                success: true,
                ...result,
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Get all users
     */
    async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const result = await adminService.getAllUsers(page, limit);
            res.json({
                success: true,
                ...result,
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Update order status
     */
    async updateOrder(req: Request, res: Response, next: NextFunction) {
        try {
            const orderId = parseInt(req.params.id);
            const { status } = req.body;
            const order = await adminService.updateOrderStatus(orderId, status);
            res.json({
                success: true,
                data: order,
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Toggle user status
     */
    async toggleUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = parseInt(req.params.id);
            const user = await adminService.toggleUserStatus(userId);
            res.json({
                success: true,
                data: user,
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new AdminController();
