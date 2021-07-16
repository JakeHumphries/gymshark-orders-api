import { ValidationError } from '../../../../../core/errors/Validation.error';

class PackSizeAlreadyExistsError extends ValidationError {
  constructor() {
    super(400, 'Pack size is already in the list.');
  }
}

export default PackSizeAlreadyExistsError;
