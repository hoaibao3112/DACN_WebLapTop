import { TaiKhoan } from '../models/taikhoan.model';

declare global {
    namespace Express {
        interface User {
            id: number;
            email: string;
            roles: string[];
            permissions: string[];
        }

        interface Request {
            user?: User;
        }
    }
}

export { };
