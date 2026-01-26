import { Request, Response, NextFunction } from 'express';
import { ProductService } from '../services/product.service';

const productService = new ProductService();

export class ProductController {
    /**
     * GET /api/products
     * Get all products
     */
    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const filters = {
                page: req.query.page ? parseInt(req.query.page as string) : undefined,
                limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
                category: req.query.category ? parseInt(req.query.category as string) : undefined,
                brand: req.query.brand as string,
                minPrice: req.query.minPrice ? parseInt(req.query.minPrice as string) : undefined,
                maxPrice: req.query.maxPrice ? parseInt(req.query.maxPrice as string) : undefined,
                search: req.query.search as string,
                status: req.query.status as string,
                sortBy: req.query.sortBy as string,
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
            const productId = parseInt(req.params.id);

            // Validate product ID
            if (isNaN(productId) || productId <= 0) {
                res.status(400).json({
                    success: false,
                    message: 'Invalid product ID',
                });
                return;
            }

            const product = await productService.getProductById(productId);

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
            const productId = parseInt(req.params.id);

            // Validate product ID
            if (isNaN(productId) || productId <= 0) {
                res.status(400).json({
                    success: false,
                    message: 'Invalid product ID',
                });
                return;
            }

            const product = await productService.updateProduct(productId, req.body);

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
    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const productId = parseInt(req.params.id);

            // Validate product ID
            if (isNaN(productId) || productId <= 0) {
                res.status(400).json({
                    success: false,
                    message: 'Invalid product ID',
                });
                return;
            }

            await productService.deleteProduct(productId);

            res.status(200).json({
                success: true,
                message: 'Product deleted successfully',
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * GET /api/products/categories
     * Get all categories
     */
    getCategories = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const categories = await productService.getAllCategories();
            res.status(200).json({
                success: true,
                data: categories,
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new ProductController()