// server.ts
import 'dotenv/config';
import { createServer } from './core/createServer';

async function startServer() {
    const app = await createServer();

    const port = Number(process.env.PORT || 3001);
    const host = process.env.HOST || '0.0.0.0';

    // Просто для дебагу
    app.addHook('onReady', async () => {
        console.log('>>> Fastify onReady hook fired');
    });

    // Якщо потрібно щось закрити ДО повного виходу (БД, конекшени) — додай тут
    app.addHook('onClose', async (_instance, done) => {
        // приклад: await mongoose.connection.close().catch(() => {});
        done();
    });

    await app.listen({ port, host });

    const shownHost = host === '0.0.0.0' ? 'localhost' : host;
    console.log(` App is running on http://${shownHost}:${port}`);

    // ====== Graceful shutdown ======
    let shuttingDown = false;
    const forceExitAfter = (ms: number) =>
        setTimeout(() => {
            console.error(`\n Forcing exit after ${ms}ms…`);
            process.exit(1);
        }, ms).unref();

    const shutdown = async (reason: string) => {
        if (shuttingDown) return;
        shuttingDown = true;
        console.log(`\n Shutting down (${reason})…`);

        // Якщо щось зависне — не чекаємо вічно
        const timer = forceExitAfter(5000);

        try {
            await app.close(); // Fastify закриє HTTP-сервер і всі сокети
            console.log(' Server closed gracefully.');
            clearTimeout(timer);
            process.exit(0);
        } catch (err) {
            console.error(' Error during shutdown:', err);
            clearTimeout(timer);
            process.exit(1);
        }
    };

    // Сигнали з різних ОС/терміналів
    process.on('SIGINT',  () => shutdown('SIGINT'));   // Ctrl+C
    process.on('SIGTERM', () => shutdown('SIGTERM'));  // kill / Docker stop
    process.on('SIGBREAK', () => shutdown('SIGBREAK')); // Windows Ctrl+Break

    // Помилки — логуємо і теж пробуємо закритися акуратно
    process.on('uncaughtException', (e) => {
        console.error(' uncaughtException', e);
        shutdown('uncaughtException');
    });
    process.on('unhandledRejection', (e) => {
        console.error(' unhandledRejection', e as any);
        shutdown('unhandledRejection');
    });
}

startServer().catch((err) => {
    console.error(' Failed to start server:', err);
    process.exit(1);
});
