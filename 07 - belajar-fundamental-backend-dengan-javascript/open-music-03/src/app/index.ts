// src/app/index.ts
import { createServer } from './server';

const startServer = async () => {
  try {
    const server = await createServer();
    await server.start();
    console.log(`🚀 Server running at: ${server.info.uri}`);
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

startServer();
