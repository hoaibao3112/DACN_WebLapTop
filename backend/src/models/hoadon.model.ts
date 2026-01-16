import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface HoaDonAttributes {
    id_hoadon: number;
    ma_don_hang: string;
    taikhoan_id: number;
    ngay_dat?: Date;
    tong_tien: number;
    trangthai?: 'Chờ duyệt' | 'Đang giao' | 'Hoàn thành' | 'Hủy';
    hinhthuc_thanhtoan: 'COD' | 'Chuyển khoản' | 'VNPay' | 'MoMo' | 'ZaloPay';
}

interface HoaDonCreationAttributes extends Optional<HoaDonAttributes, 'id_hoadon' | 'ngay_dat' | 'trangthai'> { }

export class HoaDon extends Model<HoaDonAttributes, HoaDonCreationAttributes> implements HoaDonAttributes {
    public id_hoadon!: number;
    public ma_don_hang!: string;
    public taikhoan_id!: number;
    public ngay_dat!: Date;
    public tong_tien!: number;
    public trangthai!: 'Chờ duyệt' | 'Đang giao' | 'Hoàn thành' | 'Hủy';
    public hinhthuc_thanhtoan!: 'COD' | 'Chuyển khoản' | 'VNPay' | 'MoMo' | 'ZaloPay';
}

HoaDon.init(
    {
        id_hoadon: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        ma_don_hang: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
            comment: 'Mã hiển thị (DH2024-XXX)',
        },
        taikhoan_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'taikhoan',
                key: 'id_taikhoan',
            },
            comment: 'Khách hàng nào mua',
        },
        ngay_dat: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        tong_tien: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,
            comment: 'Tổng tiền phải thanh toán',
        },
        trangthai: {
            type: DataTypes.ENUM('Chờ duyệt', 'Đang giao', 'Hoàn thành', 'Hủy'),
            defaultValue: 'Chờ duyệt',
        },
        hinhthuc_thanhtoan: {
            type: DataTypes.ENUM('COD', 'Chuyển khoản', 'VNPay', 'MoMo', 'ZaloPay'),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'hoadon',
        timestamps: false,
        indexes: [
            { fields: ['ma_don_hang'] },
            { fields: ['taikhoan_id'] },
            { fields: ['trangthai'] },
        ],
    }
);
