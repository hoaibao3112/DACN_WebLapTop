import app from './app';
import { env } from './config/env';
import { connectDatabase } from './config/database';
import { initializeAssociations } from './models';

const PORT = env.PORT || 5000;

/**
 * Start server
 */
const startServer = async () => {
    try {
        // Connect to database
        await connectDatabase();

        // Initialize model associations
        initializeAssociations();
        console.log('✅ Model associations initialized');

        // Start server
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
            console.log(`📍 Environment: ${env.NODE_ENV}`);
            console.log(`🔗 API: http://localhost:${PORT}/api`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
