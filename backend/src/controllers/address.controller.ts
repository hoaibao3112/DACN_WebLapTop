import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
import { AddressService } from '../services/address.service';

const addressService = new AddressService();

export class AddressController {
    /**
     * GET /api/addresses
     * Get user's addresses
     */
    getAddresses = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.user!.id;
            const addresses = await addressService.getUserAddresses(userId);

            res.status(200).json({
                success: true,
                message: 'Addresses retrieved successfully',
                data: addresses,
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * POST /api/addresses
     * Create new address
     */
    createAddress = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.user!.id;
            const addressData = req.body;

            const address = await addressService.createAddress(userId, addressData);

            res.status(201).json({
                success: true,
                message: 'Address created successfully',
                data: address,
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * PUT /api/addresses/:id
     * Update address
     */
    updateAddress = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.user!.id;
            const addressId = parseInt(req.params.id);

            if (isNaN(addressId) || addressId <= 0) {
                res.status(400).json({
                    success: false,
                    message: 'Invalid address ID',
                });
                return;
            }

            const addressData = req.body;

            const address = await addressService.updateAddress(userId, addressId, addressData);

            res.status(200).json({
                success: true,
                message: 'Address updated successfully',
                data: address,
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * DELETE /api/addresses/:id
     * Delete address
     */
    deleteAddress = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.user!.id;
            const addressId = parseInt(req.params.id);

            if (isNaN(addressId) || addressId <= 0) {
                res.status(400).json({
                    success: false,
                    message: 'Invalid address ID',
                });
                return;
            }

            await addressService.deleteAddress(userId, addressId);

            res.status(200).json({
                success: true,
                message: 'Address deleted successfully',
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * PUT /api/addresses/:id/default
     * Set address as default
     */
    setDefaultAddress = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.user!.id;
            const addressId = parseInt(req.params.id);

            if (isNaN(addressId) || addressId <= 0) {
                res.status(400).json({
                    success: false,
                    message: 'Invalid address ID',
                });
                return;
            }

            // setDefaultAddress method was removed from AddressService
            // as mac_dinh field does not exist in DiaChi model
            res.status(501).json({
                success: false,
                message: 'This feature is currently not available',
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new AddressController();
