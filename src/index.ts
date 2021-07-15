import express from 'express';
import { getPackBreakdown } from './modules/orders/usecases/get-pack-breakdown';

const main = async () => {
  const app = express();
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
  });
  console.log(getPackBreakdown.execute({ orderQuantity: 500 }));
};

main().catch((err) => console.log('Uncaught Error:', err));
