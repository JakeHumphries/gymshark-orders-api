import { ValidationError } from '../../../../core/errors/validation.error';

class QuantityIsDecimalError extends ValidationError {
  constructor() {
    super(400, 'Quantity Cannot be a decimal');
  }
}

export default QuantityIsDecimalError;
