import { ValidationError } from '../../../../core/errors/Validation.error';

class NumberIsNegativeError extends ValidationError {
  constructor(key: string) {
    super(400, `${key} Cannot be negative`);
  }
}

export default NumberIsNegativeError;
