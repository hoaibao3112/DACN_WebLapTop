import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface TinNhanAttributes {
    id_tinnhan: number;
    hoithoai_id: number;
    vai_tro: 'User' | 'Assistant';
    noi_dung: string;
    thoi_gian_gui?: Date;
}

interface TinNhanCreationAttributes extends Optional<TinNhanAttributes, 'id_tinnhan' | 'thoi_gian_gui'> { }

export class TinNhan extends Model<TinNhanAttributes, TinNhanCreationAttributes> implements TinNhanAttributes {
    public id_tinnhan!: number;
    public hoithoai_id!: number;
    public vai_tro!: 'User' | 'Assistant';
    public noi_dung!: string;
    public thoi_gian_gui!: Date;
}

TinNhan.init(
    {
        id_tinnhan: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        hoithoai_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'hoithoai',
                key: 'id_hoithoai',
            },
        },
        vai_tro: {
            type: DataTypes.ENUM('User', 'Assistant'),
            allowNull: false,
            comment: 'Ai nói',
        },
        noi_dung: {
            type: DataTypes.TEXT,
            allowNull: false,
            comment: 'Nội dung tin nhắn',
        },
        thoi_gian_gui: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: 'tinnhan',
        timestamps: false,
        indexes: [
            { fields: ['hoithoai_id'] },
            { fields: ['thoi_gian_gui'] },
        ],
    }
);
