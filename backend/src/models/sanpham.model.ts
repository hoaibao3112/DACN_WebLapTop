import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface SanPhamAttributes {
    id_sanpham: number;
    ten_sanpham: string;
    thuonghieu: string;
    danhmuc_id: number;
    mota?: string;
    anh_daidien?: string;
    ngay_capnhat?: Date;
}

interface SanPhamCreationAttributes extends Optional<SanPhamAttributes, 'id_sanpham' | 'mota' | 'anh_daidien' | 'ngay_capnhat'> { }

export class SanPham extends Model<SanPhamAttributes, SanPhamCreationAttributes> implements SanPhamAttributes {
    public id_sanpham!: number;
    public ten_sanpham!: string;
    public thuonghieu!: string;
    public danhmuc_id!: number;
    public mota!: string;
    public anh_daidien!: string;
    public ngay_capnhat!: Date;
}

SanPham.init(
    {
        id_sanpham: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        ten_sanpham: {
            type: DataTypes.STRING(200),
            allowNull: false,
            comment: 'Dell XPS 13 9320',
        },
        thuonghieu: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: 'Dell, HP, Lenovo...',
        },
        danhmuc_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'danhmuc',
                key: 'id_danhmuc',
            },
        },
        mota: {
            type: DataTypes.TEXT,
            comment: 'Mô tả vắn tắt',
        },
        anh_daidien: {
            type: DataTypes.STRING(255),
            comment: 'Link ảnh đại diện',
        },
        ngay_capnhat: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: 'sanpham',
        timestamps: false,
        indexes: [
            { fields: ['danhmuc_id'] },
            { fields: ['thuonghieu'] },
        ],
    }
);
