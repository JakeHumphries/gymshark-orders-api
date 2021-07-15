import express from 'express';
import { orderController } from '../orders.controller';

const ordersRouter = express.Router();

ordersRouter.get('/get-pack-breakdown/:orderquantity', (req, res, next) =>
  orderController.getPackBreakdown(req, res, next)
);

export default ordersRouter;
