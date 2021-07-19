import { ValidationError } from '../../../../../core/errors/Validation.error';

class CantDeleteLastPackError extends ValidationError {
  constructor() {
    super(400, 'Cant Delete Last Pack.');
  }
}

export default CantDeleteLastPackError;
