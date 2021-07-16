import { ValidationError } from '../../../../../core/errors/Validation.error';

class PackSizeIsZero extends ValidationError {
  constructor() {
    super(400, 'Pack size cannot be zero.');
  }
}

export default PackSizeIsZero;
