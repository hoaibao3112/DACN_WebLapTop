// Import all models
import { TaiKhoan } from './taikhoan.model';
import { VaiTro } from './vaitro.model';
import { Quyen } from './quyen.model';
import { DanhMuc } from './danhmuc.model';
import { SanPham } from './sanpham.model';
import { ThongSoKyThuat } from './thongso-kythuat.model';
import { GioHang } from './giohang.model';
import { ChiTietGioHang } from './chitiet-giohang.model';
import { HoaDon } from './hoadon.model';
import { ChiTietHoaDon } from './chitiet-hoadon.model';
import { DiaChi } from './diachi.model';
import { NhaCungCap } from './nhacungcap.model';
import { PhieuNhap } from './phieunhap.model';
import { ChiTietPhieuNhap } from './chitiet-phieunhap.model';
import { HoiThoai } from './hoithoai.model';
import { TinNhan } from './tinnhan.model';

// Define associations
export const initializeAssociations = () => {
    // TaiKhoan <-> VaiTro (Many-to-Many)
    TaiKhoan.belongsToMany(VaiTro, {
        through: 'taikhoan_vaitro',
        foreignKey: 'taikhoan_id',
        otherKey: 'vaitro_id',
        as: 'vaitros',
    });
    VaiTro.belongsToMany(TaiKhoan, {
        through: 'taikhoan_vaitro',
        foreignKey: 'vaitro_id',
        otherKey: 'taikhoan_id',
        as: 'taikhoans',
    });

    // VaiTro <-> Quyen (Many-to-Many)
    VaiTro.belongsToMany(Quyen, {
        through: 'vaitro_quyen',
        foreignKey: 'vaitro_id',
        otherKey: 'quyen_id',
        as: 'quyens',
    });
    Quyen.belongsToMany(VaiTro, {
        through: 'vaitro_quyen',
        foreignKey: 'quyen_id',
        otherKey: 'vaitro_id',
        as: 'vaitros',
    });

    // DanhMuc -> SanPham (One-to-Many)
    DanhMuc.hasMany(SanPham, {
        foreignKey: 'danhmuc_id',
        as: 'sanphams',
    });
    SanPham.belongsTo(DanhMuc, {
        foreignKey: 'danhmuc_id',
        as: 'danhmuc',
    });

    // SanPham -> ThongSoKyThuat (One-to-Many)
    SanPham.hasMany(ThongSoKyThuat, {
        foreignKey: 'id_sanpham',
        as: 'thongsokythuats',
    });
    ThongSoKyThuat.belongsTo(SanPham, {
        foreignKey: 'id_sanpham',
        as: 'sanpham',
    });

    // TaiKhoan -> GioHang (One-to-One)
    TaiKhoan.hasOne(GioHang, {
        foreignKey: 'taikhoan_id',
        as: 'giohang',
    });
    GioHang.belongsTo(TaiKhoan, {
        foreignKey: 'taikhoan_id',
        as: 'taikhoan',
    });

    // GioHang -> ChiTietGioHang (One-to-Many)
    GioHang.hasMany(ChiTietGioHang, {
        foreignKey: 'giohang_id',
        as: 'items',
    });
    ChiTietGioHang.belongsTo(GioHang, {
        foreignKey: 'giohang_id',
        as: 'giohang',
    });

    // ThongSoKyThuat -> ChiTietGioHang (One-to-Many)
    ThongSoKyThuat.hasMany(ChiTietGioHang, {
        foreignKey: 'thongsokythuat_id',
        as: 'chitiet_giohangs',
    });
    ChiTietGioHang.belongsTo(ThongSoKyThuat, {
        foreignKey: 'thongsokythuat_id',
        as: 'thongsokythuat',
    });

    // TaiKhoan -> HoaDon (One-to-Many)
    TaiKhoan.hasMany(HoaDon, {
        foreignKey: 'taikhoan_id',
        as: 'hoadons',
    });
    HoaDon.belongsTo(TaiKhoan, {
        foreignKey: 'taikhoan_id',
        as: 'taikhoan',
    });

    // HoaDon -> ChiTietHoaDon (One-to-Many)
    HoaDon.hasMany(ChiTietHoaDon, {
        foreignKey: 'hoadon_id',
        as: 'items',
    });
    ChiTietHoaDon.belongsTo(HoaDon, {
        foreignKey: 'hoadon_id',
        as: 'hoadon',
    });

    // ThongSoKyThuat -> ChiTietHoaDon (One-to-Many)
    ThongSoKyThuat.hasMany(ChiTietHoaDon, {
        foreignKey: 'thongsokythuat_id',
        as: 'chitiet_hoadons',
    });
    ChiTietHoaDon.belongsTo(ThongSoKyThuat, {
        foreignKey: 'thongsokythuat_id',
        as: 'thongsokythuat',
    });

    // TaiKhoan -> DiaChi (One-to-Many)
    TaiKhoan.hasMany(DiaChi, {
        foreignKey: 'ma_tk',
        as: 'diachis',
    });
    DiaChi.belongsTo(TaiKhoan, {
        foreignKey: 'ma_tk',
        as: 'taikhoan',
    });

    // NhaCungCap -> PhieuNhap (One-to-Many)
    NhaCungCap.hasMany(PhieuNhap, {
        foreignKey: 'nhacungcap_id',
        as: 'phieunhaps',
    });
    PhieuNhap.belongsTo(NhaCungCap, {
        foreignKey: 'nhacungcap_id',
        as: 'nhacungcap',
    });

    // TaiKhoan -> PhieuNhap (One-to-Many) - người nhập
    TaiKhoan.hasMany(PhieuNhap, {
        foreignKey: 'nguoi_nhap_id',
        as: 'phieunhaps',
    });
    PhieuNhap.belongsTo(TaiKhoan, {
        foreignKey: 'nguoi_nhap_id',
        as: 'nguoi_nhap',
    });

    // PhieuNhap -> ChiTietPhieuNhap (One-to-Many)
    PhieuNhap.hasMany(ChiTietPhieuNhap, {
        foreignKey: 'phieunhap_id',
        as: 'items',
    });
    ChiTietPhieuNhap.belongsTo(PhieuNhap, {
        foreignKey: 'phieunhap_id',
        as: 'phieunhap',
    });

    // ThongSoKyThuat -> ChiTietPhieuNhap (One-to-Many)
    ThongSoKyThuat.hasMany(ChiTietPhieuNhap, {
        foreignKey: 'thongsokythuat_id',
        as: 'chitiet_phieunhaps',
    });
    ChiTietPhieuNhap.belongsTo(ThongSoKyThuat, {
        foreignKey: 'thongsokythuat_id',
        as: 'thongsokythuat',
    });

    // TaiKhoan -> HoiThoai (One-to-Many)
    TaiKhoan.hasMany(HoiThoai, {
        foreignKey: 'taikhoan_id',
        as: 'hoithoais',
    });
    HoiThoai.belongsTo(TaiKhoan, {
        foreignKey: 'taikhoan_id',
        as: 'taikhoan',
    });

    // HoiThoai -> TinNhan (One-to-Many)
    HoiThoai.hasMany(TinNhan, {
        foreignKey: 'hoithoai_id',
        as: 'tinnhans',
    });
    TinNhan.belongsTo(HoiThoai, {
        foreignKey: 'hoithoai_id',
        as: 'hoithoai',
    });
};

// Export all models
export {
    TaiKhoan,
    VaiTro,
    Quyen,
    DanhMuc,
    SanPham,
    ThongSoKyThuat,
    GioHang,
    ChiTietGioHang,
    HoaDon,
    ChiTietHoaDon,
    DiaChi,
    NhaCungCap,
    PhieuNhap,
    ChiTietPhieuNhap,
    HoiThoai,
    TinNhan,
};
