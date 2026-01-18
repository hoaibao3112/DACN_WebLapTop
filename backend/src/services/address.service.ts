import { DiaChi } from '../models';

export class AddressService {
    /**
     * Get user's addresses
     */
    async getUserAddresses(userId: number) {
        return await DiaChi.findAll({
            where: { ma_tk: userId },
        });
    }

    /**
     * Create new address
     */
    async createAddress(userId: number, addressData: any) {
        return await DiaChi.create({
            ma_tk: userId,
            ...addressData,
        });
    }

    /**
     * Update address
     */
    async updateAddress(userId: number, addressId: number, addressData: any) {
        const address = await DiaChi.findOne({
            where: {
                id_diachi: addressId,
                ma_tk: userId,
            },
        });

        if (!address) {
            throw new Error('Address not found');
        }

        await address.update(addressData);
        return address;
    }

    /**
     * Delete address
     */
    async deleteAddress(userId: number, addressId: number) {
        const address = await DiaChi.findOne({
            where: {
                id_diachi: addressId,
                ma_tk: userId,
            },
        });

        if (!address) {
            throw new Error('Address not found');
        }

        await address.destroy();
    }


}
