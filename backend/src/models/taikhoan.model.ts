import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface TaiKhoanAttributes {
    id_taikhoan: number;
    hoten: string;
    email: string;
    matkhau: string;
    ngay_tao?: Date;
    trangthai?: boolean;
}

interface TaiKhoanCreationAttributes extends Optional<TaiKhoanAttributes, 'id_taikhoan' | 'ngay_tao' | 'trangthai'> { }

export class TaiKhoan extends Model<TaiKhoanAttributes, TaiKhoanCreationAttributes> implements TaiKhoanAttributes {
    public id_taikhoan!: number;
    public hoten!: string;
    public email!: string;
    public matkhau!: string;
    public ngay_tao!: Date;
    public trangthai!: boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

TaiKhoan.init(
    {
        id_taikhoan: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        hoten: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: 'Họ và tên đầy đủ',
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            comment: 'Email đăng nhập',
        },
        matkhau: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: 'Mật khẩu đã mã hóa',
        },
        ngay_tao: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            comment: 'Ngày đăng ký',
        },
        trangthai: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            comment: 'Trạng thái hoạt động',
        },
    },
    {
        sequelize,
        tableName: 'taikhoan',
        timestamps: false,
        indexes: [{ fields: ['email'] }],
    }
);
