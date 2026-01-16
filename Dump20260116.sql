-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: laptop_shop
-- ------------------------------------------------------
-- Server version	9.4.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `chitiet_giohang`
--

DROP TABLE IF EXISTS `chitiet_giohang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chitiet_giohang` (
  `id_ctgiohang` int NOT NULL AUTO_INCREMENT,
  `giohang_id` int NOT NULL,
  `thongsokythuat_id` int NOT NULL COMMENT 'Sản phẩm (variant) nào',
  `soluong` int NOT NULL,
  PRIMARY KEY (`id_ctgiohang`),
  KEY `thongsokythuat_id` (`thongsokythuat_id`),
  KEY `idx_giohang` (`giohang_id`),
  CONSTRAINT `chitiet_giohang_ibfk_1` FOREIGN KEY (`giohang_id`) REFERENCES `giohang` (`id_giohang`) ON DELETE CASCADE,
  CONSTRAINT `chitiet_giohang_ibfk_2` FOREIGN KEY (`thongsokythuat_id`) REFERENCES `thongso_kythuat` (`id_thongsokythuat`) ON DELETE CASCADE,
  CONSTRAINT `chitiet_giohang_chk_1` CHECK ((`soluong` > 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Chi tiết giỏ hàng';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chitiet_giohang`
--

LOCK TABLES `chitiet_giohang` WRITE;
/*!40000 ALTER TABLE `chitiet_giohang` DISABLE KEYS */;
/*!40000 ALTER TABLE `chitiet_giohang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chitiet_hoadon`
--

DROP TABLE IF EXISTS `chitiet_hoadon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chitiet_hoadon` (
  `id_cthoadon` int NOT NULL AUTO_INCREMENT,
  `hoadon_id` int NOT NULL,
  `thongsokythuat_id` int NOT NULL COMMENT 'Sản phẩm (variant) nào',
  `soluong` int NOT NULL,
  `gia_luc_mua` decimal(12,2) NOT NULL COMMENT 'Giá bán tại thời điểm chốt đơn',
  PRIMARY KEY (`id_cthoadon`),
  KEY `thongsokythuat_id` (`thongsokythuat_id`),
  KEY `idx_hoadon` (`hoadon_id`),
  CONSTRAINT `chitiet_hoadon_ibfk_1` FOREIGN KEY (`hoadon_id`) REFERENCES `hoadon` (`id_hoadon`) ON DELETE CASCADE,
  CONSTRAINT `chitiet_hoadon_ibfk_2` FOREIGN KEY (`thongsokythuat_id`) REFERENCES `thongso_kythuat` (`id_thongsokythuat`) ON DELETE RESTRICT,
  CONSTRAINT `chitiet_hoadon_chk_1` CHECK ((`soluong` > 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Chi tiết hóa đơn';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chitiet_hoadon`
--

LOCK TABLES `chitiet_hoadon` WRITE;
/*!40000 ALTER TABLE `chitiet_hoadon` DISABLE KEYS */;
/*!40000 ALTER TABLE `chitiet_hoadon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chitiet_phieunhap`
--

DROP TABLE IF EXISTS `chitiet_phieunhap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chitiet_phieunhap` (
  `id_ctphieunhap` int NOT NULL AUTO_INCREMENT,
  `phieunhap_id` int NOT NULL,
  `thongsokythuat_id` int NOT NULL COMMENT 'Nhập variant cụ thể',
  `soluong_nhap` int NOT NULL,
  `gia_nhap` decimal(12,2) NOT NULL COMMENT 'Giá vốn/đơn vị',
  PRIMARY KEY (`id_ctphieunhap`),
  KEY `thongsokythuat_id` (`thongsokythuat_id`),
  KEY `idx_phieunhap` (`phieunhap_id`),
  CONSTRAINT `chitiet_phieunhap_ibfk_1` FOREIGN KEY (`phieunhap_id`) REFERENCES `phieunhap` (`id_phieunhap`) ON DELETE CASCADE,
  CONSTRAINT `chitiet_phieunhap_ibfk_2` FOREIGN KEY (`thongsokythuat_id`) REFERENCES `thongso_kythuat` (`id_thongsokythuat`) ON DELETE RESTRICT,
  CONSTRAINT `chitiet_phieunhap_chk_1` CHECK ((`soluong_nhap` > 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Chi tiết phiếu nhập';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chitiet_phieunhap`
--

LOCK TABLES `chitiet_phieunhap` WRITE;
/*!40000 ALTER TABLE `chitiet_phieunhap` DISABLE KEYS */;
/*!40000 ALTER TABLE `chitiet_phieunhap` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `danhmuc`
--

DROP TABLE IF EXISTS `danhmuc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `danhmuc` (
  `id_danhmuc` int NOT NULL AUTO_INCREMENT,
  `ten_danhmuc` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Gaming, Văn phòng...',
  PRIMARY KEY (`id_danhmuc`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Danh mục sản phẩm';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `danhmuc`
--

LOCK TABLES `danhmuc` WRITE;
/*!40000 ALTER TABLE `danhmuc` DISABLE KEYS */;
INSERT INTO `danhmuc` VALUES (1,'Laptop Gaming'),(2,'Laptop Văn phòng'),(3,'Laptop Đồ họa'),(4,'Laptop Mỏng nhẹ');
/*!40000 ALTER TABLE `danhmuc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diachi`
--

DROP TABLE IF EXISTS `diachi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `diachi` (
  `id_diachi` int NOT NULL AUTO_INCREMENT,
  `dia_chi` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Địa chỉ giao hàng',
  `sodienthoai` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Số điện thoại liên lạc',
  `ma_tk` int NOT NULL COMMENT 'Địa chỉ thuộc tài khoản nào',
  PRIMARY KEY (`id_diachi`),
  KEY `idx_taikhoan` (`ma_tk`),
  CONSTRAINT `diachi_ibfk_1` FOREIGN KEY (`ma_tk`) REFERENCES `taikhoan` (`id_taikhoan`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Địa chỉ giao hàng';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diachi`
--

LOCK TABLES `diachi` WRITE;
/*!40000 ALTER TABLE `diachi` DISABLE KEYS */;
/*!40000 ALTER TABLE `diachi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `giohang`
--

DROP TABLE IF EXISTS `giohang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `giohang` (
  `id_giohang` int NOT NULL AUTO_INCREMENT,
  `taikhoan_id` int NOT NULL,
  `ngay_tao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_giohang`),
  KEY `taikhoan_id` (`taikhoan_id`),
  CONSTRAINT `giohang_ibfk_1` FOREIGN KEY (`taikhoan_id`) REFERENCES `taikhoan` (`id_taikhoan`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Giỏ hàng';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `giohang`
--

LOCK TABLES `giohang` WRITE;
/*!40000 ALTER TABLE `giohang` DISABLE KEYS */;
/*!40000 ALTER TABLE `giohang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hoadon`
--

DROP TABLE IF EXISTS `hoadon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hoadon` (
  `id_hoadon` int NOT NULL AUTO_INCREMENT,
  `ma_don_hang` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Mã hiển thị (DH2024-XXX)',
  `taikhoan_id` int NOT NULL COMMENT 'Khách hàng nào mua',
  `ngay_dat` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `tong_tien` decimal(15,2) NOT NULL COMMENT 'Tổng tiền phải thanh toán',
  `trangthai` enum('Chờ duyệt','Đang giao','Hoàn thành','Hủy') COLLATE utf8mb4_unicode_ci DEFAULT 'Chờ duyệt',
  `hinhthuc_thanhtoan` enum('COD','Chuyển khoản','VNPay','MoMo','ZaloPay') COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_hoadon`),
  UNIQUE KEY `ma_don_hang` (`ma_don_hang`),
  KEY `idx_ma_don_hang` (`ma_don_hang`),
  KEY `idx_taikhoan` (`taikhoan_id`),
  KEY `idx_trangthai` (`trangthai`),
  CONSTRAINT `hoadon_ibfk_1` FOREIGN KEY (`taikhoan_id`) REFERENCES `taikhoan` (`id_taikhoan`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Hóa đơn bán hàng';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hoadon`
--

LOCK TABLES `hoadon` WRITE;
/*!40000 ALTER TABLE `hoadon` DISABLE KEYS */;
/*!40000 ALTER TABLE `hoadon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hoithoai`
--

DROP TABLE IF EXISTS `hoithoai`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hoithoai` (
  `id_hoithoai` int NOT NULL AUTO_INCREMENT,
  `taikhoan_id` int DEFAULT NULL COMMENT 'Mã người dùng (nếu đã đăng nhập)',
  `session_uuid` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Mã định danh trình duyệt (nếu chưa đăng nhập)',
  `thoi_gian_tao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_hoithoai`),
  KEY `idx_taikhoan` (`taikhoan_id`),
  KEY `idx_session` (`session_uuid`),
  CONSTRAINT `hoithoai_ibfk_1` FOREIGN KEY (`taikhoan_id`) REFERENCES `taikhoan` (`id_taikhoan`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Phiên hội thoại';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hoithoai`
--

LOCK TABLES `hoithoai` WRITE;
/*!40000 ALTER TABLE `hoithoai` DISABLE KEYS */;
/*!40000 ALTER TABLE `hoithoai` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nhacungcap`
--

DROP TABLE IF EXISTS `nhacungcap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nhacungcap` (
  `id_nhacungcap` int NOT NULL AUTO_INCREMENT,
  `ten_nha_cung_cap` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Tên công ty',
  `nguoi_lien_he` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Tên người đại diện',
  `so_dienthoai` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Số điện thoại',
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Email liên hệ',
  `diachi` text COLLATE utf8mb4_unicode_ci COMMENT 'Địa chỉ kho',
  PRIMARY KEY (`id_nhacungcap`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Quản lý nhà cung cấp';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nhacungcap`
--

LOCK TABLES `nhacungcap` WRITE;
/*!40000 ALTER TABLE `nhacungcap` DISABLE KEYS */;
INSERT INTO `nhacungcap` VALUES (1,'Dell Vietnam','Nguyễn Minh','0281234567','contact@dell.vn',NULL),(2,'HP Distribution','Trần Hùng','0282234567','sales@hp.vn',NULL);
/*!40000 ALTER TABLE `nhacungcap` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phieunhap`
--

DROP TABLE IF EXISTS `phieunhap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phieunhap` (
  `id_phieunhap` int NOT NULL AUTO_INCREMENT,
  `ma_chung_tu` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Mã phiếu (PN001)',
  `nhacungcap_id` int NOT NULL,
  `nguoi_nhap_id` int NOT NULL COMMENT 'FK taikhoan - ai thực hiện nhập',
  `ngay_nhap` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `tong_tien_nhap` decimal(15,2) NOT NULL DEFAULT '0.00' COMMENT 'Tổng giá trị đơn nhập',
  `ghi_chu` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id_phieunhap`),
  UNIQUE KEY `ma_chung_tu` (`ma_chung_tu`),
  KEY `nhacungcap_id` (`nhacungcap_id`),
  KEY `nguoi_nhap_id` (`nguoi_nhap_id`),
  KEY `idx_ma_chung_tu` (`ma_chung_tu`),
  KEY `idx_ngay_nhap` (`ngay_nhap`),
  CONSTRAINT `phieunhap_ibfk_1` FOREIGN KEY (`nhacungcap_id`) REFERENCES `nhacungcap` (`id_nhacungcap`) ON DELETE RESTRICT,
  CONSTRAINT `phieunhap_ibfk_2` FOREIGN KEY (`nguoi_nhap_id`) REFERENCES `taikhoan` (`id_taikhoan`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Phiếu nhập kho';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phieunhap`
--

LOCK TABLES `phieunhap` WRITE;
/*!40000 ALTER TABLE `phieunhap` DISABLE KEYS */;
/*!40000 ALTER TABLE `phieunhap` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quyen`
--

DROP TABLE IF EXISTS `quyen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quyen` (
  `id_quyen` int NOT NULL AUTO_INCREMENT,
  `ma_quyen` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'product.create, order.view',
  `ten_hienthi` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Tên hiển thị của quyền',
  PRIMARY KEY (`id_quyen`),
  UNIQUE KEY `ma_quyen` (`ma_quyen`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Danh sách quyền hạn';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quyen`
--

LOCK TABLES `quyen` WRITE;
/*!40000 ALTER TABLE `quyen` DISABLE KEYS */;
INSERT INTO `quyen` VALUES (1,'product.create','Tạo sản phẩm'),(2,'product.view','Xem sản phẩm'),(3,'order.create','Tạo đơn hàng'),(4,'order.view','Xem đơn hàng'),(5,'inventory.import','Nhập kho');
/*!40000 ALTER TABLE `quyen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sanpham`
--

DROP TABLE IF EXISTS `sanpham`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sanpham` (
  `id_sanpham` int NOT NULL AUTO_INCREMENT,
  `ten_sanpham` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Dell XPS 13 9320',
  `thuonghieu` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Dell, HP, Lenovo...',
  `danhmuc_id` int NOT NULL,
  `mota` text COLLATE utf8mb4_unicode_ci COMMENT 'Mô tả vắn tắt',
  `anh_daidien` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Link ảnh đại diện',
  `ngay_capnhat` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_sanpham`),
  KEY `idx_danhmuc` (`danhmuc_id`),
  KEY `idx_thuonghieu` (`thuonghieu`),
  CONSTRAINT `sanpham_ibfk_1` FOREIGN KEY (`danhmuc_id`) REFERENCES `danhmuc` (`id_danhmuc`) ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Thông tin sản phẩm';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sanpham`
--

LOCK TABLES `sanpham` WRITE;
/*!40000 ALTER TABLE `sanpham` DISABLE KEYS */;
INSERT INTO `sanpham` VALUES (1,'Dell XPS 13 9320','Dell',4,'Ultrabook cao cấp, màn hình FHD+',NULL,'2026-01-16 06:13:59'),(2,'HP Pavilion Gaming 15','HP',1,'Laptop gaming giá tốt, GTX 1650',NULL,'2026-01-16 06:13:59');
/*!40000 ALTER TABLE `sanpham` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taikhoan`
--

DROP TABLE IF EXISTS `taikhoan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `taikhoan` (
  `id_taikhoan` int NOT NULL AUTO_INCREMENT,
  `hoten` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Họ và tên đầy đủ',
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Email đăng nhập',
  `matkhau` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Mật khẩu đã mã hóa',
  `ngay_tao` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Ngày đăng ký',
  `trangthai` tinyint(1) DEFAULT '1' COMMENT 'Trạng thái hoạt động',
  PRIMARY KEY (`id_taikhoan`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Quản lý tài khoản người dùng';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taikhoan`
--

LOCK TABLES `taikhoan` WRITE;
/*!40000 ALTER TABLE `taikhoan` DISABLE KEYS */;
INSERT INTO `taikhoan` VALUES (1,'Admin System','admin@laptop.com','$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy','2026-01-16 06:13:59',1),(2,'Nguyễn Văn A','customer@gmail.com','$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy','2026-01-16 06:13:59',1);
/*!40000 ALTER TABLE `taikhoan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taikhoan_vaitro`
--

DROP TABLE IF EXISTS `taikhoan_vaitro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `taikhoan_vaitro` (
  `taikhoan_id` int NOT NULL,
  `vaitro_id` int NOT NULL,
  PRIMARY KEY (`taikhoan_id`,`vaitro_id`),
  KEY `vaitro_id` (`vaitro_id`),
  CONSTRAINT `taikhoan_vaitro_ibfk_1` FOREIGN KEY (`taikhoan_id`) REFERENCES `taikhoan` (`id_taikhoan`) ON DELETE CASCADE,
  CONSTRAINT `taikhoan_vaitro_ibfk_2` FOREIGN KEY (`vaitro_id`) REFERENCES `vaitro` (`id_vaitro`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Mapping tài khoản - vai trò';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taikhoan_vaitro`
--

LOCK TABLES `taikhoan_vaitro` WRITE;
/*!40000 ALTER TABLE `taikhoan_vaitro` DISABLE KEYS */;
INSERT INTO `taikhoan_vaitro` VALUES (1,1),(2,3);
/*!40000 ALTER TABLE `taikhoan_vaitro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thongso_kythuat`
--

DROP TABLE IF EXISTS `thongso_kythuat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thongso_kythuat` (
  `id_thongsokythuat` int NOT NULL AUTO_INCREMENT,
  `id_sanpham` int NOT NULL COMMENT 'Mã sản phẩm',
  `sku` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'DELL-XPS-I5-8GB-256GB',
  `ten_hienthi` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Dell XPS 13 - Core i5/8GB/256GB',
  `cpu` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Intel Core i5-1235U',
  `ram` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '8GB DDR4',
  `dungluong` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '256GB SSD NVMe',
  `card_roi` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'NVIDIA GTX 1650 (nếu có)',
  `manhinh` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '13.4" FHD+ IPS',
  `trongluong` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '1.2kg',
  `congketnoi` text COLLATE utf8mb4_unicode_ci COMMENT '2x USB-C, 1x HDMI',
  `hedieuhanh` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT 'Windows 11' COMMENT 'Hệ điều hành',
  `gia_ban` decimal(12,2) NOT NULL COMMENT 'Giá bán',
  `ton_kho` int DEFAULT '0' COMMENT 'Số lượng còn trong kho',
  PRIMARY KEY (`id_thongsokythuat`),
  UNIQUE KEY `sku` (`sku`),
  KEY `idx_sku` (`sku`),
  KEY `idx_sanpham` (`id_sanpham`),
  KEY `idx_gia` (`gia_ban`),
  CONSTRAINT `thongso_kythuat_ibfk_1` FOREIGN KEY (`id_sanpham`) REFERENCES `sanpham` (`id_sanpham`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Thông số kỹ thuật & biến thể sản phẩm';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thongso_kythuat`
--

LOCK TABLES `thongso_kythuat` WRITE;
/*!40000 ALTER TABLE `thongso_kythuat` DISABLE KEYS */;
INSERT INTO `thongso_kythuat` VALUES (1,1,'DELL-XPS13-I5-8GB-256GB','Dell XPS 13 - Core i5/8GB/256GB','Intel Core i5-1235U','8GB LPDDR5','256GB SSD NVMe','Intel Iris Xe','13.4\" FHD+ IPS','1.24kg','2x Thunderbolt 4, 1x 3.5mm','Windows 11',25990000.00,15),(2,1,'DELL-XPS13-I7-16GB-512GB','Dell XPS 13 - Core i7/16GB/512GB','Intel Core i7-1255U','16GB LPDDR5','512GB SSD NVMe','Intel Iris Xe','13.4\" FHD+ IPS','1.24kg','2x Thunderbolt 4, 1x 3.5mm','Windows 11',32990000.00,10),(3,2,'HP-PAV15-I5-8GB-512GB-1650','HP Pavilion Gaming 15 - i5/8GB/512GB/GTX1650','Intel Core i5-11300H','8GB DDR4','512GB SSD NVMe','NVIDIA GTX 1650 4GB','15.6\" FHD 144Hz','2.08kg','1x USB-C, 3x USB-A, HDMI','Windows 11',18990000.00,20);
/*!40000 ALTER TABLE `thongso_kythuat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tinnhan`
--

DROP TABLE IF EXISTS `tinnhan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tinnhan` (
  `id_tinnhan` int NOT NULL AUTO_INCREMENT,
  `hoithoai_id` int NOT NULL,
  `vai_tro` enum('User','Assistant') COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Ai nói',
  `noi_dung` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Nội dung tin nhắn',
  `thoi_gian_gui` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_tinnhan`),
  KEY `idx_hoithoai` (`hoithoai_id`),
  KEY `idx_time` (`thoi_gian_gui`),
  CONSTRAINT `tinnhan_ibfk_1` FOREIGN KEY (`hoithoai_id`) REFERENCES `hoithoai` (`id_hoithoai`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tin nhắn trong hội thoại';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tinnhan`
--

LOCK TABLES `tinnhan` WRITE;
/*!40000 ALTER TABLE `tinnhan` DISABLE KEYS */;
/*!40000 ALTER TABLE `tinnhan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vaitro`
--

DROP TABLE IF EXISTS `vaitro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vaitro` (
  `id_vaitro` int NOT NULL AUTO_INCREMENT,
  `ten_vaitro` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Admin, Sale, Khách hàng',
  `mota` text COLLATE utf8mb4_unicode_ci COMMENT 'Mô tả vai trò',
  PRIMARY KEY (`id_vaitro`),
  UNIQUE KEY `ten_vaitro` (`ten_vaitro`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Danh sách vai trò';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vaitro`
--

LOCK TABLES `vaitro` WRITE;
/*!40000 ALTER TABLE `vaitro` DISABLE KEYS */;
INSERT INTO `vaitro` VALUES (1,'Admin','Quản trị viên toàn quyền'),(2,'Sale','Nhân viên bán hàng'),(3,'Customer','Khách hàng');
/*!40000 ALTER TABLE `vaitro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vaitro_quyen`
--

DROP TABLE IF EXISTS `vaitro_quyen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vaitro_quyen` (
  `vaitro_id` int NOT NULL,
  `quyen_id` int NOT NULL,
  PRIMARY KEY (`vaitro_id`,`quyen_id`),
  KEY `quyen_id` (`quyen_id`),
  CONSTRAINT `vaitro_quyen_ibfk_1` FOREIGN KEY (`vaitro_id`) REFERENCES `vaitro` (`id_vaitro`) ON DELETE CASCADE,
  CONSTRAINT `vaitro_quyen_ibfk_2` FOREIGN KEY (`quyen_id`) REFERENCES `quyen` (`id_quyen`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Mapping vai trò - quyền';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vaitro_quyen`
--

LOCK TABLES `vaitro_quyen` WRITE;
/*!40000 ALTER TABLE `vaitro_quyen` DISABLE KEYS */;
INSERT INTO `vaitro_quyen` VALUES (1,1),(1,2),(3,2),(1,3),(3,3),(1,4),(3,4),(1,5);
/*!40000 ALTER TABLE `vaitro_quyen` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-16 13:14:23
