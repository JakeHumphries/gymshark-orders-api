import { HttpError } from '../../../../core/errors/Http.error';

class InvalidBodyError extends HttpError {
  constructor(bodyReq: string) {
    super(400, `Invalid Body: ${bodyReq}`);
  }
}

export default InvalidBodyError;
