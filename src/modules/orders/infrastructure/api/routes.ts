import express from 'express';
import { ordersController } from '../orders.controller';

const ordersRouter = express.Router();

ordersRouter.get('/get-pack-breakdown/:orderquantity', (req, res, next) =>
  ordersController.getPackBreakdown(req, res, next)
);

ordersRouter.post('/add-pack-size', (req, res, next) => ordersController.addPackSize(req, res, next));

export default ordersRouter;
