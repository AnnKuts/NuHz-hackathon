import fp from 'fastify-plugin';
import mongoose from 'mongoose';
import { FastifyInstance } from 'fastify';

async function dbConnector(fastify: FastifyInstance) {
try {
    const dbUri = fastify.config.MONGODB_URI;
    await mongoose.connect(dbUri);
    fastify.log.info('MongoDB connected successfully');
    } catch (err) {
    fastify.log.error(err, 'MongoDB connection error');
    process.exit(1);
    }
}

export default fp(dbConnector);