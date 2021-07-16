import NotANumberError from './errors/NotANumber.error';
import NumberIsDecimalError from './errors/NumberIsDecimal.error';
import NumberIsNegativeError from './errors/NumberIsNegative.error';

export const validateNumber = (number: number, key: string): void => {
  if (Number.isNaN(number)) {
    throw new NotANumberError(key);
  }

  if (number % 1 !== 0) {
    throw new NumberIsDecimalError(key);
  }

  if (number < 0) {
    throw new NumberIsNegativeError(key);
  }
};
