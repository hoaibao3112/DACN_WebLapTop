import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface DanhMucAttributes {
    id_danhmuc: number;
    ten_danhmuc: string;
}

interface DanhMucCreationAttributes extends Optional<DanhMucAttributes, 'id_danhmuc'> { }

export class DanhMuc extends Model<DanhMucAttributes, DanhMucCreationAttributes> implements DanhMucAttributes {
    public id_danhmuc!: number;
    public ten_danhmuc!: string;
}

DanhMuc.init(
    {
        id_danhmuc: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        ten_danhmuc: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: 'Gaming, Văn phòng...',
        },
    },
    {
        sequelize,
        tableName: 'danhmuc',
        timestamps: false,
    }
);
