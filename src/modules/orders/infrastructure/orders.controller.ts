import { Request, Response, NextFunction } from 'express';
import { getPackBreakdown } from '../usecases/get-pack-breakdown/get-pack-breakdown.usecase';

class OrderController {
  async getPackBreakdown(req: Request, res: Response, next: NextFunction) {
    try {
      const packsGenerated = getPackBreakdown.execute({ orderQuantity: Number(req.params.orderquantity) });
      res.json(packsGenerated);
    } catch (err) {
      next(err);
    }
  }
}

const orderController = new OrderController();

export { orderController };
