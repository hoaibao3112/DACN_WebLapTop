import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface ChiTietGioHangAttributes {
    id_ctgiohang: number;
    giohang_id: number;
    thongsokythuat_id: number;
    soluong: number;
}

interface ChiTietGioHangCreationAttributes extends Optional<ChiTietGioHangAttributes, 'id_ctgiohang'> { }

export class ChiTietGioHang extends Model<ChiTietGioHangAttributes, ChiTietGioHangCreationAttributes> implements ChiTietGioHangAttributes {
    public id_ctgiohang!: number;
    public giohang_id!: number;
    public thongsokythuat_id!: number;
    public soluong!: number;
}

ChiTietGioHang.init(
    {
        id_ctgiohang: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        giohang_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'giohang',
                key: 'id_giohang',
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
    },
    {
        sequelize,
        tableName: 'chitiet_giohang',
        timestamps: false,
        indexes: [{ fields: ['giohang_id'] }],
    }
);
