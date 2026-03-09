import dotenv from 'dotenv';
dotenv.config();

import aiApp from './ai-app';

const AI_PORT = parseInt(process.env.AI_PORT || '5001', 10);

const startAIServer = async () => {
    try {
        aiApp.listen(AI_PORT, () => {
            console.log(`🤖 AI Service is running on port ${AI_PORT}`);
            console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`🔗 AI API: http://localhost:${AI_PORT}/api/ai`);
            console.log(`💬 Chat endpoint: http://localhost:${AI_PORT}/api/ai/chat`);
        });
    } catch (error) {
        console.error('❌ Failed to start AI server:', error);
        process.exit(1);
    }
};

startAIServer();
