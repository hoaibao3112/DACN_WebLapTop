import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface ChiTietHoaDonAttributes {
    id_cthoadon: number;
    hoadon_id: number;
    thongsokythuat_id: number;
    soluong: number;
    gia_luc_mua: number;
}

interface ChiTietHoaDonCreationAttributes extends Optional<ChiTietHoaDonAttributes, 'id_cthoadon'> { }

export class ChiTietHoaDon extends Model<ChiTietHoaDonAttributes, ChiTietHoaDonCreationAttributes> implements ChiTietHoaDonAttributes {
    public id_cthoadon!: number;
    public hoadon_id!: number;
    public thongsokythuat_id!: number;
    public soluong!: number;
    public gia_luc_mua!: number;
}

ChiTietHoaDon.init(
    {
        id_cthoadon: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        hoadon_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'hoadon',
                key: 'id_hoadon',
            },
        },
        thongsokythuat_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'thongso_kythuat',
                key: 'id_thongsokythuat',
            },
            comment: 'Sản phẩm (variant) nào',
        },
        soluong: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
            },
        },
        gia_luc_mua: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false,
            comment: 'Giá bán tại thời điểm chốt đơn',
        },
    },
    {
        sequelize,
        tableName: 'chitiet_hoadon',
        timestamps: false,
        indexes: [{ fields: ['hoadon_id'] }],
    }
);
