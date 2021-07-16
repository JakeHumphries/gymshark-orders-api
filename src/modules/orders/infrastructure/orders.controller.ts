import { Request, Response, NextFunction } from 'express';
import { addPackSize } from '../usecases/add-pack-size/add-pack-size.usecase';
import { getPackBreakdown } from '../usecases/get-pack-breakdown/get-pack-breakdown.usecase';
import InvalidBodyError from './errors/InvalidBody.error';

class OrdersController {
  getPackBreakdown(req: Request, res: Response, next: NextFunction) {
    try {
      const packsGenerated = getPackBreakdown.execute({ orderQuantity: Number(req.params.orderquantity) });
      res.json(packsGenerated);
    } catch (err) {
      next(err);
    }
  }

  addPackSize(req: Request, res: Response, next: NextFunction) {
    try {
      if (!('packSize' in req.body)) {
        throw new InvalidBodyError(JSON.stringify(req.body));
      }
      const { packSize } = req.body;
      addPackSize.execute(Number(packSize));
      res.json(`Pack: ${packSize} has been added to the list of pack sizes.`);
    } catch (err) {
      next(err);
    }
  }
}

const ordersController = new OrdersController();

export { ordersController };
