import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
import { OrderService } from '../services/order.service';
import { PaymentService } from '../services/payment.service';

const orderService = new OrderService();
const paymentService = new PaymentService();

export class OrderController {
    /**
     * POST /api/orders
     * Create new order
     */
    createOrder = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.user!.id;
            const {
                hoten,
                sodienthoai,
                email,
                diachi,
                ghichu,
                payment_method,
                items,
            } = req.body;

            // Validate
            if (!hoten || !sodienthoai || !diachi || !payment_method) {
                res.status(400).json({
                    success: false,
                    message: 'Missing required fields',
                });
                return;
            }

            // Create order
            const order = await orderService.createOrderWithPayment(userId, {
                hoten,
                sodienthoai,
                email,
                diachi,
                ghichu,
                payment_method,
                items,
            });

            // Generate payment URL if needed
            let payment_url = null;
            let payment_error = null;
            const clientIp = req.ip || req.socket.remoteAddress || '127.0.0.1';

            // Try to generate payment URL, but don't fail order creation if payment gateway is down
            try {
                if (payment_method === 'VNPAY') {
                    payment_url = paymentService.createVNPayUrl(
                        order.ma_don_hang,
                        Number(order.tongtien),
                        `Thanh toan don hang ${order.ma_don_hang}`,
                        clientIp
                    );
                } else if (payment_method === 'MOMO') {
                    payment_url = await paymentService.createMoMoUrl(
                        order.ma_don_hang,
                        Number(order.tongtien),
                        `Thanh toan don hang ${order.ma_don_hang}`
                    );
                } else if (payment_method === 'ZALOPAY') {
                    payment_url = await paymentService.createZaloPayUrl(
                        order.ma_don_hang,
                        Number(order.tongtien),
                        `Thanh toan don hang ${order.ma_don_hang}`
                    );
                } else if (payment_method === 'VIETQR') {
                    payment_url = paymentService.generateVietQR(order.id_hoadon, Number(order.tongtien));
                }
            } catch (paymentError: unknown) {
                console.error('Payment gateway error:', paymentError);
                payment_error = paymentError instanceof Error ? paymentError.message : 'Payment gateway temporarily unavailable';
                // Don't throw - order is created successfully, just payment URL generation failed
            }

            res.status(201).json({
                success: true,
                message: payment_error
                    ? `Order created successfully, but ${payment_error}. Please contact support or use another payment method.`
                    : 'Order created successfully',
                data: {
                    order,
                    payment_url,
                    payment_error: payment_error || undefined,
                },
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * GET /api/orders
     * Get user's orders
     */
    getUserOrders = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.user!.id;
            const orders = await orderService.getUserOrders(userId);

            res.status(200).json({
                success: true,
                message: 'Orders retrieved successfully',
                data: orders,
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * GET /api/orders/:id
     * Get order by ID
     */
    getOrderById = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.user!.id;
            const orderId = parseInt(req.params.id);

            if (isNaN(orderId) || orderId <= 0) {
                res.status(400).json({
                    success: false,
                    message: 'Invalid order ID',
                });
                return;
            }

            const order = await orderService.getOrderById(orderId, userId);

            res.status(200).json({
                success: true,
                message: 'Order retrieved successfully',
                data: order,
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * PUT /api/orders/:id/cancel
     * Cancel order
     */
    cancelOrder = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.user!.id;
            const orderId = parseInt(req.params.id);

            if (isNaN(orderId) || orderId <= 0) {
                res.status(400).json({
                    success: false,
                    message: 'Invalid order ID',
                });
                return;
            }

            const order = await orderService.cancelOrder(orderId, userId);

            res.status(200).json({
                success: true,
                message: 'Order cancelled successfully',
                data: order,
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new OrderController();
