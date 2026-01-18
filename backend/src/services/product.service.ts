import { SanPham, ThongSoKyThuat, DanhMuc } from '../models';
import { AppError } from '../middleware/error.middleware';
import { Op } from 'sequelize';

export class ProductService {
    /**
     * Serialize product data for frontend consumption
     */
    private serializeProduct(product: any) {
        const plainProduct = product.toJSON ? product.toJSON() : product;

        // Get variants (thongsokythuats)
        const variants = plainProduct.thongsokythuats || [];

        // Calculate min price from all variants
        let minPrice = 0;
        let totalStock = 0;

        if (variants.length > 0) {
            const prices = variants.map((v: any) => parseFloat(v.gia_ban || 0));
            minPrice = Math.min(...prices);
            totalStock = variants.reduce((sum: number, v: any) => sum + (v.ton_kho || 0), 0);
        }

        // Convert first variant to technical specs for display
        const technicalSpecs = this.variantToTechnicalSpecs(variants[0]);

        return {
            ma_san_pham: plainProduct.id_sanpham,
            ten_san_pham: plainProduct.ten_sanpham,
            thuong_hieu: plainProduct.thuonghieu,
            mo_ta: plainProduct.mota,
            hinh_anh: plainProduct.anh_daidien, // Map anh_daidien to hinh_anh
            gia_ban: minPrice,
            so_luong_ton: totalStock,
            danh_muc: plainProduct.danhmuc,
            thong_so_ky_thuat: technicalSpecs,
            thongsokythuats: variants, // Keep variants for cart/order
            // Keep original fields for compatibility
            id_sanpham: plainProduct.id_sanpham,
            danhmuc_id: plainProduct.danhmuc_id,
            ngay_capnhat: plainProduct.ngay_capnhat,
        };
    }

    /**
     * Convert variant to technical specs format for display
     */
    private variantToTechnicalSpecs(variant: any): any[] {
        if (!variant) return [];

        const specs = [];

        if (variant.cpu) {
            specs.push({
                ma_thong_so: 'cpu',
                ten_thong_so: 'CPU',
                gia_tri: variant.cpu,
            });
        }

        if (variant.ram) {
            specs.push({
                ma_thong_so: 'ram',
                ten_thong_so: 'RAM',
                gia_tri: variant.ram,
            });
        }

        if (variant.dungluong) {
            specs.push({
                ma_thong_so: 'dungluong',
                ten_thong_so: 'Dung lượng',
                gia_tri: variant.dungluong,
            });
        }

        if (variant.card_roi) {
            specs.push({
                ma_thong_so: 'card_roi',
                ten_thong_so: 'Card đồ họa',
                gia_tri: variant.card_roi,
            });
        }

        if (variant.manhinh) {
            specs.push({
                ma_thong_so: 'manhinh',
                ten_thong_so: 'Màn hình',
                gia_tri: variant.manhinh,
            });
        }

        if (variant.trongluong) {
            specs.push({
                ma_thong_so: 'trongluong',
                ten_thong_so: 'Trọng lượng',
                gia_tri: variant.trongluong,
            });
        }

        if (variant.congketnoi) {
            specs.push({
                ma_thong_so: 'congketnoi',
                ten_thong_so: 'Cổng kết nối',
                gia_tri: variant.congketnoi,
            });
        }

        if (variant.hedieuhanh) {
            specs.push({
                ma_thong_so: 'hedieuhanh',
                ten_thong_so: 'Hệ điều hành',
                gia_tri: variant.hedieuhanh,
            });
        }

        return specs;
    }

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
            products: rows.map(product => this.serializeProduct(product)),
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

        return this.serializeProduct(product);
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
