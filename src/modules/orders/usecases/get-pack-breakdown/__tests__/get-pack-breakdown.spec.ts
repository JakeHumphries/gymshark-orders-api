import { getPackBreakdown } from '../get-pack-breakdown.usecase';

describe('getPackBreakdown ', () => {
  it('should return the correct pack breakdown: given an order quantity', () => {
    const result = getPackBreakdown.execute({ orderQuantity: 7250 });
    const expectedResult = {
      250: 1,
      500: 0,
      1000: 0,
      2000: 1,
      5000: 1
    };
    expect(result).toStrictEqual(expectedResult);
  });

  it('should return the correct pack breakdown: when the order is lower than the smallest pack size', () => {
    const result = getPackBreakdown.execute({ orderQuantity: 1 });
    const expectedResult = {
      250: 1,
      500: 0,
      1000: 0,
      2000: 0,
      5000: 0
    };
    expect(result).toStrictEqual(expectedResult);
  });

  it('should return no more items than neccessary (the total amount should always be the lowest possible)', () => {
    const result = getPackBreakdown.execute({ orderQuantity: 4000 });
    const expectedResult = {
      250: 0,
      500: 0,
      1000: 0,
      2000: 2,
      5000: 0
    };
    expect(result).toStrictEqual(expectedResult);
  });

  it('should return the least packs possible without returning extra items', () => {
    const result = getPackBreakdown.execute({ orderQuantity: 1999 });
    const expectedResult = {
      250: 0,
      500: 0,
      1000: 0,
      2000: 1,
      5000: 0
    };
    expect(result).toStrictEqual(expectedResult);
  });

  it('should return the least packs possible without returning extra items when the total amount === the max pack size', () => {
    const result = getPackBreakdown.execute({ orderQuantity: 4999 });
    const expectedResult = {
      250: 0,
      500: 0,
      1000: 0,
      2000: 0,
      5000: 1
    };
    expect(result).toStrictEqual(expectedResult);
  });
});
