import { IUseCase } from '../../../../core/domain/usecase.interface';
import { packSizes } from '../../state';
import { validateNumber } from '../../utils/validate-number';
import CantDeleteLastPackError from './errors/CantDeleteLastPack';
import PackSizeDoesntExistError from './errors/PackSizeDoesntExist.error';

class DeletePackSize implements IUseCase<number> {
  execute(packSize: number) {
    validateNumber(packSize, 'packSize');

    if (!packSizes.includes(packSize)) {
      throw new PackSizeDoesntExistError();
    }

    if (packSizes.length <= 1) {
      throw new CantDeleteLastPackError();
    }

    const index = packSizes.indexOf(packSize);
    packSizes.splice(index, 1);
  }
}

const deletePackSize = new DeletePackSize();

export { deletePackSize };
