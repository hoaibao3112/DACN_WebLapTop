# 🔐 Hướng dẫn cấu hình Google OAuth

## ❌ Lỗi hiện tại: `redirect_uri_mismatch`

Lỗi này xảy ra vì **Redirect URI** trong code chưa được thêm vào Google Cloud Console.

---

## ✅ Các bước khắc phục:

### Bước 1: Truy cập Google Cloud Console

1. Mở trình duyệt và vào: **https://console.cloud.google.com/**
2. Đăng nhập bằng tài khoản Google của bạn
3. Chọn project hiện tại (hoặc tạo project mới nếu chưa có)

---

### Bước 2: Tìm OAuth Client ID

1. Ở menu bên trái, chọn: **APIs & Services** > **Credentials**
2. Tìm OAuth 2.0 Client ID có ID: 
   ```
   384701986163-efvf2jsg54kp6jjgqgj24o609vbr6uop.apps.googleusercontent.com
   ```
3. Click vào tên Client ID đó để mở cấu hình

---

### Bước 3: Thêm Authorized redirect URIs

1. Trong phần **"Authorized redirect URIs"**, click nút **"+ ADD URI"**

2. Nhập **CHÍNH XÁC** URL sau:
   ```
   http://localhost:5000/api/auth/google/callback
   ```

3. **LƯU Ý QUAN TRỌNG:**
   - ✅ Phải là `http://` (không phải `https://`)
   - ✅ Phải có port `:5000`
   - ✅ Phải có `/api/auth/google/callback`
   - ✅ KHÔNG có dấu `/` ở cuối
   - ✅ Không có khoảng trắng

4. Click nút **"SAVE"** ở dưới cùng

---

### Bước 4: Đợi Google áp dụng thay đổi

- Thay đổi có thể mất **vài giây đến vài phút** để có hiệu lực
- Đợi khoảng 30 giây rồi thử lại

---

### Bước 5: Test lại tính năng

1. Quay lại trang web: **http://localhost:3000**
2. Click nút **"Đăng nhập bằng Google"**
3. Chọn tài khoản Google
4. Nếu thành công, bạn sẽ được chuyển về trang web với token

---

## 📋 Thông tin cấu hình hiện tại:

- **Client ID**: `384701986163-efvf2jsg54kp6jjgqgj24o609vbr6uop.apps.googleusercontent.com`
- **Redirect URI cần thêm**: `http://localhost:5000/api/auth/google/callback`
- **Frontend URL**: `http://localhost:3000`
- **Backend URL**: `http://localhost:5000`

---

## 🔍 Kiểm tra nếu vẫn lỗi:

1. **Xóa cache trình duyệt**:
   - Ctrl+Shift+Delete (Windows) hoặc Cmd+Shift+Delete (Mac)
   - Xóa cookies và cached images

2. **Thử chế độ ẩn danh (Incognito)**:
   - Ctrl+Shift+N (Chrome)
   - Đăng nhập lại

3. **Kiểm tra console log**:
   - F12 > Console tab
   - Xem có lỗi gì không

---

## 📸 Hình ảnh minh họa vị trí thêm Redirect URI:

Trong Google Cloud Console > Credentials > OAuth 2.0 Client ID:

```
Authorized redirect URIs
┌─────────────────────────────────────────────────────────────┐
│ http://localhost:5000/api/auth/google/callback             │ ← Thêm dòng này
│                                                             │
│ + ADD URI                                                   │
└─────────────────────────────────────────────────────────────┘
```

---

## ⚠️ Lưu ý khi deploy lên production:

Khi deploy lên server thật, bạn cần thêm thêm redirect URI với domain thật:
- Ví dụ: `https://yourdomain.com/api/auth/google/callback`
- Nhớ dùng `https://` cho production!

---

## 🆘 Cần hỗ trợ thêm?

Nếu vẫn gặp lỗi sau khi làm theo hướng dẫn, kiểm tra:
1. Backend server có đang chạy không? (http://localhost:5000)
2. File .env có đúng thông tin không?
3. Đã Save thay đổi trong Google Cloud Console chưa?
