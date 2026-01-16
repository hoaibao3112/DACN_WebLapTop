import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface DiaChiAttributes {
    id_diachi: number;
    dia_chi: string;
    sodienthoai: string;
    ma_tk: number;
}

interface DiaChiCreationAttributes extends Optional<DiaChiAttributes, 'id_diachi'> { }

export class DiaChi extends Model<DiaChiAttributes, DiaChiCreationAttributes> implements DiaChiAttributes {
    public id_diachi!: number;
    public dia_chi!: string;
    public sodienthoai!: string;
    public ma_tk!: number;
}

DiaChi.init(
    {
        id_diachi: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        dia_chi: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: 'Địa chỉ giao hàng',
        },
        sodienthoai: {
            type: DataTypes.STRING(15),
            allowNull: false,
            comment: 'Số điện thoại liên lạc',
        },
        ma_tk: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'taikhoan',
                key: 'id_taikhoan',
            },
            comment: 'Địa chỉ thuộc tài khoản nào',
        },
    },
    {
        sequelize,
        tableName: 'diachi',
        timestamps: false,
        indexes: [{ fields: ['ma_tk'] }],
    }
);
