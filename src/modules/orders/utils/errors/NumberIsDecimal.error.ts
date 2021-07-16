import { ValidationError } from '../../../../core/errors/Validation.error';

class NumberIsDecimalError extends ValidationError {
  constructor(key: string) {
    super(400, `${key} Cannot be a decimal`);
  }
}

export default NumberIsDecimalError;
