import { ValidationError } from '../../../../../core/errors/Validation.error';

class PackSizeDoesntExistError extends ValidationError {
  constructor() {
    super(400, 'Pack size doesnt exist.');
  }
}

export default PackSizeDoesntExistError;
