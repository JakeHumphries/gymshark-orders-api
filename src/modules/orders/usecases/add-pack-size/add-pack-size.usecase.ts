import { IUseCase } from '../../../../core/domain/usecase.interface';
import { packSizes } from '../../state';
import { validateNumber } from '../../utils/validate-number';
import PackSizeAlreadyExistsError from './errors/PackSizeAlreadyExists.error';
import PackSizeIsZero from './errors/PackSizeIsZero.error';

class AddPackSize implements IUseCase<number> {
  execute(packSize: number) {
    validateNumber(packSize, 'packSize');

    if (packSizes.includes(packSize)) {
      throw new PackSizeAlreadyExistsError();
    }

    if (packSize === 0) {
      throw new PackSizeIsZero();
    }

    packSizes.push(packSize);
  }
}

const addPackSize = new AddPackSize();

export { addPackSize };
