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
        category?: number;
        brand?: string;
        minPrice?: number;
        maxPrice?: number;
        search?: string;
        status?: string;
        sortBy?: string;
    }) {
        const page = filters.page || 1;
        const limit = filters.limit || 10;
        const offset = (page - 1) * limit;

        const where: any = {};

        // Category filter
        if (filters.category) {
            where.danhmuc_id = filters.category;
        }

        // Brand filter
        if (filters.brand) {
            where.thuonghieu = filters.brand;
        }

        // Price range filter
        if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
            where.gia_ban = {};
            if (filters.minPrice !== undefined) {
                where.gia_ban[Op.gte] = filters.minPrice;
            }
            if (filters.maxPrice !== undefined) {
                where.gia_ban[Op.lte] = filters.maxPrice;
            }
        }

        // Search filter
        if (filters.search) {
            where[Op.or] = [
                { ten_sanpham: { [Op.like]: `%${filters.search}%` } },
                { mota: { [Op.like]: `%${filters.search}%` } },
                { thuonghieu: { [Op.like]: `%${filters.search}%` } },
            ];
        }

        // Status filter
        if (filters.status) {
            where.trang_thai = filters.status;
        }

        // Sorting
        let order: any[] = [['ngay_capnhat', 'DESC']];
        if (filters.sortBy) {
            switch (filters.sortBy) {
                case 'price_asc':
                    order = [['gia_ban', 'ASC']];
                    break;
                case 'price_desc':
                    order = [['gia_ban', 'DESC']];
                    break;
                case 'name_asc':
                    order = [['ten_sanpham', 'ASC']];
                    break;
                case 'name_desc':
                    order = [['ten_sanpham', 'DESC']];
                    break;
                case 'newest':
                    order = [['ngay_capnhat', 'DESC']];
                    break;
            }
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
            order,
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
