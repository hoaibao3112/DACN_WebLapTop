// Common types and interfaces

export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
}

export interface PaginationParams {
    page: number;
    limit: number;
    offset: number;
}

export interface PaginatedResponse<T> {
    success: boolean;
    message: string;
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export enum OrderStatus {
    CHO_DUYET = 'Chờ duyệt',
    DANG_GIAO = 'Đang giao',
    HOAN_THANH = 'Hoàn thành',
    HUY = 'Hủy',
}

export enum PaymentMethod {
    COD = 'COD',
    CHUYEN_KHOAN = 'Chuyển khoản',
    VNPAY = 'VNPay',
    MOMO = 'MoMo',
    ZALOPAY = 'ZaloPay',
}

export enum ChatRole {
    USER = 'User',
    ASSISTANT = 'Assistant',
}

// AuthRequest type for controllers
import { Request as ExpressRequest } from 'express';

export interface AuthRequest extends ExpressRequest {
    user?: {
        id: number;
        email: string;
        roles: string[];
        permissions: string[];
    };
}
