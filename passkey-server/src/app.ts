import express, { Express } from 'express';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import routes from './routes';
import { errorHandler } from './middlewares/error-handler.middleware';

// Load environment variables
dotenv.config();

const app: Express = express();

const corsOptions: CorsOptions = {
  credentials: true,
  methods: ['GET', 'POST'],
};

// CORS configuration
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1', routes);

// Error handler
app.use(errorHandler);

export default app;
