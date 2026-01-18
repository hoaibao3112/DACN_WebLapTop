import { Router } from 'express';
import addressController from '../controllers/address.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// All address routes require authentication
router.use(authenticate);

// Get all addresses
router.get('/', addressController.getAddresses);

// Create new address
router.post('/', addressController.createAddress);

// Update address
router.put('/:id', addressController.updateAddress);

// Delete address
router.delete('/:id', addressController.deleteAddress);

// Set default address
router.put('/:id/default', addressController.setDefaultAddress);

export default router;
