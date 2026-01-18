import { HoaDon, ChiTietHoaDon, GioHang, ChiTietGioHang, ThongSoKyThuat, DiaChi, SanPham } from '../models';
import { CartService } from './cart.service';
import { sequelize } from '../config/database';

const cartService = new CartService();

export class OrderService {
    /**
     * Create order with payment method
     */
    async createOrderWithPayment(
        userId: number,
        orderData: {
            hoten: string;
            sodienthoai: string;
            email?: string;
            diachi: string;
            ghichu?: string;
            payment_method: 'COD' | 'VNPAY' | 'MOMO' | 'ZALOPAY' | 'VIETQR';
            items: Array<{
                thongsokythuat_id: number;
                soluong: number;
            }>;
        }
    ) {
        const transaction = await sequelize.transaction();

        try {
            // Calculate total from items
            let totalAmount = 0;
            for (const item of orderData.items) {
                const variant = await ThongSoKyThuat.findByPk(item.thongsokythuat_id, { transaction });
                if (!variant) {
                    throw new Error(`Product variant ${item.thongsokythuat_id} not found`);
                }
                if (variant.ton_kho < item.soluong) {
                    throw new Error(`Insufficient stock for product ${variant.ten_hienthi}`);
                }
                totalAmount += variant.gia_ban * item.soluong;
            }

            // Map payment method to database enum
            let hinhthuc_thanhtoan: 'COD' | 'Chuyển khoản' | 'VNPay' | 'MoMo' | 'ZaloPay';
            switch (orderData.payment_method) {
                case 'COD':
                    hinhthuc_thanhtoan = 'COD';
                    break;
                case 'VNPAY':
                    hinhthuc_thanhtoan = 'VNPay';
                    break;
                case 'MOMO':
                    hinhthuc_thanhtoan = 'MoMo';
                    break;
                case 'ZALOPAY':
                    hinhthuc_thanhtoan = 'ZaloPay';
                    break;
                case 'VIETQR':
                    hinhthuc_thanhtoan = 'Chuyển khoản';
                    break;
                default:
                    hinhthuc_thanhtoan = 'COD';
            }

            // Create order
            const order = await HoaDon.create(
                {
                    ma_don_hang: `DH${Date.now()}`,
                    taikhoan_id: userId,
                    tong_tien: totalAmount,
                    trangthai: 'Chờ duyệt',
                    hinhthuc_thanhtoan,
                    ngay_dat: new Date(),
                },
                { transaction }
            );

            // Create order items and update stock
            for (const item of orderData.items) {
                const variant = await ThongSoKyThuat.findByPk(item.thongsokythuat_id, { transaction });

                await ChiTietHoaDon.create(
                    {
                        hoadon_id: order.id_hoadon,
                        thongsokythuat_id: item.thongsokythuat_id,
                        soluong: item.soluong,
                        gia_luc_mua: variant!.gia_ban,
                    },
                    { transaction }
                );

                // Update product stock
                await ThongSoKyThuat.decrement('ton_kho', {
                    by: item.soluong,
                    where: { id_thongsokythuat: item.thongsokythuat_id },
                    transaction,
                });
            }

            await transaction.commit();

            // Return order with details
            return {
                id_hoadon: order.id_hoadon,
                ma_don_hang: order.ma_don_hang,
                tongtien: order.tong_tien,
                trangthai: order.trangthai,
                hinhthuc_thanhtoan: order.hinhthuc_thanhtoan,
            };
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    /**
     * Create order from cart
     */
    async createOrder(
        userId: number,
        addressId: number | undefined,
        paymentMethod: 'cod' | 'banking' | 'e-wallet',
        note?: string
    ) {
        const transaction = await sequelize.transaction();

        try {
            // Get cart with items
            const cart = await GioHang.findOne({
                where: { taikhoan_id: userId },
                include: [
                    {
                        model: ChiTietGioHang,
                        as: 'items',
                        include: [{ model: ThongSoKyThuat, as: 'thongsokythuat' }],
                    },
                ],
                transaction,
            });

            if (!cart || !(cart as any).items || (cart as any).items.length === 0) {
                throw new Error('Cart is empty');
            }

            // Validate address if provided
            if (addressId) {
                const address = await DiaChi.findOne({
                    where: { id_diachi: addressId, ma_tk: userId },
                    transaction,
                });
                if (!address) {
                    throw new Error('Address not found');
                }
            }

            // Calculate total
            let totalAmount = 0;
            for (const item of (cart as any).items) {
                // Validate stock
                const variant = await ThongSoKyThuat.findByPk(item.thongsokythuat_id, { transaction });
                if (!variant) {
                    throw new Error(`Product variant ${item.thongsokythuat_id} not found`);
                }
                if (variant.ton_kho < item.soluong) {
                    throw new Error(`Insufficient stock for product ${variant.ten_hienthi}`);
                }

                totalAmount += variant.gia_ban * item.soluong;
            }

            // Create order
            const order = await HoaDon.create(
                {
                    ma_don_hang: `DH${Date.now()}`,
                    taikhoan_id: userId,
                    tong_tien: totalAmount,
                    trangthai: 'Chờ duyệt',
                    hinhthuc_thanhtoan: paymentMethod === 'cod' ? 'COD' : paymentMethod === 'banking' ? 'Chuyển khoản' : 'VNPay',
                    ngay_dat: new Date(),
                },
                { transaction }
            );

            // Create order items and update stock
            for (const item of (cart as any).items) {
                await ChiTietHoaDon.create(
                    {
                        hoadon_id: order.id_hoadon,
                        thongsokythuat_id: item.thongsokythuat_id,
                        soluong: item.soluong,
                        gia_luc_mua: (await ThongSoKyThuat.findByPk(item.thongsokythuat_id))!.gia_ban,
                    },
                    { transaction }
                );

                // Update product stock
                await ThongSoKyThuat.decrement(
                    'ton_kho',
                    {
                        by: item.soluong,
                        where: { id_thongsokythuat: item.thongsokythuat_id },
                        transaction,
                    }
                );
            }

            // Clear cart
            await ChiTietGioHang.destroy({
                where: { giohang_id: cart.id_giohang },
                transaction,
            });

            await transaction.commit();

            // Return order with details
            return await this.getOrderById(order.id_hoadon, userId);
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    /**
     * Get user's orders
     */
    async getUserOrders(userId: number) {
        const orders = await HoaDon.findAll({
            where: { taikhoan_id: userId },
            include: [
                {
                    model: ChiTietHoaDon,
                    as: 'items',
                    include: [
                        {
                            model: ThongSoKyThuat,
                            as: 'thongsokythuat',
                            include: [
                                {
                                    model: SanPham,
                                    as: 'sanpham',
                                },
                            ],
                        },
                    ],
                },
            ],
            order: [['ngay_dat', 'DESC']],
        });

        // Serialize for frontend
        return orders.map(order => this.serializeOrder(order));
    }

    /**
     * Serialize order for frontend
     */
    private serializeOrder(order: any) {
        const plainOrder = order.toJSON ? order.toJSON() : order;

        // Map status
        const statusMap: Record<string, string> = {
            'Chờ duyệt': 'pending',
            'Đang giao': 'shipping',
            'Hoàn thành': 'delivered',
            'Hủy': 'cancelled',
        };

        // Map payment method
        const paymentMap: Record<string, string> = {
            'COD': 'cod',
            'Chuyển khoản': 'banking',
            'VNPay': 'banking',
            'MoMo': 'e-wallet',
            'ZaloPay': 'e-wallet',
        };

        return {
            ma_hoa_don: plainOrder.id_hoadon,
            ma_tai_khoan: plainOrder.taikhoan_id,
            tong_tien: parseFloat(plainOrder.tong_tien),
            trang_thai: statusMap[plainOrder.trangthai] || 'pending',
            phuong_thuc_thanh_toan: paymentMap[plainOrder.hinhthuc_thanhtoan] || 'cod',
            ngay_dat: plainOrder.ngay_dat,
            chi_tiet_hoa_don: plainOrder.items?.map((item: any) => {
                const product = item.thongsokythuat?.sanpham;
                return {
                    ma_chi_tiet: item.id_cthoadon,
                    ma_hoa_don: item.hoadon_id,
                    ma_san_pham: item.thongsokythuat_id,
                    so_luong: item.soluong,
                    don_gia: parseFloat(item.gia_luc_mua),
                    san_pham: item.thongsokythuat ? {
                        ma_san_pham: item.thongsokythuat.id_sanpham,
                        ten_san_pham: product?.ten_sanpham || item.thongsokythuat.ten_hienthi,
                        thuong_hieu: product?.thuonghieu || '',
                        hinh_anh: product?.anh_daidien || null,
                    } : null,
                };
            }) || [],
        };
    }

    /**
     * Get order by ID
     */
    async getOrderById(orderId: number, userId: number) {
        const order = await HoaDon.findOne({
            where: {
                id_hoadon: orderId,
                taikhoan_id: userId,
            },
            include: [
                {
                    model: ChiTietHoaDon,
                    as: 'items',
                    include: [
                        {
                            model: ThongSoKyThuat,
                            as: 'thongsokythuat',
                            include: [
                                {
                                    model: SanPham,
                                    as: 'sanpham',
                                },
                            ],
                        },
                    ],
                },
            ],
        });

        if (!order) {
            throw new Error('Order not found');
        }

        return this.serializeOrder(order);
    }

    /**
     * Cancel order
     */
    async cancelOrder(orderId: number, userId: number) {
        const transaction = await sequelize.transaction();

        try {
            const order = await HoaDon.findOne({
                where: {
                    id_hoadon: orderId,
                    taikhoan_id: userId,
                },
                include: [
                    {
                        model: ChiTietHoaDon,
                        as: 'items',
                    },
                ],
                transaction,
            });

            if (!order) {
                throw new Error('Order not found');
            }

            if (order.trangthai !== 'Chờ duyệt') {
                throw new Error('Order cannot be cancelled');
            }

            // Update order status
            await order.update({ trangthai: 'Hủy' }, { transaction });

            // Restore product stock
            if ((order as any).items) {
                for (const item of (order as any).items) {
                    await ThongSoKyThuat.increment(
                        'ton_kho',
                        {
                            by: item.soluong,
                            where: { id_thongsokythuat: item.thongsokythuat_id },
                            transaction,
                        }
                    );
                }
            }

            await transaction.commit();

            return await this.getOrderById(orderId, userId);
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}
