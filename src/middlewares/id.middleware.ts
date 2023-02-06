import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { validate } from 'uuid';

@Injectable()
export class IdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const isUuidId = validate(id);

    if (id && !isUuidId) {
      throw new HttpException('Id is invalid.', HttpStatus.BAD_REQUEST);
    }

    next();
  }
}
