import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
import { CartService } from '../services/cart.service';

const cartService = new CartService();

export class CartController {
    /**
     * GET /api/cart
     * Get user's cart
     */
    getCart = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.user!.id;
            const cart = await cartService.getCart(userId);

            res.status(200).json({
                success: true,
                message: 'Cart retrieved successfully',
                data: cart,
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * POST /api/cart/items
     * Add item to cart
     */
    addItem = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.user!.id;
            const { thongsokythuat_id, soluong } = req.body;

            const cart = await cartService.addItem(userId, thongsokythuat_id, soluong);

            res.status(200).json({
                success: true,
                message: 'Item added to cart successfully',
                data: cart,
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * PUT /api/cart/items/:id
     * Update cart item quantity
     */
    updateItem = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.user!.id;
            const itemId = parseInt(req.params.id);

            if (isNaN(itemId) || itemId <= 0) {
                res.status(400).json({
                    success: false,
                    message: 'Invalid item ID',
                });
                return;
            }

            const { soluong } = req.body;

            const cart = await cartService.updateItem(userId, itemId, soluong);

            res.status(200).json({
                success: true,
                message: 'Cart item updated successfully',
                data: cart,
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * DELETE /api/cart/items/:id
     * Remove item from cart
     */
    removeItem = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.user!.id;
            const itemId = parseInt(req.params.id);

            if (isNaN(itemId) || itemId <= 0) {
                res.status(400).json({
                    success: false,
                    message: 'Invalid item ID',
                });
                return;
            }

            await cartService.removeItem(userId, itemId);

            res.status(200).json({
                success: true,
                message: 'Item removed from cart successfully',
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * DELETE /api/cart
     * Clear cart
     */
    clearCart = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.user!.id;

            await cartService.clearCart(userId);

            res.status(200).json({
                success: true,
                message: 'Cart cleared successfully',
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new CartController();
