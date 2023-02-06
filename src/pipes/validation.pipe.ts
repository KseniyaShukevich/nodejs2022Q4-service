import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from 'src/exceptions/validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    if (typeof value === 'string') {
      return value;
    }

    const obj = plainToClass(metadata.metatype, value);
    const errors = await validate(obj);

    if (errors.length) {
      const messages = errors.map((error) => {
        const fieldName = error.property;
        const errorMessages = Object.values(error.constraints);

        return `${fieldName} - ${errorMessages.join(', ')}`;
      });

      throw new ValidationException(messages);
    }

    return value;
  }
}
