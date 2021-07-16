import express from 'express';
import cors from 'cors';
import { errorMiddleware } from './core/infrastructure/api/middleware/error.middleware';
import ordersRouter from './modules/orders/infrastructure/api/routes';

const main = async () => {
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(cors());
  app.use(express.json());
  app.use('/', ordersRouter);
  app.use(errorMiddleware);
  app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
  });
};

main().catch((err) => console.log('Uncaught Error:', err));
