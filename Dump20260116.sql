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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Chi tiết giỏ hàng';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chitiet_giohang`
--

LOCK TABLES `chitiet_giohang` WRITE;
/*!40000 ALTER TABLE `chitiet_giohang` DISABLE KEYS */;
INSERT INTO `chitiet_giohang` VALUES (1,1,1,1),(2,1,9,2),(3,2,5,1),(4,2,21,1),(7,3,5,1),(10,3,15,1),(11,3,6,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Chi tiết hóa đơn';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chitiet_hoadon`
--

LOCK TABLES `chitiet_hoadon` WRITE;
/*!40000 ALTER TABLE `chitiet_hoadon` DISABLE KEYS */;
INSERT INTO `chitiet_hoadon` VALUES (1,1,1,1,25990000.00),(2,1,9,1,15990000.00),(3,1,21,1,23990000.00),(4,2,1,1,25990000.00),(5,3,5,1,29990000.00),(6,3,7,1,42990000.00),(7,4,9,1,15990000.00),(8,5,2,1,32990000.00),(9,6,3,1,18990000.00),(10,6,1,1,25990000.00),(11,6,5,1,29990000.00),(12,7,3,1,18990000.00),(13,7,1,1,25990000.00),(14,7,5,1,29990000.00),(15,8,3,1,18990000.00),(16,8,1,1,25990000.00),(17,8,5,1,29990000.00),(18,9,3,1,18990000.00),(19,9,1,2,25990000.00),(20,9,5,1,29990000.00),(21,10,3,1,18990000.00),(22,10,1,2,25990000.00),(23,10,5,1,29990000.00),(24,11,5,1,29990000.00),(25,12,5,1,29990000.00),(26,13,5,1,29990000.00),(27,14,3,1,18990000.00),(28,14,5,1,29990000.00),(29,15,3,1,18990000.00),(30,15,5,1,29990000.00),(31,15,13,1,34990000.00),(32,16,3,1,18990000.00),(33,17,3,1,18990000.00),(34,18,7,1,42990000.00),(35,19,2,1,32990000.00),(36,20,3,1,18990000.00),(37,21,1,1,25990000.00),(38,21,5,1,29990000.00),(39,22,3,1,18990000.00),(40,23,7,1,42990000.00);
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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Chi tiết phiếu nhập';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chitiet_phieunhap`
--

LOCK TABLES `chitiet_phieunhap` WRITE;
/*!40000 ALTER TABLE `chitiet_phieunhap` DISABLE KEYS */;
INSERT INTO `chitiet_phieunhap` VALUES (1,1,1,10,22000000.00),(2,1,2,8,28000000.00),(3,1,15,15,19500000.00),(4,1,16,12,24500000.00),(5,2,3,15,16000000.00),(6,2,4,10,21000000.00),(7,2,17,12,23500000.00),(8,2,18,8,30500000.00),(9,3,5,12,25000000.00),(10,3,6,6,33500000.00),(11,3,7,8,36000000.00),(12,3,8,4,46500000.00),(13,3,23,10,22000000.00),(14,3,24,8,27500000.00),(15,4,9,20,13500000.00),(16,4,10,12,16000000.00),(17,4,21,12,20000000.00),(18,4,22,10,25000000.00);
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
  `ten_danhmuc` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Gaming, Văn phòng...',
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
  `dia_chi` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Địa chỉ giao hàng',
  `sodienthoai` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Số điện thoại liên lạc',
  `ma_tk` int NOT NULL COMMENT 'Địa chỉ thuộc tài khoản nào',
  PRIMARY KEY (`id_diachi`),
  KEY `idx_taikhoan` (`ma_tk`),
  CONSTRAINT `diachi_ibfk_1` FOREIGN KEY (`ma_tk`) REFERENCES `taikhoan` (`id_taikhoan`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Địa chỉ giao hàng';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diachi`
--

LOCK TABLES `diachi` WRITE;
/*!40000 ALTER TABLE `diachi` DISABLE KEYS */;
INSERT INTO `diachi` VALUES (1,'123 Nguyễn Văn Linh, Quận 7, TP.HCM','0901234567',2),(2,'456 Lê Lợi, Quận 1, TP.HCM','0902345678',2),(3,'789 Trần Hưng Đạo, Quận 5, TP.HCM','0903456789',3),(4,'321 Võ Văn Tần, Quận 3, TP.HCM','0904567890',3),(5,'654 Cao Thắng, Quận 10, TP.HCM','0905678901',2);
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Giỏ hàng';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `giohang`
--

LOCK TABLES `giohang` WRITE;
/*!40000 ALTER TABLE `giohang` DISABLE KEYS */;
INSERT INTO `giohang` VALUES (1,2,'2026-01-15 03:30:00'),(2,3,'2026-01-16 07:20:00'),(3,6,'2026-01-18 07:43:31'),(4,4,'2026-01-18 08:13:39');
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
  `ma_don_hang` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Mã hiển thị (DH2024-XXX)',
  `taikhoan_id` int NOT NULL COMMENT 'Khách hàng nào mua',
  `ngay_dat` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `tong_tien` decimal(15,2) NOT NULL COMMENT 'Tổng tiền phải thanh toán',
  `trangthai` enum('Chờ duyệt','Đang giao','Hoàn thành','Hủy') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'Chờ duyệt',
  `hinhthuc_thanhtoan` enum('COD','Chuyển khoản','VNPay','MoMo','ZaloPay') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_hoadon`),
  UNIQUE KEY `ma_don_hang` (`ma_don_hang`),
  KEY `idx_ma_don_hang` (`ma_don_hang`),
  KEY `idx_taikhoan` (`taikhoan_id`),
  KEY `idx_trangthai` (`trangthai`),
  CONSTRAINT `hoadon_ibfk_1` FOREIGN KEY (`taikhoan_id`) REFERENCES `taikhoan` (`id_taikhoan`) ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Hóa đơn bán hàng';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hoadon`
--

LOCK TABLES `hoadon` WRITE;
/*!40000 ALTER TABLE `hoadon` DISABLE KEYS */;
INSERT INTO `hoadon` VALUES (1,'HD2026011001',2,'2026-01-10 02:30:00',69970000.00,'Chờ duyệt','VNPay'),(2,'HD2026011201',2,'2026-01-12 07:15:00',25990000.00,'Đang giao','COD'),(3,'HD2026010801',3,'2026-01-08 09:45:00',72980000.00,'Hoàn thành','MoMo'),(4,'HD2026011601',3,'2026-01-16 04:20:00',15990000.00,'Chờ duyệt','Chuyển khoản'),(5,'HD2026011401',2,'2026-01-14 03:00:00',32990000.00,'Đang giao','VNPay'),(6,'DH1768724392035',6,'2026-01-18 08:19:52',74970000.00,'Chờ duyệt','MoMo'),(7,'DH1768724500872',6,'2026-01-18 08:21:40',74970000.00,'Chờ duyệt','MoMo'),(8,'DH1768724539274',6,'2026-01-18 08:22:19',74970000.00,'Chờ duyệt','ZaloPay'),(9,'DH1768724617163',6,'2026-01-18 08:23:37',100960000.00,'Chờ duyệt','MoMo'),(10,'DH1768725195006',6,'2026-01-18 08:33:15',100960000.00,'Chờ duyệt','MoMo'),(11,'DH1768725342211',6,'2026-01-18 08:35:42',29990000.00,'Chờ duyệt','MoMo'),(12,'DH1768725523174',6,'2026-01-18 08:38:43',29990000.00,'Chờ duyệt','COD'),(13,'DH1768725535849',6,'2026-01-18 08:38:55',29990000.00,'Chờ duyệt','MoMo'),(14,'DH1768739257015',4,'2026-01-18 12:27:37',48980000.00,'Chờ duyệt','COD'),(15,'DH1768788220879',4,'2026-01-19 02:03:40',83970000.00,'Chờ duyệt','ZaloPay'),(16,'DH1768788252512',4,'2026-01-19 02:04:12',18990000.00,'Chờ duyệt','Chuyển khoản'),(17,'DH1768789731607',4,'2026-01-19 02:28:51',18990000.00,'Chờ duyệt','Chuyển khoản'),(18,'DH1768789787837',4,'2026-01-19 02:29:47',42990000.00,'Chờ duyệt','VNPay'),(19,'DH1768789809233',4,'2026-01-19 02:30:09',32990000.00,'Chờ duyệt','ZaloPay'),(20,'DH1768796954281',4,'2026-01-19 04:29:14',18990000.00,'Chờ duyệt','VNPay'),(21,'DH1772415792532',4,'2026-03-02 01:43:12',55980000.00,'Chờ duyệt','MoMo'),(22,'DH1772415821059',4,'2026-03-02 01:43:41',18990000.00,'Chờ duyệt','ZaloPay'),(23,'DH1772415848137',4,'2026-03-02 01:44:08',42990000.00,'Chờ duyệt','MoMo');
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
  `session_uuid` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Mã định danh trình duyệt (nếu chưa đăng nhập)',
  `thoi_gian_tao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_hoithoai`),
  KEY `idx_taikhoan` (`taikhoan_id`),
  KEY `idx_session` (`session_uuid`),
  CONSTRAINT `hoithoai_ibfk_1` FOREIGN KEY (`taikhoan_id`) REFERENCES `taikhoan` (`id_taikhoan`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Phiên hội thoại';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hoithoai`
--

LOCK TABLES `hoithoai` WRITE;
/*!40000 ALTER TABLE `hoithoai` DISABLE KEYS */;
INSERT INTO `hoithoai` VALUES (1,2,'sess-2a9f3c1b-20260115','2026-01-15 03:00:00'),(2,3,'sess-3b8e7d4a-20260116','2026-01-16 08:30:00'),(3,NULL,'guest-a1f9c7e3-20260117','2026-01-17 02:45:00'),(4,NULL,'guest-b4d2e8c9-20260117','2026-01-17 04:20:00');
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
  `ten_nha_cung_cap` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Tên công ty',
  `nguoi_lien_he` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Tên người đại diện',
  `so_dienthoai` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Số điện thoại',
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Email liên hệ',
  `diachi` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT 'Địa chỉ kho',
  PRIMARY KEY (`id_nhacungcap`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Quản lý nhà cung cấp';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nhacungcap`
--

LOCK TABLES `nhacungcap` WRITE;
/*!40000 ALTER TABLE `nhacungcap` DISABLE KEYS */;
INSERT INTO `nhacungcap` VALUES (1,'Dell Vietnam','Nguyễn Minh','0281234567','contact@dell.vn',NULL),(2,'HP Distribution','Trần Hùng','0282234567','sales@hp.vn',NULL),(3,'Lenovo Vietnam','Lê Anh','0283234567','sales@lenovo.vn',NULL),(4,'Asus Vietnam','Phạm Việt','0284234567','contact@asus.vn',NULL);
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
  `ma_chung_tu` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Mã phiếu (PN001)',
  `nhacungcap_id` int NOT NULL,
  `nguoi_nhap_id` int NOT NULL COMMENT 'FK taikhoan - ai thực hiện nhập',
  `ngay_nhap` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `tong_tien_nhap` decimal(15,2) NOT NULL DEFAULT '0.00' COMMENT 'Tổng giá trị đơn nhập',
  `ghi_chu` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id_phieunhap`),
  UNIQUE KEY `ma_chung_tu` (`ma_chung_tu`),
  KEY `nhacungcap_id` (`nhacungcap_id`),
  KEY `nguoi_nhap_id` (`nguoi_nhap_id`),
  KEY `idx_ma_chung_tu` (`ma_chung_tu`),
  KEY `idx_ngay_nhap` (`ngay_nhap`),
  CONSTRAINT `phieunhap_ibfk_1` FOREIGN KEY (`nhacungcap_id`) REFERENCES `nhacungcap` (`id_nhacungcap`) ON DELETE RESTRICT,
  CONSTRAINT `phieunhap_ibfk_2` FOREIGN KEY (`nguoi_nhap_id`) REFERENCES `taikhoan` (`id_taikhoan`) ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Phiếu nhập kho';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phieunhap`
--

LOCK TABLES `phieunhap` WRITE;
/*!40000 ALTER TABLE `phieunhap` DISABLE KEYS */;
INSERT INTO `phieunhap` VALUES (1,'PN20260101-001',1,1,'2026-01-01 01:00:00',450000000.00,'Nhập lô Dell đầu năm'),(2,'PN20260105-002',2,1,'2026-01-05 02:30:00',280000000.00,'Nhập HP Pavilion & EliteBook'),(3,'PN20260108-003',3,1,'2026-01-08 03:15:00',520000000.00,'Nhập laptop gaming Lenovo'),(4,'PN20260112-004',4,1,'2026-01-12 07:00:00',195000000.00,'Nhập Asus ZenBook & ROG');
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
  `ma_quyen` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'product.create, order.view',
  `ten_hienthi` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Tên hiển thị của quyền',
  PRIMARY KEY (`id_quyen`),
  UNIQUE KEY `ma_quyen` (`ma_quyen`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Danh sách quyền hạn';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quyen`
--

LOCK TABLES `quyen` WRITE;
/*!40000 ALTER TABLE `quyen` DISABLE KEYS */;
INSERT INTO `quyen` VALUES (1,'product.create','Tạo sản phẩm'),(2,'product.view','Xem sản phẩm'),(3,'order.create','Tạo đơn hàng'),(4,'order.view','Xem đơn hàng'),(5,'inventory.import','Nhập kho'),(6,'dashboard.view','Xem Dashboard'),(7,'product.edit','Sửa Sản phẩm'),(8,'product.delete','Xóa Sản phẩm'),(9,'order.edit','Sửa Đơn hàng'),(10,'user.view','Xem Người dùng'),(11,'user.edit','Sửa Người dùng');
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
  `ten_sanpham` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Dell XPS 13 9320',
  `thuonghieu` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Dell, HP, Lenovo...',
  `danhmuc_id` int NOT NULL,
  `mota` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT 'Mô tả vắn tắt',
  `anh_daidien` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Link ảnh đại diện',
  `ngay_capnhat` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_sanpham`),
  KEY `idx_danhmuc` (`danhmuc_id`),
  KEY `idx_thuonghieu` (`thuonghieu`),
  CONSTRAINT `sanpham_ibfk_1` FOREIGN KEY (`danhmuc_id`) REFERENCES `danhmuc` (`id_danhmuc`) ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Thông tin sản phẩm';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sanpham`
--

LOCK TABLES `sanpham` WRITE;
/*!40000 ALTER TABLE `sanpham` DISABLE KEYS */;
INSERT INTO `sanpham` VALUES (1,'Dell XPS 13 9320','Dell',4,'Ultrabook cao cấp, màn hình FHD+','uploads/products/dell-xps-13-9320.jpg','2026-01-18 05:52:21'),(2,'HP Pavilion Gaming 15','HP',1,'Laptop gaming giá tốt, GTX 1650','uploads/products/hp-pavilion-gaming-15.jpg','2026-01-18 05:52:21'),(3,'Lenovo Legion 5 Pro','Lenovo',1,'Gaming laptop mạnh mẽ, RTX 3060','uploads/products/lenovo-legion-5-pro.jpg','2026-01-18 05:52:21'),(4,'Asus ROG Strix G15','Asus',1,'Gaming laptop cao cấp, RTX 3070','uploads/products/asus-rog-strix-g15.jpg','2026-01-18 05:52:21'),(5,'Acer Swift 3','Acer',4,'Laptop mỏng nhẹ, pin tốt','uploads/products/acer-swift-3.jpg','2026-01-18 05:52:21'),(6,'MSI Creator Z16','MSI',3,'Laptop đồ họa chuyên nghiệp, RTX 3060','uploads/products/msi-creator-z16.jpg','2026-01-18 05:52:21'),(7,'LG Gram 17','LG',4,'Laptop siêu nhẹ 17 inch','uploads/products/lg-gram-17.jpg','2026-01-18 05:52:21'),(8,'Dell Latitude 5430','Dell',2,'Laptop văn phòng bền bỉ','uploads/products/dell-latitude-5430.jpg','2026-01-18 05:52:21'),(9,'HP EliteBook 840 G9','HP',2,'Laptop doanh nhân cao cấp','uploads/products/hp-elitebook-840-g9.jpg','2026-01-18 05:52:21'),(10,'Lenovo ThinkPad X1 Carbon','Lenovo',2,'Laptop doanh nghiệp hàng đầu','uploads/products/lenovo-thinkpad-x1-carbon.jpg','2026-01-18 05:52:21'),(11,'Asus ZenBook 14','Asus',4,'Ultrabook đẹp, hiệu năng tốt','uploads/products/asus-zenbook-14.jpg','2026-01-18 05:52:21'),(12,'Acer Predator Helios 300','Acer',1,'Gaming laptop hiệu năng cao','uploads/products/acer-predator-helios-300.jpg','2026-01-18 05:52:21'),(13,'MSI GS66 Stealth','MSI',1,'Gaming laptop mỏng nhẹ cao cấp','uploads/products/msi-gs66-stealth.jpg','2026-01-18 05:52:21'),(14,'MacBook Pro 14','Apple',3,'Laptop dành cho nhà sáng tạo, chip M3','uploads/products/macbook-pro-14.jpg','2026-01-18 05:52:21'),(15,'Dell Inspiron 15 3520','Dell',2,'Laptop văn phòng giá rẻ','uploads/products/dell-inspiron-15-3520.jpg','2026-01-18 05:52:21');
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
  `hoten` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Họ và tên đầy đủ',
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Email đăng nhập',
  `matkhau` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Mật khẩu đã mã hóa',
  `sodienthoai` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Số điện thoại',
  `ngay_tao` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Ngày đăng ký',
  `trangthai` tinyint(1) DEFAULT '1' COMMENT 'Trạng thái hoạt động',
  `oauth_provider` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'OAuth provider (google, facebook)',
  `oauth_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'OAuth provider user ID',
  PRIMARY KEY (`id_taikhoan`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Quản lý tài khoản người dùng';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taikhoan`
--

LOCK TABLES `taikhoan` WRITE;
/*!40000 ALTER TABLE `taikhoan` DISABLE KEYS */;
INSERT INTO `taikhoan` VALUES (1,'Admin System','admin@laptop.com','$2b$10$mAKSa/G8JRXraDoJj5VrBOC/QUaYaLbADzr13Q6fkif1GsOCBB7Vq',NULL,'2026-01-18 05:18:08',1,NULL,NULL),(2,'Nguyễn Văn A','customer@gmail.com','$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',NULL,'2026-01-18 05:18:08',1,NULL,NULL),(3,'Trần Thị B','customer2@gmail.com','$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',NULL,'2026-01-18 05:18:08',1,NULL,NULL),(4,'Trần Hoài Bảo_0027','baohoaitran3112@gmail.com','&ccE1X081wbQaB!q','','2026-01-18 07:17:06',1,'google','117669513356195071747'),(6,'Bao Hoai','hoaibao4062004@gmail.com','FiR1KzRQ0^BhhLKH','','2026-01-18 07:27:59',1,'google','112915411242498850262');
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
INSERT INTO `taikhoan_vaitro` VALUES (1,1),(2,3),(3,3),(4,3),(6,3);
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
  `sku` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'DELL-XPS-I5-8GB-256GB',
  `ten_hienthi` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Dell XPS 13 - Core i5/8GB/256GB',
  `cpu` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Intel Core i5-1235U',
  `ram` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '8GB DDR4',
  `dungluong` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '256GB SSD NVMe',
  `card_roi` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'NVIDIA GTX 1650 (nếu có)',
  `manhinh` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '13.4" FHD+ IPS',
  `trongluong` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '1.2kg',
  `congketnoi` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT '2x USB-C, 1x HDMI',
  `hedieuhanh` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'Windows 11' COMMENT 'Hệ điều hành',
  `gia_ban` decimal(12,2) NOT NULL COMMENT 'Giá bán',
  `ton_kho` int DEFAULT '0' COMMENT 'Số lượng còn trong kho',
  PRIMARY KEY (`id_thongsokythuat`),
  UNIQUE KEY `sku` (`sku`),
  KEY `idx_sku` (`sku`),
  KEY `idx_sanpham` (`id_sanpham`),
  KEY `idx_gia` (`gia_ban`),
  CONSTRAINT `thongso_kythuat_ibfk_1` FOREIGN KEY (`id_sanpham`) REFERENCES `sanpham` (`id_sanpham`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Thông số kỹ thuật & biến thể sản phẩm';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thongso_kythuat`
--

LOCK TABLES `thongso_kythuat` WRITE;
/*!40000 ALTER TABLE `thongso_kythuat` DISABLE KEYS */;
INSERT INTO `thongso_kythuat` VALUES (1,1,'DELL-XPS13-I5-8GB-256GB','Dell XPS 13 - Core i5/8GB/256GB','Intel Core i5-1235U','8GB LPDDR5','256GB SSD NVMe','Intel Iris Xe','13.4\" FHD+ IPS','1.24kg','2x Thunderbolt 4, 1x 3.5mm','Windows 11',25990000.00,7),(2,1,'DELL-XPS13-I7-16GB-512GB','Dell XPS 13 - Core i7/16GB/512GB','Intel Core i7-1255U','16GB LPDDR5','512GB SSD NVMe','Intel Iris Xe','13.4\" FHD+ IPS','1.24kg','2x Thunderbolt 4, 1x 3.5mm','Windows 11',32990000.00,9),(3,2,'HP-PAV15-I5-8GB-512GB-1650','HP Pavilion Gaming 15 - i5/8GB/512GB/GTX1650','Intel Core i5-11300H','8GB DDR4','512GB SSD NVMe','NVIDIA GTX 1650 4GB','15.6\" FHD 144Hz','2.08kg','1x USB-C, 3x USB-A, HDMI','Windows 11',18990000.00,9),(4,2,'HP-PAV15-I7-16GB-1TB-3050','HP Pavilion Gaming 15 - i7/16GB/1TB/RTX3050','Intel Core i7-11800H','16GB DDR4','1TB SSD NVMe','NVIDIA RTX 3050 4GB','15.6\" FHD 144Hz','2.08kg','1x USB-C, 3x USB-A, HDMI','Windows 11',24990000.00,12),(5,3,'LENOVO-LEG5P-R5-16GB-512GB-3060','Legion 5 Pro - Ryzen 5/16GB/512GB/RTX3060','AMD Ryzen 5 5600H','16GB DDR4','512GB SSD NVMe','NVIDIA RTX 3060 6GB','16\" WQXGA 165Hz','2.5kg','3x USB-A, 1x USB-C, HDMI','Windows 11',29990000.00,7),(6,3,'LENOVO-LEG5P-R7-32GB-1TB-3070','Legion 5 Pro - Ryzen 7/32GB/1TB/RTX3070','AMD Ryzen 7 5800H','32GB DDR4','1TB SSD NVMe','NVIDIA RTX 3070 8GB','16\" WQXGA 165Hz','2.5kg','3x USB-A, 1x USB-C, HDMI','Windows 11',39990000.00,8),(7,4,'ASUS-ROG-I7-16GB-512GB-3070','ROG Strix G15 - i7/16GB/512GB/RTX3070','Intel Core i7-12700H','16GB DDR5','512GB SSD NVMe','NVIDIA RTX 3070 8GB','15.6\" FHD 300Hz','2.3kg','3x USB-A, 1x USB-C, HDMI','Windows 11',42990000.00,8),(8,4,'ASUS-ROG-I9-32GB-1TB-3080','ROG Strix G15 - i9/32GB/1TB/RTX3080','Intel Core i9-12900H','32GB DDR5','1TB SSD NVMe','NVIDIA RTX 3080 10GB','15.6\" QHD 240Hz','2.3kg','3x USB-A, 1x USB-C, HDMI','Windows 11',54990000.00,5),(9,5,'ACER-SWIFT3-I5-8GB-512GB','Acer Swift 3 - i5/8GB/512GB','Intel Core i5-1240P','8GB LPDDR4X','512GB SSD NVMe','Intel Iris Xe','14\" FHD IPS','1.2kg','2x USB-C, 1x USB-A, HDMI','Windows 11',15990000.00,25),(10,5,'ACER-SWIFT3-R7-16GB-512GB','Acer Swift 3 - Ryzen 7/16GB/512GB','AMD Ryzen 7 5825U','16GB LPDDR4X','512GB SSD NVMe','AMD Radeon','14\" FHD IPS','1.2kg','2x USB-C, 1x USB-A, HDMI','Windows 11',18990000.00,15),(11,6,'MSI-Z16-I7-16GB-1TB-3060','MSI Creator Z16 - i7/16GB/1TB/RTX3060','Intel Core i7-11800H','16GB DDR4','1TB SSD NVMe','NVIDIA RTX 3060 6GB','16\" QHD+ 120Hz','2.2kg','2x USB-A, 2x USB-C, HDMI','Windows 11',45990000.00,7),(12,6,'MSI-Z16-I9-32GB-2TB-3070','MSI Creator Z16 - i9/32GB/2TB/RTX3070','Intel Core i9-11900H','32GB DDR4','2TB SSD NVMe','NVIDIA RTX 3070 8GB','16\" QHD+ 120Hz','2.2kg','2x USB-A, 2x USB-C, HDMI','Windows 11',59990000.00,4),(13,7,'LG-GRAM17-I5-16GB-512GB','LG Gram 17 - i5/16GB/512GB','Intel Core i5-1240P','16GB LPDDR5','512GB SSD NVMe','Intel Iris Xe','17\" WQXGA IPS','1.35kg','2x USB-C, 2x USB-A, HDMI','Windows 11',34990000.00,11),(14,7,'LG-GRAM17-I7-16GB-1TB','LG Gram 17 - i7/16GB/1TB','Intel Core i7-1260P','16GB LPDDR5','1TB SSD NVMe','Intel Iris Xe','17\" WQXGA IPS','1.35kg','2x USB-C, 2x USB-A, HDMI','Windows 11',39990000.00,8),(15,8,'DELL-LAT5430-I5-8GB-256GB','Dell Latitude 5430 - i5/8GB/256GB','Intel Core i5-1245U','8GB DDR4','256GB SSD NVMe','Intel UHD','14\" FHD','1.36kg','2x USB-A, 2x USB-C, HDMI','Windows 11 Pro',22990000.00,20),(16,8,'DELL-LAT5430-I7-16GB-512GB','Dell Latitude 5430 - i7/16GB/512GB','Intel Core i7-1265U','16GB DDR4','512GB SSD NVMe','Intel Iris Xe','14\" FHD','1.36kg','2x USB-A, 2x USB-C, HDMI','Windows 11 Pro',28990000.00,15),(17,9,'HP-ELITE840-I5-16GB-512GB','HP EliteBook 840 G9 - i5/16GB/512GB','Intel Core i5-1235U','16GB DDR4','512GB SSD NVMe','Intel Iris Xe','14\" FHD','1.32kg','2x USB-A, 2x USB-C, HDMI','Windows 11 Pro',27990000.00,18),(18,9,'HP-ELITE840-I7-32GB-1TB','HP EliteBook 840 G9 - i7/32GB/1TB','Intel Core i7-1255U','32GB DDR4','1TB SSD NVMe','Intel Iris Xe','14\" FHD','1.32kg','2x USB-A, 2x USB-C, HDMI','Windows 11 Pro',35990000.00,10),(19,10,'LENOVO-X1C-I5-16GB-512GB','ThinkPad X1 Carbon - i5/16GB/512GB','Intel Core i5-1235U','16GB LPDDR5','512GB SSD NVMe','Intel Iris Xe','14\" FHD IPS','1.12kg','2x USB-C, 2x USB-A, HDMI','Windows 11 Pro',38990000.00,14),(20,10,'LENOVO-X1C-I7-32GB-1TB','ThinkPad X1 Carbon - i7/32GB/1TB','Intel Core i7-1255U','32GB LPDDR5','1TB SSD NVMe','Intel Iris Xe','14\" 2.8K OLED','1.12kg','2x USB-C, 2x USB-A, HDMI','Windows 11 Pro',49990000.00,7),(21,11,'ASUS-ZEN14-I5-8GB-512GB','Asus ZenBook 14 - i5/8GB/512GB','Intel Core i5-1240P','8GB LPDDR5','512GB SSD NVMe','Intel Iris Xe','14\" FHD OLED','1.39kg','1x USB-A, 2x USB-C, HDMI','Windows 11',23990000.00,16),(22,11,'ASUS-ZEN14-I7-16GB-512GB','Asus ZenBook 14 - i7/16GB/512GB','Intel Core i7-1260P','16GB LPDDR5','512GB SSD NVMe','Intel Iris Xe','14\" 2.8K OLED','1.39kg','1x USB-A, 2x USB-C, HDMI','Windows 11',29990000.00,12),(23,12,'ACER-PRED300-I5-16GB-512GB-3050TI','Predator Helios 300 - i5/16GB/512GB/RTX3050Ti','Intel Core i5-11400H','16GB DDR4','512GB SSD NVMe','NVIDIA RTX 3050 Ti 4GB','15.6\" FHD 144Hz','2.3kg','3x USB-A, 1x USB-C, HDMI','Windows 11',25990000.00,14),(24,12,'ACER-PRED300-I7-16GB-1TB-3060','Predator Helios 300 - i7/16GB/1TB/RTX3060','Intel Core i7-11800H','16GB DDR4','1TB SSD NVMe','NVIDIA RTX 3060 6GB','15.6\" FHD 165Hz','2.3kg','3x USB-A, 1x USB-C, HDMI','Windows 11',32990000.00,10),(25,13,'MSI-GS66-I7-16GB-1TB-3060','MSI GS66 Stealth - i7/16GB/1TB/RTX3060','Intel Core i7-11800H','16GB DDR4','1TB SSD NVMe','NVIDIA RTX 3060 6GB','15.6\" FHD 240Hz','2.1kg','3x USB-A, 1x USB-C, HDMI','Windows 11',44990000.00,9),(26,13,'MSI-GS66-I9-32GB-2TB-3080','MSI GS66 Stealth - i9/32GB/2TB/RTX3080','Intel Core i9-11900H','32GB DDR4','2TB SSD NVMe','NVIDIA RTX 3080 10GB','15.6\" QHD 240Hz','2.1kg','3x USB-A, 1x USB-C, HDMI','Windows 11',59990000.00,5),(27,14,'MBP14-M3-8GB-512GB','MacBook Pro 14 - M3/8GB/512GB','Apple M3 8-core','8GB Unified','512GB SSD','10-core GPU','14.2\" Liquid Retina XDR','1.55kg','3x Thunderbolt 4, HDMI, SD','macOS Sonoma',49990000.00,12),(28,14,'MBP14-M3PRO-18GB-512GB','MacBook Pro 14 - M3 Pro/18GB/512GB','Apple M3 Pro 11-core','18GB Unified','512GB SSD','14-core GPU','14.2\" Liquid Retina XDR','1.55kg','3x Thunderbolt 4, HDMI, SD','macOS Sonoma',54990000.00,8),(29,14,'MBP14-M3PRO-36GB-1TB','MacBook Pro 14 - M3 Pro/36GB/1TB','Apple M3 Pro 12-core','36GB Unified','1TB SSD','18-core GPU','14.2\" Liquid Retina XDR','1.55kg','3x Thunderbolt 4, HDMI, SD','macOS Sonoma',69990000.00,6),(30,15,'DELL-INS3520-I3-8GB-256GB','Dell Inspiron 15 3520 - i3/8GB/256GB','Intel Core i3-1215U','8GB DDR4','256GB SSD NVMe','Intel UHD','15.6\" FHD','1.65kg','2x USB-A, 1x USB-C, HDMI','Windows 11',12990000.00,30),(31,15,'DELL-INS3520-I5-8GB-512GB','Dell Inspiron 15 3520 - i5/8GB/512GB','Intel Core i5-1235U','8GB DDR4','512GB SSD NVMe','Intel Iris Xe','15.6\" FHD','1.65kg','2x USB-A, 1x USB-C, HDMI','Windows 11',15990000.00,25);
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
  `vai_tro` enum('User','Assistant') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Ai nói',
  `noi_dung` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Nội dung tin nhắn',
  `thoi_gian_gui` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_tinnhan`),
  KEY `idx_hoithoai` (`hoithoai_id`),
  KEY `idx_time` (`thoi_gian_gui`),
  CONSTRAINT `tinnhan_ibfk_1` FOREIGN KEY (`hoithoai_id`) REFERENCES `hoithoai` (`id_hoithoai`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tin nhắn trong hội thoại';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tinnhan`
--

LOCK TABLES `tinnhan` WRITE;
/*!40000 ALTER TABLE `tinnhan` DISABLE KEYS */;
INSERT INTO `tinnhan` VALUES (1,1,'User','Laptop gaming tầm giá 30 triệu có mẫu nào tốt?','2026-01-15 03:00:15'),(2,1,'Assistant','Với ngân sách 30 triệu, bạn có thể tham khảo Lenovo Legion 5 Pro RTX 3060 hoặc HP Pavilion Gaming 15 RTX 3050. Bạn ưu tiên AMD hay Intel?','2026-01-15 03:00:30'),(3,1,'User','Mình ưu tiên AMD, màn hình có đẹp không?','2026-01-15 03:01:00'),(4,1,'Assistant','Legion 5 Pro có màn hình 16 inch WQXGA 165Hz, hiển thị rất đẹp và mượt khi chơi game.','2026-01-15 03:01:15'),(5,2,'User','Laptop văn phòng mỏng nhẹ nhất hiện nay là mẫu nào?','2026-01-16 08:30:20'),(6,2,'Assistant','Hiện tại nhẹ nhất là LG Gram 17 chỉ 1.35kg hoặc ThinkPad X1 Carbon nặng khoảng 1.12kg, rất phù hợp làm việc di động.','2026-01-16 08:30:45'),(7,3,'User','Shop có MacBook Pro M3 không?','2026-01-17 02:45:10'),(8,3,'Assistant','Dạ hiện shop có MacBook Pro 14 inch chip M3, M3 Pro với nhiều cấu hình RAM và SSD khác nhau ạ.','2026-01-17 02:45:30'),(9,4,'User','Laptop đồ họa tầm 40 triệu có ổn không?','2026-01-17 04:20:10'),(10,4,'Assistant','Trong tầm giá 40 triệu, bạn có thể cân nhắc MSI Creator Z16 hoặc MacBook Pro M3 Pro cho nhu cầu đồ họa và sáng tạo nội dung.','2026-01-17 04:20:35');
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
  `ten_vaitro` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Admin, Sale, Khách hàng',
  `mota` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT 'Mô tả vai trò',
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
INSERT INTO `vaitro_quyen` VALUES (1,1),(1,2),(3,2),(1,3),(3,3),(1,4),(3,4),(1,5),(1,6),(1,7),(1,8),(1,9),(1,10),(1,11);
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

-- Dump completed on 2026-03-13 12:28:53
