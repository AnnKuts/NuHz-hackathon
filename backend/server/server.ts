import 'dotenv/config';
import Fastify from 'fastify';
import { createServer } from './core/createServer';

async function startServer() {
    try {
        const app = await createServer();

        const port = Number(process.env.PORT || 3001);
        const host = process.env.HOST || '0.0.0.0';

        app.addHook('onReady', async () => {
            console.log('>>> Fastify onReady hook fired');
        });

        await app.listen({ port, host });

        const shownHost = host === '0.0.0.0' ? 'localhost' : host;
        console.log(` App is running on http://${shownHost}:${port}`);
    } catch (err) {
        console.error(' Failed to start server:', err);
        process.exit(1);
    }
}

process.on('uncaughtException', (e) => console.error('uncaughtException', e));
process.on('unhandledRejection', (e) => console.error('unhandledRejection', e));

startServer();
