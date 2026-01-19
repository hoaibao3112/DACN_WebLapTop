'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function AboutPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[500px] flex items-center justify-center text-white">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80')",
                    }}
                />
                <div className="relative z-10 container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold mb-4">
                        Chuyên gia Laptop<br />
                        Nâng tầm trải nghiệm
                    </h1>
                    <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                        Chúng tôi cung cấp các sản phẩm laptop chất lượng cao với dịch vụ tư vấn chuyên nghiệp,
                        giúp bạn tìm được chiếc máy phù hợp nhất.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Link href="/products">
                            <Button size="lg">Xem sản phẩm</Button>
                        </Link>
                        <Link href="#contact">
                            <Button variant="secondary" size="lg">Liên hệ ngay</Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-4">Sứ mệnh & Tầm nhìn</h2>
                    <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
                        Chúng tôi mong muốn trở thành đối tác đáng tin cậy của mọi người trong việc sở hữu
                        những sản phẩm công nghệ chất lượng cao với giá cả hợp lý, cùng dịch vụ chăm sóc
                        khách hàng tận tâm nhất.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Gaming Card */}
                        <Card className="overflow-hidden">
                            <div className="relative h-48 bg-gray-900">
                                <Image
                                    src="https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=600&q=80"
                                    alt="Laptop Gaming"
                                    fill
                                    className="object-cover opacity-80"
                                />
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-2 text-blue-600 mb-2">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                                    </svg>
                                    <span className="text-sm font-semibold">CHO GAME THỦ</span>
                                </div>
                                <h3 className="text-xl font-bold mb-2">Laptop Gaming</h3>
                                <p className="text-gray-600 text-sm">
                                    Cấu hình mạnh mẽ, card đồ họa rời RTX series, màn hình tần số quét cao
                                    cho trải nghiệm gaming tuyệt đỉnh.
                                </p>
                            </div>
                        </Card>

                        {/* Office Card */}
                        <Card className="overflow-hidden">
                            <div className="relative h-48 bg-gray-100">
                                <Image
                                    src="https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=600&q=80"
                                    alt="Laptop Văn Phòng"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-2 text-blue-600 mb-2">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-sm font-semibold">CHO VĂN PHÒNG</span>
                                </div>
                                <h3 className="text-xl font-bold mb-2">Laptop Mỏng Nhẹ</h3>
                                <p className="text-gray-600 text-sm">
                                    Thiết kế sang trọng, trọng lượng nhẹ, pin trâu, phù hợp cho công việc
                                    di động và văn phòng chuyên nghiệp.
                                </p>
                            </div>
                        </Card>

                        {/* Students Card */}
                        <Card className="overflow-hidden">
                            <div className="relative h-48 bg-blue-50">
                                <Image
                                    src="https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&q=80"
                                    alt="Laptop Sinh Viên"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-2 text-blue-600 mb-2">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                                    </svg>
                                    <span className="text-sm font-semibold">CHO SINH VIÊN</span>
                                </div>
                                <h3 className="text-xl font-bold mb-2">Laptop Đồ Họa</h3>
                                <p className="text-gray-600 text-sm">
                                    Màn hình chất lượng cao, chuẩn màu chính xác, hiệu năng ổn định
                                    cho thiết kế đồ họa và sáng tạo nội dung.
                                </p>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-4">Tại sao chọn chúng tôi?</h2>
                    <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
                        Chúng tôi cam kết mang đến trải nghiệm mua sắm tốt nhất với dịch vụ chuyên nghiệp
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Hàng chính hãng</h3>
                            <p className="text-gray-600">
                                100% sản phẩm chính hãng, có tem nhập khẩu đầy đủ và bảo hành toàn quốc
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Bảo hành tận tâm</h3>
                            <p className="text-gray-600">
                                Chế độ bảo hành uy tín, hỗ trợ kỹ thuật 24/7, đổi trả trong 7 ngày
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Hỗ trợ 24/7</h3>
                            <p className="text-gray-600">
                                Tư vấn miễn phí, hỗ trợ trả góp 0%, giao hàng nhanh toàn quốc
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-4">Kết nối với chúng tôi</h2>
                    <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
                        Hãy liên hệ với chúng tôi để được tư vấn và hỗ trợ tốt nhất
                    </p>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Contact Info */}
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold mb-1">Địa chỉ cửa hàng</h3>
                                    <p className="text-gray-600">12 Nguyễn Văn Bảo, Phường 4, Gò Vấp, TP.HCM</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold mb-1">Số điện thoại</h3>
                                    <p className="text-gray-600">0973.xxx.xxx (Hotline 24/7)</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold mb-1">Email hỗ trợ</h3>
                                    <p className="text-gray-600">support@laptopshop.vn</p>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="flex gap-4 pt-4">
                                <a href="#" className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </a>
                                <a href="#" className="w-10 h-10 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-blue-500 transition">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Map */}
                        <div className="bg-gray-200 rounded-lg overflow-hidden h-[400px]">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4544374621546!2d106.68528987570654!3d10.84492758930853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529b6a8d36b43%3A0xd3abd7863f5e2e5f!2zMTIgTmd1eeG7hW4gVsSDbiBCw6FvLCBQaMaw4budbmcgNCwgR8OyIFbhuqVwLCBI4buTIENow60gTWluaCwgVmlldG5hbQ!5e0!3m2!1sen!2s!4v1705650000000!5m2!1sen!2s"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Sẵn sàng tìm laptop phù hợp với bạn?</h2>
                    <p className="text-xl mb-8 opacity-90">
                        Khám phá bộ sưu tập laptop đa dạng của chúng tôi ngay hôm nay
                    </p>
                    <Link href="/products">
                        <Button size="lg" variant="secondary">
                            Xem tất cả sản phẩm
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
