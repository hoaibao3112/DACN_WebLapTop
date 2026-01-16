import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface GioHangAttributes {
    id_giohang: number;
    taikhoan_id: number;
    ngay_tao?: Date;
}

interface GioHangCreationAttributes extends Optional<GioHangAttributes, 'id_giohang' | 'ngay_tao'> { }

export class GioHang extends Model<GioHangAttributes, GioHangCreationAttributes> implements GioHangAttributes {
    public id_giohang!: number;
    public taikhoan_id!: number;
    public ngay_tao!: Date;
}

GioHang.init(
    {
        id_giohang: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        taikhoan_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'taikhoan',
                key: 'id_taikhoan',
            },
        },
        ngay_tao: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: 'giohang',
        timestamps: false,
    }
);
