import { ValidationError } from '../../../../core/errors/Validation.error';

class NotANumberError extends ValidationError {
  constructor(key: string) {
    super(400, `${key} must be a number`);
  }
}

export default NotANumberError;
