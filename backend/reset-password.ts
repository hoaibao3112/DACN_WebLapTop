import { TaiKhoan } from './src/models/taikhoan.model';
import { hashPassword } from './src/utils/password.util';
import { connectDatabase } from './src/config/database';

async function resetAdminPassword() {
    try {
        await connectDatabase();

        const email = 'admin@laptop.com';
        const newPassword = 'admin123';
        const hashedPassword = await hashPassword(newPassword);

        const [updatedCount] = await TaiKhoan.update(
            { matkhau: hashedPassword },
            { where: { email } }
        );

        if (updatedCount > 0) {
            console.log(`✅ Success: Password for ${email} has been reset to: ${newPassword}`);
        } else {
            console.log(`❌ Error: User with email ${email} not found.`);
        }

        process.exit(0);
    } catch (error) {
        console.error('❌ Error resetting password:', error);
        process.exit(1);
    }
}

resetAdminPassword();
