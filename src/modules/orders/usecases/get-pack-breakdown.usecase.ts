import { IUseCase } from '../../../core/domain/usecase.interface';
import { packSizes } from '../state';
import QuantityIsDecimalError from './errors/QuantityIsDecimal.error';
import QuantityIsNegativeError from './errors/QuantityIsNegative.error';
import QuantityIsNotANumberError from './errors/QuantityIsNotANumber';

// We could break this down into smaller functions...
class GetPackBreakdown implements IUseCase<{ orderQuantity: number }> {
  execute({ orderQuantity }: { orderQuantity: number }) {
    if (Number.isNaN(orderQuantity)) {
      throw new QuantityIsNotANumberError();
    }

    if (orderQuantity % 1 !== 0) {
      throw new QuantityIsDecimalError();
    }

    if (orderQuantity < 0) {
      throw new QuantityIsNegativeError();
    }

    const packsGenerated = {};

    let overallOrdersRemaining = orderQuantity;

    packSizes.sort((a, b) => b - a);

    packSizes.map((currentPackSize, index, packSizesArr) => {
      // intialise pack size
      if (!packsGenerated[currentPackSize]) {
        packsGenerated[currentPackSize] = 0;
      }

      let packSizeQuantity: number;

      // checking if current pack size is the lowest pack size
      if (currentPackSize === packSizesArr[packSizesArr.length - 1]) {
        const previousPackSize = packSizesArr[index - 1];

        packSizeQuantity = Math.ceil(overallOrdersRemaining / currentPackSize);

        // if current total amount is less than the next pack size up then update current otherwise update next pack up
        if (packSizeQuantity * currentPackSize < previousPackSize) {
          packsGenerated[currentPackSize] += packSizeQuantity;
        } else {
          packsGenerated[previousPackSize] += 1;
        }
      }
      // if not lowest pack size then add pack normally
      else {
        packSizeQuantity = Math.floor(overallOrdersRemaining / currentPackSize);
        packsGenerated[currentPackSize] += packSizeQuantity;
      }

      overallOrdersRemaining -= currentPackSize * packSizeQuantity;

      // if packs generated so far equals the highest pack size then clear and add the highest pack size
      const totalItems = Object.entries(packsGenerated).reduce((RunningItemTotal, currentPackGenerated) => {
        const amount = currentPackGenerated[1] as number;
        return RunningItemTotal + Number(currentPackGenerated[0]) * amount;
      }, 0);

      if (totalItems === packSizesArr[0]) {
        Object.keys(packsGenerated).forEach((pack) => {
          packsGenerated[pack] = 0;
        });
        packsGenerated[packSizesArr[0]] = 1;
      }
      return true;
    });
    return packsGenerated;
  }
}

const getPackBreakdown = new GetPackBreakdown();

export { getPackBreakdown };
