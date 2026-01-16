import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface PhieuNhapAttributes {
    id_phieunhap: number;
    ma_chung_tu: string;
    nhacungcap_id: number;
    nguoi_nhap_id: number;
    ngay_nhap?: Date;
    tong_tien_nhap?: number;
    ghi_chu?: string;
}

interface PhieuNhapCreationAttributes extends Optional<PhieuNhapAttributes, 'id_phieunhap' | 'ngay_nhap' | 'tong_tien_nhap' | 'ghi_chu'> { }

export class PhieuNhap extends Model<PhieuNhapAttributes, PhieuNhapCreationAttributes> implements PhieuNhapAttributes {
    public id_phieunhap!: number;
    public ma_chung_tu!: string;
    public nhacungcap_id!: number;
    public nguoi_nhap_id!: number;
    public ngay_nhap!: Date;
    public tong_tien_nhap!: number;
    public ghi_chu!: string;
}

PhieuNhap.init(
    {
        id_phieunhap: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        ma_chung_tu: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
            comment: 'Mã phiếu (PN001)',
        },
        nhacungcap_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'nhacungcap',
                key: 'id_nhacungcap',
            },
        },
        nguoi_nhap_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'taikhoan',
                key: 'id_taikhoan',
            },
            comment: 'FK taikhoan - ai thực hiện nhập',
        },
        ngay_nhap: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        tong_tien_nhap: {
            type: DataTypes.DECIMAL(15, 2),
            defaultValue: 0,
            comment: 'Tổng giá trị đơn nhập',
        },
        ghi_chu: {
            type: DataTypes.TEXT,
        },
    },
    {
        sequelize,
        tableName: 'phieunhap',
        timestamps: false,
        indexes: [
            { fields: ['ma_chung_tu'] },
            { fields: ['ngay_nhap'] },
        ],
    }
);
