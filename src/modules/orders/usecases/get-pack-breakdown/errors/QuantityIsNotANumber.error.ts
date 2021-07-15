import { ValidationError } from '../../../../../core/errors/validation.error';

class QuantityIsNotANumberError extends ValidationError {
  constructor() {
    super(400, 'Quantity must be a number');
  }
}

export default QuantityIsNotANumberError;
