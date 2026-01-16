import { Request, Response, NextFunction } from 'express';
import { ProductService } from '../services/product.service';

const productService = new ProductService();

export class ProductController {
    /**
     * GET /api/products
     * Get all products
     */
    getAll = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const filters = {
                page: req.query.page ? parseInt(req.query.page as string) : undefined,
                limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
                danhmuc_id: req.query.danhmuc_id ? parseInt(req.query.danhmuc_id as string) : undefined,
                thuonghieu: req.query.thuonghieu as string,
                search: req.query.search as string,
            };

            const result = await productService.getAllProducts(filters);

            res.status(200).json({
                success: true,
                message: 'Products retrieved successfully',
                data: result.products,
                pagination: result.pagination,
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * GET /api/products/:id
     * Get product by ID
     */
    getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const product = await productService.getProductById(parseInt(req.params.id));

            res.status(200).json({
                success: true,
                message: 'Product retrieved successfully',
                data: product,
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * POST /api/products
     * Create new product
     */
    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const product = await productService.createProduct(req.body);

            res.status(201).json({
                success: true,
                message: 'Product created successfully',
                data: product,
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * PUT /api/products/:id
     * Update product
     */
    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const product = await productService.updateProduct(parseInt(req.params.id), req.body);

            res.status(200).json({
                success: true,
                message: 'Product updated successfully',
                data: product,
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * DELETE /api/products/:id
     * Delete product
     */
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            await productService.deleteProduct(parseInt(req.params.id));

            res.status(200).json({
                success: true,
                message: 'Product deleted successfully',
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new ProductController()