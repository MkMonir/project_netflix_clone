import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './controllers/errorController';
import AppError from './utils/AppError';
import authRouter from './routes/authRoutes';

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Middlewares
app.use('/api/v1/auth', authRouter);

// Global error handling middleware
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});
app.use(globalErrorHandler);

export default app;
