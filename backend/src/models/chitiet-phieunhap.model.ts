import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface ChiTietPhieuNhapAttributes {
    id_ctphieunhap: number;
    phieunhap_id: number;
    thongsokythuat_id: number;
    soluong_nhap: number;
    gia_nhap: number;
}

interface ChiTietPhieuNhapCreationAttributes extends Optional<ChiTietPhieuNhapAttributes, 'id_ctphieunhap'> { }

export class ChiTietPhieuNhap extends Model<ChiTietPhieuNhapAttributes, ChiTietPhieuNhapCreationAttributes> implements ChiTietPhieuNhapAttributes {
    public id_ctphieunhap!: number;
    public phieunhap_id!: number;
    public thongsokythuat_id!: number;
    public soluong_nhap!: number;
    public gia_nhap!: number;
}

ChiTietPhieuNhap.init(
    {
        id_ctphieunhap: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        phieunhap_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'phieunhap',
                key: 'id_phieunhap',
            },
        },
        thongsokythuat_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'thongso_kythuat',
                key: 'id_thongsokythuat',
            },
            comment: 'Nhập variant cụ thể',
        },
        soluong_nhap: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
            },
        },
        gia_nhap: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false,
            comment: 'Giá vốn/đơn vị',
        },
    },
    {
        sequelize,
        tableName: 'chitiet_phieunhap',
        timestamps: false,
        indexes: [{ fields: ['phieunhap_id'] }],
    }
);
