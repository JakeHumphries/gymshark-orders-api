import { ValidationError } from '../../../../../core/errors/validation.error';

class QuantityIsNegativeError extends ValidationError {
  constructor() {
    super(400, 'Quantity Cannot be negative');
  }
}

export default QuantityIsNegativeError;
