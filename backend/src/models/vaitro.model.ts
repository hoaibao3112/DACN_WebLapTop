import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface VaiTroAttributes {
    id_vaitro: number;
    ten_vaitro: string;
    mota?: string;
}

interface VaiTroCreationAttributes extends Optional<VaiTroAttributes, 'id_vaitro' | 'mota'> { }

export class VaiTro extends Model<VaiTroAttributes, VaiTroCreationAttributes> implements VaiTroAttributes {
    public id_vaitro!: number;
    public ten_vaitro!: string;
    public mota!: string;
}

VaiTro.init(
    {
        id_vaitro: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        ten_vaitro: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
            comment: 'Admin, Sale, Khách hàng',
        },
        mota: {
            type: DataTypes.TEXT,
            comment: 'Mô tả vai trò',
        },
    },
    {
        sequelize,
        tableName: 'vaitro',
        timestamps: false,
    }
);
