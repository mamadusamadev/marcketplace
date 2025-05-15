// src/app.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import sellerRouter from './routes/seller.routes';
import adminRouter from './routes/admin.routes';
import productRoutes from './routes/product.routes';
import favoriteRoutes from './routes/favorite.routes';

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());



app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use("/api/sellers", sellerRouter);
app.use("/api/admin", adminRouter);
app.use("/api/products", productRoutes);
app.use("/api/favorites", favoriteRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});


export default app;