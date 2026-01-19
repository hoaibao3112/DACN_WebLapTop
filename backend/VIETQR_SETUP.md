# 🏦 Hướng dẫn cấu hình VietQR

## ⚠️ Quan trọng

VietQR **KHÔNG CẦN API KEY** - đây là dịch vụ miễn phí tạo mã QR thanh toán ngân hàng.

## 📋 Bước 1: Chuẩn bị thông tin

Bạn cần có:
1. **Số tài khoản ngân hàng** của shop (nhận tiền)
2. **Mã ngân hàng** (Bank ID) - xem danh sách bên dưới
3. **Tên chủ tài khoản**

## 🏦 Danh sách mã ngân hàng phổ biến

| Ngân hàng | Mã (Bank ID) |
|-----------|--------------|
| Vietcombank | 970436 |
| Vietinbank | 970415 |
| BIDV | 970418 |
| Agribank | 970405 |
| Techcombank | 970407 |
| MB Bank | 970422 |
| ACB | 970416 |
| Sacombank | 970403 |
| VPBank | 970432 |
| TPBank | 970423 |

👉 Danh sách đầy đủ: https://api.vietqr.io/v2/banks

## ⚙️ Bước 2: Cấu hình trong code

Mở file `backend/src/services/payment.service.ts` và sửa hàm `generateVietQR()`:

```typescript
generateVietQR(orderId: number, amount: number): string {
    // THAY ĐỔI 3 GIÁ TRỊ SAU:
    const bankId = '970415';           // ✏️ Mã ngân hàng của bạn
    const accountNo = '1234567890';    // ✏️ Số tài khoản của bạn
    const accountName = 'LAPTOP SHOP'; // ✏️ Tên chủ tài khoản

    // GIỮ NGUYÊN CODE BÊN DƯỚI
    const template = 'compact2';
    const description = `Thanh toan don hang ${orderId}`;

    const qrUrl = `https://img.vietqr.io/image/${bankId}-${accountNo}-${template}.png?amount=${amount}&addInfo=${encodeURIComponent(description)}&accountName=${encodeURIComponent(accountName)}`;

    return qrUrl;
}
```

## ✅ Bước 3: Test

1. Tạo đơn hàng và chọn phương thức thanh toán **VIETQR**
2. Hệ thống sẽ trả về URL của mã QR
3. Khách hàng mở app ngân hàng và quét mã QR để thanh toán

## 🖼️ Ví dụ URL QR code

```
https://img.vietqr.io/image/970415-1234567890-compact2.png?amount=100000&addInfo=Thanh%20toan%20don%20hang%20123&accountName=LAPTOP%20SHOP
```

## ⚠️ Lưu ý

1. **VietQR chỉ tạo mã QR** - KHÔNG tự động xác nhận thanh toán
2. Sau khi khách hàng chuyển khoản, bạn cần **XÁC NHẬN THỦ CÔNG** trong admin
3. Để tự động xác nhận, cần:
   - Kết nối với API ngân hàng (có phí)
   - Hoặc sử dụng dịch vụ webhook như Sepay, Casso (có phí)

## 🔄 Nâng cao: Tự động xác nhận thanh toán

Nếu muốn tự động xác nhận, có thể dùng:

1. **Sepay.vn** - Webhook banking miễn phí/có phí
2. **Casso.vn** - Quản lý thu chi tự động
3. **API ngân hàng** - Liên hệ trực tiếp ngân hàng

## 📞 Hỗ trợ

- Docs VietQR: https://www.vietqr.io/
- API Docs: https://api.vietqr.io/docs/
