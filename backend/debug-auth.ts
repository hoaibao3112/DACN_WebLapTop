import { TaiKhoan, VaiTro, Quyen, initializeAssociations } from './src/models';
import { hashPassword, comparePassword } from './src/utils/password.util';
import { connectDatabase } from './src/config/database';

async function debugAuth() {
    try {
        await connectDatabase();
        initializeAssociations();

        const email = 'admin@laptop.com';
        const rawPassword = 'admin123';

        console.log(`--- Debugging Auth for ${email} ---`);

        // 1. Reset Password
        const hashedPassword = await hashPassword(rawPassword);
        console.log(`Generated Hash: ${hashedPassword}`);

        const [updatedCount] = await TaiKhoan.update(
            { matkhau: hashedPassword },
            { where: { email } }
        );
        console.log(`Update Result: ${updatedCount} rows affected`);

        // 2. Immediate Compare Test
        const userAfterUpdate = await TaiKhoan.findOne({ where: { email } });
        if (userAfterUpdate) {
            const isValid = await comparePassword(rawPassword, userAfterUpdate.matkhau);
            console.log(`Password Match Test (Immediately after update): ${isValid ? 'PASSED ✅' : 'FAILED ❌'}`);
        } else {
            console.log(`❌ User not found after update!`);
        }

        // 3. Check roles & permissions
        const fullUser = await TaiKhoan.findOne({
            where: { email },
            include: [
                {
                    model: VaiTro,
                    as: 'vaitros',
                    include: [{ model: Quyen, as: 'quyens' }]
                }
            ]
        });

        if (fullUser) {
            console.log(`👤 Name: ${fullUser.hoten}`);
            console.log(`🎭 Roles: ${(fullUser as any).vaitros?.map((r: any) => r.ten_vaitro).join(', ') || 'NONE'}`);

            const permissions = (fullUser as any).vaitros?.flatMap((r: any) => r.quyens?.map((p: any) => p.ma_quyen) || []) || [];
            console.log(`🔑 Permissions: ${permissions.length > 0 ? permissions.join(', ') : 'NONE'}`);

            if (!permissions.includes('dashboard.view')) {
                console.log('⚠️ WARNING: User is missing "dashboard.view" permission!');
            }
        }

        process.exit(0);
    } catch (error) {
        console.error('❌ Debug script error:', error);
        process.exit(1);
    }
}

debugAuth();
