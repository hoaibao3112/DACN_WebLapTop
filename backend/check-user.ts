import { TaiKhoan, VaiTro, Quyen } from './src/models';
import { connectDatabase } from './src/config/database';

async function checkUserPerms() {
    try {
        await connectDatabase();

        const email = 'admin@laptop.com';
        const user = await TaiKhoan.findOne({
            where: { email },
            include: [
                {
                    model: VaiTro,
                    as: 'vaitros',
                    include: [{ model: Quyen, as: 'quyens' }]
                }
            ]
        });

        if (!user) {
            console.log(`❌ User ${email} not found.`);
            process.exit(1);
        }

        console.log(`👤 User: ${user.hoten} (${user.email})`);
        console.log(`🔑 Status: ${user.trangthai ? 'ACTIVE' : 'LOCKED'}`);

        const roles = (user as any).vaitros || [];
        console.log(`🎭 Roles: ${roles.length}`);

        roles.forEach((role: any) => {
            console.log(`   - Role: ${role.ten_vaitro}`);
            const perms = role.quyens || [];
            console.log(`     Permissions: ${perms.map((p: any) => p.ma_quyen).join(', ') || 'NONE'}`);
        });

        process.exit(0);
    } catch (error) {
        console.error('❌ Error checking user:', error);
        process.exit(1);
    }
}

checkUserPerms();
