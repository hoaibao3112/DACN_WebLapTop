import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface NhaCungCapAttributes {
    id_nhacungcap: number;
    ten_nha_cung_cap: string;
    nguoi_lien_he?: string;
    so_dienthoai?: string;
    email?: string;
    diachi?: string;
}

interface NhaCungCapCreationAttributes extends Optional<NhaCungCapAttributes, 'id_nhacungcap' | 'nguoi_lien_he' | 'so_dienthoai' | 'email' | 'diachi'> { }

export class NhaCungCap extends Model<NhaCungCapAttributes, NhaCungCapCreationAttributes> implements NhaCungCapAttributes {
    public id_nhacungcap!: number;
    public ten_nha_cung_cap!: string;
    public nguoi_lien_he!: string;
    public so_dienthoai!: string;
    public email!: string;
    public diachi!: string;
}

NhaCungCap.init(
    {
        id_nhacungcap: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        ten_nha_cung_cap: {
            type: DataTypes.STRING(200),
            allowNull: false,
            comment: 'Tên công ty',
        },
        nguoi_lien_he: {
            type: DataTypes.STRING(100),
            comment: 'Tên người đại diện',
        },
        so_dienthoai: {
            type: DataTypes.STRING(15),
            comment: 'Số điện thoại',
        },
        email: {
            type: DataTypes.STRING(100),
            comment: 'Email liên hệ',
        },
        diachi: {
            type: DataTypes.TEXT,
            comment: 'Địa chỉ kho',
        },
    },
    {
        sequelize,
        tableName: 'nhacungcap',
        timestamps: false,
    }
);
