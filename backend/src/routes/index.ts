import { Router } from 'express';
import authRoutes from './auth.routes';
import productRoutes from './product.routes';

const router = Router();

// API Routes
router.use('/auth', authRoutes);
router.use('/products', productRoutes);

// Health check
router.get('/health', (_req, res) => {
    res.json({
        success: true,
        message: 'API is running',
        timestamp: new Date().toISOString(),
    });
});

export default router;
