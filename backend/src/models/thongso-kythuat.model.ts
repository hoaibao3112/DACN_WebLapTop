import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface ThongSoKyThuatAttributes {
    id_thongsokythuat: number;
    id_sanpham: number;
    sku: string;
    ten_hienthi: string;
    cpu: string;
    ram: string;
    dungluong: string;
    card_roi?: string;
    manhinh?: string;
    trongluong?: string;
    congketnoi?: string;
    hedieuhanh?: string;
    gia_ban: number;
    ton_kho?: number;
}

interface ThongSoKyThuatCreationAttributes extends Optional<ThongSoKyThuatAttributes, 'id_thongsokythuat' | 'card_roi' | 'manhinh' | 'trongluong' | 'congketnoi' | 'hedieuhanh' | 'ton_kho'> { }

export class ThongSoKyThuat extends Model<ThongSoKyThuatAttributes, ThongSoKyThuatCreationAttributes> implements ThongSoKyThuatAttributes {
    public id_thongsokythuat!: number;
    public id_sanpham!: number;
    public sku!: string;
    public ten_hienthi!: string;
    public cpu!: string;
    public ram!: string;
    public dungluong!: string;
    public card_roi!: string;
    public manhinh!: string;
    public trongluong!: string;
    public congketnoi!: string;
    public hedieuhanh!: string;
    public gia_ban!: number;
    public ton_kho!: number;
}

ThongSoKyThuat.init(
    {
        id_thongsokythuat: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_sanpham: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'sanpham',
                key: 'id_sanpham',
            },
        },
        sku: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
            comment: 'DELL-XPS-I5-8GB-256GB',
        },
        ten_hienthi: {
            type: DataTypes.STRING(200),
            allowNull: false,
            comment: 'Dell XPS 13 - Core i5/8GB/256GB',
        },
        cpu: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: 'Intel Core i5-1235U',
        },
        ram: {
            type: DataTypes.STRING(50),
            allowNull: false,
            comment: '8GB DDR4',
        },
        dungluong: {
            type: DataTypes.STRING(50),
            allowNull: false,
            comment: '256GB SSD NVMe',
        },
        card_roi: {
            type: DataTypes.STRING(100),
            comment: 'NVIDIA GTX 1650 (nếu có)',
        },
        manhinh: {
            type: DataTypes.STRING(100),
            comment: '13.4" FHD+ IPS',
        },
        trongluong: {
            type: DataTypes.STRING(50),
            comment: '1.2kg',
        },
        congketnoi: {
            type: DataTypes.TEXT,
            comment: '2x USB-C, 1x HDMI',
        },
        hedieuhanh: {
            type: DataTypes.STRING(50),
            defaultValue: 'Windows 11',
            comment: 'Hệ điều hành',
        },
        gia_ban: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false,
            comment: 'Giá bán',
        },
        ton_kho: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            comment: 'Số lượng còn trong kho',
        },
    },
    {
        sequelize,
        tableName: 'thongso_kythuat',
        timestamps: false,
        indexes: [
            { fields: ['sku'] },
            { fields: ['id_sanpham'] },
            { fields: ['gia_ban'] },
        ],
    }
);
