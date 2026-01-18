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
    createAddress = async (userId: number, addressData: any): Promise<DiaChi> => {
        return await DiaChi.create({
            ma_tk: userId,
            ...addressData,
        });
    };

    /**
     * Update address
     */
    updateAddress = async (userId: number, addressId: number, addressData: any): Promise<DiaChi> => {
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
    };

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
