-- Thêm các cột cần thiết cho OAuth vào bảng taikhoan
USE laptop_shop;

-- Thêm cột sodienthoai
ALTER TABLE `taikhoan` 
ADD COLUMN `sodienthoai` VARCHAR(20) NULL COMMENT 'Số điện thoại' AFTER `matkhau`;

-- Thêm cột oauth_provider
ALTER TABLE `taikhoan` 
ADD COLUMN `oauth_provider` VARCHAR(50) NULL COMMENT 'OAuth provider (google, facebook)' AFTER `trangthai`;

-- Thêm cột oauth_id
ALTER TABLE `taikhoan` 
ADD COLUMN `oauth_id` VARCHAR(255) NULL COMMENT 'OAuth provider user ID' AFTER `oauth_provider`;

-- Kiểm tra kết quả
DESCRIBE `taikhoan`;
