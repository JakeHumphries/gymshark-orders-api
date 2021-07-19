import { IUseCase } from '../../../../core/domain/usecase.interface';
import { packSizes } from '../../state';
import { validateNumber } from '../../utils/validate-number';
import PackSizeDoesntExistError from './errors/PackSizeDoesntExist.error';

class DeletePackSize implements IUseCase<number> {
  execute(packSize: number) {
    console.log(packSize);
    validateNumber(packSize, 'packSize');

    if (!packSizes.includes(packSize)) {
      throw new PackSizeDoesntExistError();
    }

    const index = packSizes.indexOf(packSize);
    packSizes.splice(index, 1);
  }
}

const deletePackSize = new DeletePackSize();

export { deletePackSize };
