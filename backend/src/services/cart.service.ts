import { GioHang, ChiTietGioHang, ThongSoKyThuat, SanPham } from '../models';

export class CartService {
    /**
     * Get or create user's cart
     */
    async getOrCreateCart(userId: number) {
        let cart = await GioHang.findOne({
            where: { taikhoan_id: userId },
            include: [
                {
                    model: ChiTietGioHang,
                    as: 'chi_tiet_gio_hang',
                    include: [
                        {
                            model: ThongSoKyThuat,
                            as: 'thongsokythuat',
                            include: [
                                {
                                    model: SanPham,
                                    as: 'sanpham',
                                },
                            ],
                        },
                    ],
                },
            ],
        });

        if (!cart) {
            cart = await GioHang.create({ taikhoan_id: userId });
            cart = await GioHang.findByPk(cart.id_giohang, {
                include: [
                    {
                        model: ChiTietGioHang,
                        as: 'chi_tiet_gio_hang',
                        include: [
                            {
                                model: ThongSoKyThuat,
                                as: 'thongsokythuat',
                                include: [
                                    {
                                        model: SanPham,
                                        as: 'sanpham',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            });
        }

        return cart;
    }

    /**
     * Get user's cart
     */
    async getCart(userId: number) {
        return await this.getOrCreateCart(userId);
    }

    /**
     * Add item to cart
     */
    async addItem(userId: number, thongsokythuatId: number, quantity: number) {
        // Validate product variant
        const variant = await ThongSoKyThuat.findByPk(thongsokythuatId);
        if (!variant) {
            throw new Error('Product variant not found');
        }

        if (variant.ton_kho < quantity) {
            throw new Error('Insufficient stock');
        }

        // Get or create cart
        const cart = await this.getOrCreateCart(userId);

        // Check if item already exists in cart
        const existingItem = await ChiTietGioHang.findOne({
            where: {
                giohang_id: cart!.id_giohang,
                thongsokythuat_id: thongsokythuatId,
            },
        });

        if (existingItem) {
            // Update quantity
            const newQuantity = existingItem.soluong + quantity;
            if (newQuantity > variant.ton_kho) {
                throw new Error('Insufficient stock');
            }
            await existingItem.update({ soluong: newQuantity });
        } else {
            // Create new cart item
            await ChiTietGioHang.create({
                giohang_id: cart!.id_giohang,
                thongsokythuat_id: thongsokythuatId,
                soluong: quantity,
            });
        }

        // Return updated cart
        return await this.getCart(userId);
    }

    /**
     * Update cart item quantity
     */
    async updateItem(userId: number, itemId: number, quantity: number) {
        const cart = await this.getOrCreateCart(userId);

        const item = await ChiTietGioHang.findOne({
            where: {
                id_ctgiohang: itemId,
                giohang_id: cart!.id_giohang,
            },
            include: [{ model: ThongSoKyThuat, as: 'thongsokythuat' }],
        });

        if (!item) {
            throw new Error('Cart item not found');
        }

        // Validate quantity
        const variant = await ThongSoKyThuat.findByPk(item.thongsokythuat_id);
        if (!variant || quantity > variant.ton_kho) {
            throw new Error('Insufficient stock');
        }

        await item.update({ soluong: quantity });

        return await this.getCart(userId);
    }

    /**
     * Remove item from cart
     */
    async removeItem(userId: number, itemId: number) {
        const cart = await this.getOrCreateCart(userId);

        const item = await ChiTietGioHang.findOne({
            where: {
                id_ctgiohang: itemId,
                giohang_id: cart!.id_giohang,
            },
        });

        if (!item) {
            throw new Error('Cart item not found');
        }

        await item.destroy();
    }

    /**
     * Clear cart
     */
    async clearCart(userId: number) {
        const cart = await this.getOrCreateCart(userId);

        await ChiTietGioHang.destroy({
            where: { giohang_id: cart!.id_giohang },
        });
    }
}
