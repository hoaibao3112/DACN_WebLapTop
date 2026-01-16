import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface QuyenAttributes {
    id_quyen: number;
    ma_quyen: string;
    ten_hienthi: string;
}

interface QuyenCreationAttributes extends Optional<QuyenAttributes, 'id_quyen'> { }

export class Quyen extends Model<QuyenAttributes, QuyenCreationAttributes> implements QuyenAttributes {
    public id_quyen!: number;
    public ma_quyen!: string;
    public ten_hienthi!: string;
}

Quyen.init(
    {
        id_quyen: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        ma_quyen: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            comment: 'product.create, order.view',
        },
        ten_hienthi: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: 'Tên hiển thị của quyền',
        },
    },
    {
        sequelize,
        tableName: 'quyen',
        timestamps: false,
    }
);
