import NotANumberError from '../errors/NotANumber.error';
import NumberIsDecimalError from '../errors/NumberIsDecimal.error';
import NumberIsNegativeError from '../errors/NumberIsNegative.error';
import { validateNumber } from '../validate-number';

describe('validate Number', () => {
  it('should return true for a legitimate number', () => {
    const result = validateNumber(100, 'orderQuantity');
    expect(result).toBe(true);
  });

  it('Should throw the correct error if the number is not a number', () => {
    try {
      validateNumber(Number('Not a Number'), 'orderQuantity');
    } catch (err) {
      expect(err instanceof NotANumberError).toBe(true);
    }
  });
  it('Should throw the correct error if the number is a decimal', () => {
    try {
      validateNumber(10.2, 'orderQuantity');
    } catch (err) {
      expect(err instanceof NumberIsDecimalError).toBe(true);
    }
  });
  it('Should throw the correct error if the number is negative', () => {
    try {
      validateNumber(-10, 'orderQuantity');
    } catch (err) {
      expect(err instanceof NumberIsNegativeError).toBe(true);
    }
  });
});
