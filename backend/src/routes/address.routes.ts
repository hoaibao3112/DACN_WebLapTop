import { Router } from 'express';
import { AddressController } from '../controllers/address.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();
const addressController = new AddressController();

// All address routes require authentication
router.use(authenticate);

// Get all addresses
router.get('/', (req, res, next) => addressController.getAddresses(req as any, res, next));

// Create new address
router.post('/', (req, res, next) => addressController.createAddress(req as any, res, next));

// Update address
router.put('/:id', (req, res, next) => addressController.updateAddress(req as any, res, next));

// Delete address
router.delete('/:id', (req, res, next) => addressController.deleteAddress(req as any, res, next));

// Set default address
router.put('/:id/default', (req, res, next) => addressController.setDefaultAddress(req as any, res, next));

export default router;
