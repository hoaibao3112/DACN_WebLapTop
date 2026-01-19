'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1000));

        alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.');
        setFormData({
            name: '',
            phone: '',
            email: '',
            subject: '',
            message: '',
        });
        setIsSubmitting(false);
    };

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container mx-auto px-4">
                {/* Breadcrumb */}
                <div className="text-sm text-gray-600 mb-6">
                    <span className="hover:text-blue-600 cursor-pointer">Trang chủ</span>
                    <span className="mx-2">/</span>
                    <span className="font-medium text-gray-900">Liên hệ</span>
                </div>

                {/* Page Title */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Liên Hệ Với Chúng Tôi</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Bạn có câu hỏi? Hãy liên hệ với chúng tôi qua form bên dưới hoặc các kênh liên lạc
                        dưới đây. Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7!
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 mb-12">
                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <Card>
                            <h2 className="text-2xl font-bold mb-6">Gửi tin nhắn cho chúng tôi</h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Họ và tên <span className="text-red-500">*</span>
                                        </label>
                                        <Input
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="Nguyễn Văn A"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Số điện thoại <span className="text-red-500">*</span>
                                        </label>
                                        <Input
                                            name="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="0900 xxx xxx"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Địa chỉ Email <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="email@example.com"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Tiêu đề tin nhắn
                                    </label>
                                    <Input
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        placeholder="Câu hỏi về sản phẩm..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Nội dung tin nhắn <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        placeholder="Nhập nội dung tin nhắn của bạn..."
                                        required
                                        rows={5}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full"
                                    size="lg"
                                >
                                    {isSubmitting ? 'Đang gửi...' : '➤ Gửi Tin Nhắn'}
                                </Button>
                            </form>
                        </Card>
                    </div>

                    {/* Contact Info Sidebar */}
                    <div className="space-y-6">
                        <Card>
                            <h3 className="text-xl font-bold mb-4">Thông tin liên hệ</h3>

                            <div className="space-y-4">
                                {/* Address */}
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-1">Địa chỉ cửa hàng</h4>
                                        <p className="text-sm text-gray-600">
                                            12 Nguyễn Văn Bảo, Phường 4,<br />
                                            Gò Vấp, TP. Hồ Chí Minh
                                        </p>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-1">Hotline hỗ trợ</h4>
                                        <p className="text-sm text-gray-600">
                                            0973.xxx.xxx<br />
                                            <span className="text-xs">(Hỗ trợ 24/7 - miễn phí cuộc gọi)</span>
                                        </p>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-1">Email liên hệ</h4>
                                        <p className="text-sm text-gray-600">
                                            support@laptopshop.vn
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Social Media */}
                        <Card>
                            <h3 className="text-xl font-bold mb-4">Kết nối với chúng tôi</h3>
                            <div className="flex gap-3">
                                <a
                                    href="#"
                                    className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition"
                                    aria-label="Facebook"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    className="w-12 h-12 bg-blue-400 text-white rounded-lg flex items-center justify-center hover:bg-blue-500 transition"
                                    aria-label="Twitter"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    className="w-12 h-12 bg-red-600 text-white rounded-lg flex items-center justify-center hover:bg-red-700 transition"
                                    aria-label="YouTube"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                    </svg>
                                </a>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Map Section */}
                <Card>
                    <div className="flex items-center gap-2 mb-4">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <h2 className="text-2xl font-bold">Vị trí cửa hàng</h2>
                    </div>

                    <div className="relative w-full h-[450px] rounded-lg overflow-hidden">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4544374621546!2d106.68528987570654!3d10.84492758930853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529b6a8d36b43%3A0xd3abd7863f5e2e5f!2zMTIgTmd1eeG7hW4gVsSDbiBCw6FvLCBQaMaw4budbmcgNCwgR8OyIFbhuqVwLCBI4buTIENow60gTWluaCwgVmlldG5hbQ!5e0!3m2!1sen!2s!4v1705650000000!5m2!1sen!2s"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="grayscale-0 hover:grayscale-0 transition"
                        />
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-start gap-3">
                            <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <h3 className="font-semibold mb-1">Giờ làm việc</h3>
                                <p className="text-sm text-gray-700">
                                    <strong>Thứ 2 - Thứ 6:</strong> 8:00 - 20:00<br />
                                    <strong>Thứ 7 - Chủ Nhật:</strong> 9:00 - 18:00
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* FAQ Quick Links */}
                <div className="mt-12 text-center">
                    <p className="text-gray-600 mb-4">
                        Bạn có thể tìm câu trả lời nhanh trong phần{' '}
                        <a href="#" className="text-blue-600 font-semibold hover:underline">Câu hỏi thường gặp</a>
                        {' '}hoặc xem{' '}
                        <a href="#" className="text-blue-600 font-semibold hover:underline">Chính sách bảo hành</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
