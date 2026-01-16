import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { authenticate } from '../middleware/auth.middleware';
import { requirePermission } from '../middleware/rbac.middleware';

const router = Router();
const productController = new ProductController();

/**
 * @route   GET /api/products
 * @desc    Get all products
 * @access  Public
 */
router.get('/', productController.getAll);

/**
 * @route   GET /api/products/:id
 * @desc    Get product by ID
 * @access  Public
 */
router.get('/:id', productController.getById);

/**
 * @route   POST /api/products
 * @desc    Create new product
 * @access  Private (requires product.create permission)
 */
router.post(
    '/',
    authenticate,
    requirePermission('product.create'),
    productController.create
);

/**
 * @route   PUT /api/products/:id
 * @desc    Update product
 * @access  Private (requires product.create permission)
 */
router.put(
    '/:id',
    authenticate,
    requirePermission('product.create'),
    productController.update
);

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete product
 * @access  Private (requires product.create permission)
 */
router.delete(
    '/:id',
    authenticate,
    requirePermission('product.create'),
    productController.delete
);

export default router;
