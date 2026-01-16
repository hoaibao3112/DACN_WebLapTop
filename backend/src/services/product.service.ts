import { SanPham, ThongSoKyThuat, DanhMuc } from '../models';
import { AppError } from '../middleware/error.middleware';
import { Op } from 'sequelize';

export class ProductService {
    /**
     * Get all products with pagination and filters
     */
    async getAllProducts(filters: {
        page?: number;
        limit?: number;
        danhmuc_id?: number;
        thuonghieu?: string;
        search?: string;
    }) {
        const page = filters.page || 1;
        const limit = filters.limit || 10;
        const offset = (page - 1) * limit;

        const where: any = {};

        if (filters.danhmuc_id) {
            where.danhmuc_id = filters.danhmuc_id;
        }

        if (filters.thuonghieu) {
            where.thuonghieu = filters.thuonghieu;
        }

        if (filters.search) {
            where.ten_sanpham = {
                [Op.like]: `%${filters.search}%`,
            };
        }

        const { count, rows } = await SanPham.findAndCountAll({
            where,
            include: [
                {
                    model: DanhMuc,
                    as: 'danhmuc',
                },
                {
                    model: ThongSoKyThuat,
                    as: 'thongsokythuats',
                },
            ],
            limit,
            offset,
            order: [['ngay_capnhat', 'DESC']],
        });

        return {
            products: rows,
            pagination: {
                page,
                limit,
                total: count,
                totalPages: Math.ceil(count / limit),
            },
        };
    }

    /**
     * Get product by ID
     */
    async getProductById(id: number) {
        const product = await SanPham.findByPk(id, {
            include: [
                {
                    model: DanhMuc,
                    as: 'danhmuc',
                },
                {
                    model: ThongSoKyThuat,
                    as: 'thongsokythuats',
                },
            ],
        });

        if (!product) {
            throw new AppError('Product not found', 404);
        }

        return product;
    }

    /**
     * Create new product
     */
    async createProduct(data: any) {
        const product = await SanPham.create(data);
        return product;
    }

    /**
     * Update product
     */
    async updateProduct(id: number, data: any) {
        const product = await SanPham.findByPk(id);

        if (!product) {
            throw new AppError('Product not found', 404);
        }

        await product.update(data);
        return product;
    }

    /**
     * Delete product
     */
    async deleteProduct(id: number) {
        const product = await SanPham.findByPk(id);

        if (!product) {
            throw new AppError('Product not found', 404);
        }

        await product.destroy();
    }
}
export default new ProductService()