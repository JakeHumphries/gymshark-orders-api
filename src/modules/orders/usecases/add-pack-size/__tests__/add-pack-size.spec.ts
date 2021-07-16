import { packSizes } from '../../../state';
import { addPackSize } from '../add-pack-size.usecase';
import PackSizeAlreadyExistsError from '../errors/PackSizeAlreadyExists.error';
import PackSizeIsZero from '../errors/PackSizeIsZero.error';

describe('addPackSize ', () => {
  it('should add the pack size to the array if it is a legitimate pack size', () => {
    addPackSize.execute(100);
    expect(packSizes).toStrictEqual([500, 1000, 250, 5000, 2000, 100]);
  });

  it('should error with the correct error if the packsize already exists', () => {
    try {
      addPackSize.execute(250);
    } catch (err) {
      expect(err instanceof PackSizeAlreadyExistsError);
    }
  });

  it('should error with the correct error if the packsize os zero', () => {
    try {
      addPackSize.execute(0);
    } catch (err) {
      expect(err instanceof PackSizeIsZero);
    }
  });
});
