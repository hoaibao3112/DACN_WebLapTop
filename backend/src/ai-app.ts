import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import aiRoutes from './routes/ai.routes';

const aiApp: Application = express();

// CORS - cho phép frontend gọi AI service
const origins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',')
    : ['http://localhost:3000', 'http://localhost:3001'];

aiApp.use(cors({ origin: origins, credentials: true }));
aiApp.use(express.json());
aiApp.use(express.urlencoded({ extended: true }));

// AI Routes
aiApp.use('/api/ai', aiRoutes);

// Root health check
aiApp.get('/', (_req: Request, res: Response) => {
    res.json({
        success: true,
        service: 'AI Service',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
    });
});

export default aiApp;
