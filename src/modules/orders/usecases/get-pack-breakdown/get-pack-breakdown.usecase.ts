import { IUseCase } from '../../../../core/domain/usecase.interface';
import { packSizes } from '../../state';
import { validateNumber } from '../../utils/validate-number';

// We could break this down into smaller functions...
class GetPackBreakdown implements IUseCase<{ orderQuantity: number }> {
  execute({ orderQuantity }: { orderQuantity: number }) {
    validateNumber(orderQuantity, 'orderQuantity');

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

      return true;
    });

    // if any of the pack sizes * the pack quantity === another pack size then update it
    const packSizeNames = Object.keys(packsGenerated);
    const packSizeEntries = Object.entries(packsGenerated);
    packSizeEntries.map((packSizeEntry) => {
      const total = (Number(packSizeEntry[0]) * Number(packSizeEntry[1])).toString();
      if (packSizeNames.includes(total) && packSizeEntry[0] !== total) {
        packsGenerated[packSizeEntry[0]] = 0;
        packsGenerated[total] += 1;
      }
      return false;
    });

    // If total packs generated === another pack size then clear all packs sizes and update the 1 that it equals
    const totalItems = Object.entries(packsGenerated).reduce((RunningItemTotal, currentPackGenerated) => {
      const amount = currentPackGenerated[1] as number;
      return RunningItemTotal + Number(currentPackGenerated[0]) * amount;
    }, 0);

    if (packSizeNames.includes(totalItems.toString())) {
      Object.keys(packsGenerated).forEach((pack) => {
        packsGenerated[pack] = 0;
      });
      packsGenerated[totalItems.toString()] = 1;
    }

    return packsGenerated;
  }
}

const getPackBreakdown = new GetPackBreakdown();

export { getPackBreakdown };
