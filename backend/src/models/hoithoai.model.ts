import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface HoiThoaiAttributes {
    id_hoithoai: number;
    taikhoan_id?: number;
    session_uuid: string;
    thoi_gian_tao?: Date;
}

interface HoiThoaiCreationAttributes extends Optional<HoiThoaiAttributes, 'id_hoithoai' | 'taikhoan_id' | 'thoi_gian_tao'> { }

export class HoiThoai extends Model<HoiThoaiAttributes, HoiThoaiCreationAttributes> implements HoiThoaiAttributes {
    public id_hoithoai!: number;
    public taikhoan_id!: number;
    public session_uuid!: string;
    public thoi_gian_tao!: Date;
}

HoiThoai.init(
    {
        id_hoithoai: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        taikhoan_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'taikhoan',
                key: 'id_taikhoan',
            },
            comment: 'Mã người dùng (nếu đã đăng nhập)',
        },
        session_uuid: {
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: 'Mã định danh trình duyệt (nếu chưa đăng nhập)',
        },
        thoi_gian_tao: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: 'hoithoai',
        timestamps: false,
        indexes: [
            { fields: ['taikhoan_id'] },
            { fields: ['session_uuid'] },
        ],
    }
);
