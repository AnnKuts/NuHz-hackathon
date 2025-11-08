import { FastifyInstance } from 'fastify';

export interface InterviewResult {
  id?: string;
  userId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timestamp: string;
  questions: Array<{
    question: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
  }>;
}

async function interviewRoutes(fastify: FastifyInstance) {
  
  // POST /api/interview-results - Save interview result
  fastify.post('/interview-results', async (request, reply) => {
    try {
      const result = request.body as Omit<InterviewResult, 'id'>;
      
      // For now, just return the result with a generated ID
      const savedResult: InterviewResult = {
        id: `interview_${Date.now()}`,
        ...result
      };
      
      reply.send(savedResult);
    } catch (error) {
      reply.code(500).send({ error: 'Failed to save interview result' });
    }
  });

  // GET /api/interview-results/user/:userId - Get user's interview results  
  fastify.get('/interview-results/user/:userId', async (request, reply) => {
    try {
      const { userId } = request.params as { userId: string };
      
      // For now, return empty array
      reply.send([]);
    } catch (error) {
      reply.code(500).send({ error: 'Failed to get interview results' });
    }
  });

  // GET /api/interview-results/user/:userId/latest - Get latest interview result
  fastify.get('/interview-results/user/:userId/latest', async (request, reply) => {
    try {
      const { userId } = request.params as { userId: string };
      
      // For now, return null
      reply.send(null);
    } catch (error) {
      reply.code(500).send({ error: 'Failed to get latest interview result' });
    }
  });

  // GET /api/users/:userId/stats - Get user statistics
  fastify.get('/users/:userId/stats', async (request, reply) => {
    try {
      const { userId } = request.params as { userId: string };
      
      // For now, return mock stats
      const stats = {
        totalCVs: 0,
        totalInterviews: 0,
        averageScore: 0,
        lastActivityDate: new Date().toISOString()
      };
      
      reply.send(stats);
    } catch (error) {
      reply.code(500).send({ error: 'Failed to get user stats' });
    }
  });
}

export default interviewRoutes;