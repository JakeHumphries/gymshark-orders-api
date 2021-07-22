/* eslint-disable no-param-reassign */
import { IUseCase } from '../../../../core/domain/usecase.interface';
import { packSizes } from '../../state';
import { validateNumber } from '../../utils/validate-number';

// We could break this down into smaller functions...
class GetPackBreakdown implements IUseCase<{ orderQuantity: number }> {
  checkForMoreEfficientPacks(packsGenerated, packSizeNames) {
    // if total packs generated can be divided by a higher pack number then use that one
    const packInformation = Object.entries(packsGenerated).reduce(
      (endResult, currentPackGenerated) => {
        const amount = currentPackGenerated[1] as number;
        endResult.totalPacks += amount;
        return {
          totalItems: endResult.totalItems + Number(currentPackGenerated[0]) * amount,
          totalPacks: endResult.totalPacks
        };
      },
      { totalItems: 0, totalPacks: 0 }
    );

    let mostEfficientPackSize = '';

    packSizeNames.map((packSize) => {
      const dividedTotal = packInformation.totalItems / Number(packSize);
      if (Number.isInteger(dividedTotal) && dividedTotal < packInformation.totalPacks) {
        packInformation.totalPacks = dividedTotal;
        mostEfficientPackSize = packSize;
      }
      return true;
    });

    if (mostEfficientPackSize !== '') {
      Object.keys(packsGenerated).forEach((pack) => {
        packsGenerated[pack] = 0;
      });

      packsGenerated[mostEfficientPackSize] = packInformation.totalPacks;
    }

    return packsGenerated;
  }

  execute({ orderQuantity }: { orderQuantity: number }) {
    validateNumber(orderQuantity, 'orderQuantity');

    let packsGenerated = {};

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
        if (packSizesArr.length > 1) {
          if (packSizeQuantity * currentPackSize < previousPackSize) {
            packsGenerated[currentPackSize] += packSizeQuantity;
          } else {
            packsGenerated[previousPackSize] += 1;
          }
        } else {
          packsGenerated[currentPackSize] += packSizeQuantity;
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

    const packSizeNames = Object.keys(packsGenerated);

    packsGenerated = this.checkForMoreEfficientPacks(packsGenerated, packSizeNames);

    return packsGenerated;
  }
}

const getPackBreakdown = new GetPackBreakdown();

export { getPackBreakdown };
