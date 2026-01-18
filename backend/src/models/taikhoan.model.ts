import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface TaiKhoanAttributes {
    id_taikhoan: number;
    hoten: string;
    email: string;
    matkhau: string;
    sodienthoai?: string;
    ngay_tao?: Date;
    trangthai?: boolean;
    oauth_provider?: string;
    oauth_id?: string;
}

interface TaiKhoanCreationAttributes extends Optional<TaiKhoanAttributes, 'id_taikhoan' | 'ngay_tao' | 'trangthai' | 'sodienthoai' | 'oauth_provider' | 'oauth_id'> { }

export class TaiKhoan extends Model<TaiKhoanAttributes, TaiKhoanCreationAttributes> implements TaiKhoanAttributes {
    public id_taikhoan!: number;
    public hoten!: string;
    public email!: string;
    public matkhau!: string;
    public sodienthoai?: string;
    public ngay_tao!: Date;
    public trangthai!: boolean;
    public oauth_provider?: string;
    public oauth_id?: string;

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
        sodienthoai: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: 'Số điện thoại',
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
        oauth_provider: {
            type: DataTypes.STRING(50),
            allowNull: true,
            comment: 'OAuth provider (google, facebook)',
        },
        oauth_id: {
            type: DataTypes.STRING(255),
            allowNull: true,
            comment: 'OAuth provider user ID',
        },
    },
    {
        sequelize,
        tableName: 'taikhoan',
        timestamps: false,
        indexes: [{ fields: ['email'] }],
    }
);
