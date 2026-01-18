import { Router } from 'express';
import { body } from 'express-validator';
import passport from 'passport';
import { AuthController } from '../controllers/auth.controller';
import { validate } from '../middleware/validation.middleware';
import { authenticate } from '../middleware/auth.middleware';
import '../config/passport'; // Initialize passport strategies

const router = Router();
const authController = new AuthController();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post(
    '/register',
    validate([
        body('hoten').trim().notEmpty().withMessage('Full name is required'),
        body('email').isEmail().withMessage('Invalid email address'),
        body('matkhau')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long'),
    ]),
    authController.register.bind(authController)
);

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post(
    '/login',
    validate([
        body('email').isEmail().withMessage('Invalid email address'),
        body('matkhau').notEmpty().withMessage('Password is required'),
    ]),
    authController.login.bind(authController)
);

/**
 * @route   POST /api/auth/refresh
 * @desc    Refresh access token
 * @access  Public
 */
router.post(
    '/refresh',
    validate([body('refreshToken').notEmpty().withMessage('Refresh token is required')]),
    authController.refreshToken.bind(authController)
);

/**
 * @route   GET /api/auth/profile
 * @desc    Get current user profile
 * @access  Private
 */
router.get('/profile', authenticate, authController.getProfile.bind(authController));

/**
 * @route   GET /api/auth/google
 * @desc    Google OAuth login
 * @access  Public
 */
router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'], session: false })
);

/**
 * @route   GET /api/auth/google/callback
 * @desc    Google OAuth callback
 * @access  Public
 */
router.get(
    '/google/callback',
    passport.authenticate('google', { session: false }),
    authController.googleCallback.bind(authController)
);

/**
 * @route   GET /api/auth/facebook
 * @desc    Facebook OAuth login
 * @access  Public
 */
router.get(
    '/facebook',
    passport.authenticate('facebook', { scope: ['email'], session: false })
);

/**
 * @route   GET /api/auth/facebook/callback
 * @desc    Facebook OAuth callback
 * @access  Public
 */
router.get(
    '/facebook/callback',
    passport.authenticate('facebook', { session: false }),
    authController.facebookCallback.bind(authController)
);

export default router;
