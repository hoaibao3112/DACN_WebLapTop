import { HoaDon, ChiTietHoaDon, TaiKhoan, SanPham, ThongSoKyThuat, VaiTro } from '../models';
import { Op } from 'sequelize';

export class AdminService {
    /**
     * Get dashboard statistics
     */
    async getDashboardStats() {
        const totalRevenue = await HoaDon.sum('tong_tien', {
            where: { trangthai: 'Hoàn thành' }
        });

        const newOrdersCount = await HoaDon.count({
            where: {
                ngay_dat: {
                    [Op.gte]: new Date(new Date().setDate(new Date().getDate() - 1))
                }
            }
        });

        const newCustomersCount = await TaiKhoan.count({
            where: {
                ngay_tao: {
                    [Op.gte]: new Date(new Date().setDate(new Date().getDate() - 30))
                }
            }
        });

        // Top selling brands (mock logic for now based on orders)
        const brandStats = [
            { name: 'Apple MacBook', percentage: 35, color: 'bg-blue-600' },
            { name: 'Dell XPS/Vostro', percentage: 28, color: 'bg-blue-500' },
            { name: 'ASUS ROG/Zenbook', percentage: 20, color: 'bg-blue-400' },
            { name: 'HP Envy/Pavilion', percentage: 12, color: 'bg-blue-300' },
            { name: 'Lenovo ThinkPad', percentage: 5, color: 'bg-blue-200' },
        ];

        return {
            totalRevenue: totalRevenue || 0,
            newOrders: newOrdersCount,
            newCustomers: newCustomersCount,
            brandStats
        };
    }

    /**
     * Get all orders with pagination
     */
    async getAllOrders(page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        const { count, rows } = await HoaDon.findAndCountAll({
            include: [
                {
                    model: TaiKhoan,
                    as: 'taikhoan',
                    attributes: ['hoten', 'email']
                }
            ],
            limit,
            offset,
            order: [['ngay_dat', 'DESC']]
        });

        return {
            orders: rows,
            pagination: {
                total: count,
                page,
                limit,
                totalPages: Math.ceil(count / limit)
            }
        };
    }

    /**
     * Get all users (customers) with pagination
     */
    async getAllUsers(page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        const { count, rows } = await TaiKhoan.findAndCountAll({
            attributes: { exclude: ['matkhau'] },
            include: [
                {
                    model: VaiTro,
                    as: 'vaitros',
                    where: { ten_vaitro: 'Customer' },
                    required: false // If we want all users, adjust this
                }
            ],
            limit,
            offset,
            order: [['ngay_tao', 'DESC']]
        });

        return {
            users: rows,
            pagination: {
                total: count,
                page,
                limit,
                totalPages: Math.ceil(count / limit)
            }
        };
    }

    /**
     * Update order status
     */
    async updateOrderStatus(orderId: number, status: string) {
        const order = await HoaDon.findByPk(orderId);
        if (!order) {
            throw new Error('Order not found');
        }
        await order.update({ trangthai: status as any });
        return order;
    }

    /**
     * Toggle user status (active/inactive)
     */
    async toggleUserStatus(userId: number) {
        const user = await TaiKhoan.findByPk(userId);
        if (!user) {
            throw new Error('User not found');
        }
        await user.update({ trangthai: !user.trangthai });
        return user;
    }
}

export default new AdminService();
