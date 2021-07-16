import { packSizes } from '../../../state';
import { deletePackSize } from '../delete-pack-size.usecase';
import PackSizeDoesntExistError from '../errors/PackSizeDoesntExist.error';

describe('getPackBreakdown ', () => {
  it('should delete a pack size from the pack sizes array if the value exists', () => {
    deletePackSize.execute(250);
    expect(packSizes).toStrictEqual([500, 1000, 5000, 2000]);
    packSizes.push(250);
  });
  it('should error with the correct error if the packsize doesnt exists', () => {
    try {
      deletePackSize.execute(9000);
    } catch (err) {
      expect(err instanceof PackSizeDoesntExistError);
    }
  });
});
