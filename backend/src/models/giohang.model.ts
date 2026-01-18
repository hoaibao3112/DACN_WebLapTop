import { DataTypes, Model, Optional, Association, HasManyGetAssociationsMixin } from 'sequelize';
import { sequelize } from '../config/database';
import { ChiTietGioHang } from './chitiet-giohang.model';

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

    // Association properties
    public items?: ChiTietGioHang[];
    public chi_tiet_gio_hang?: ChiTietGioHang[];
    public getItems!: HasManyGetAssociationsMixin<ChiTietGioHang>;

    public static associations: {
        items: Association<GioHang, ChiTietGioHang>;
        chi_tiet_gio_hang: Association<GioHang, ChiTietGioHang>;
    };
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
