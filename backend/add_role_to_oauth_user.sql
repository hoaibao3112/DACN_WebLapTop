-- Thêm vai trò Customer cho user OAuth đã tồn tại
USE laptop_shop;

-- Kiểm tra user OAuth (user ID = 4 từ token)
SELECT t.id_taikhoan, t.email, t.oauth_provider 
FROM taikhoan t
WHERE t.oauth_provider IN ('google', 'facebook');

-- Thêm role Customer (vaitro_id = 3) cho user OAuth nếu chưa có
INSERT IGNORE INTO taikhoan_vaitro (taikhoan_id, vaitro_id)
SELECT id_taikhoan, 3
FROM taikhoan
WHERE oauth_provider IN ('google', 'facebook')
AND id_taikhoan NOT IN (
    SELECT taikhoan_id FROM taikhoan_vaitro WHERE vaitro_id = 3
);

-- Kiểm tra kết quả
SELECT t.id_taikhoan, t.email, t.oauth_provider, tv.vaitro_id, v.ten_vaitro
FROM taikhoan t
LEFT JOIN taikhoan_vaitro tv ON t.id_taikhoan = tv.taikhoan_id
LEFT JOIN vaitro v ON tv.vaitro_id = v.id_vaitro
WHERE t.oauth_provider IN ('google', 'facebook');
