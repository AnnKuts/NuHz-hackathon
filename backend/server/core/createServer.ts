import fastify from 'fastify';
import fastifyHttpProxy from '@fastify/http-proxy';
import cors from '@fastify/cors';
import { registerGoogleOAuth2Provider } from '../providers/oauth2';
import { googleOAuth2Routes } from '../modules/oauth2/google/google.route';

export async function createServer() {
    const app = fastify();

    app.register(async (api) => {
        await api.register(cors, {
            origin: true,
            credentials: true,
        });

        registerGoogleOAuth2Provider(api);
        api.register(googleOAuth2Routes, { prefix: '/oauth2' });
        api.get('/health', async () => ({ status: 'up' }));
    }, { prefix: '/api' });

    app.register(fastifyHttpProxy, {
        upstream: 'http://localhost:5178/',
        prefix: '/',
    });

    return app;
}
