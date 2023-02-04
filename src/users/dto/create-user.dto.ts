import { IsString, IsNotEmpty } from 'class-validator';
import { VALIDATION_MESSAGE } from 'src/pipes/validation.message';

export class CreateUserDto {
  @IsNotEmpty({ message: VALIDATION_MESSAGE.REQUIRED })
  @IsString({ message: VALIDATION_MESSAGE.STRING })
  readonly login: string;

  @IsNotEmpty({ message: VALIDATION_MESSAGE.REQUIRED })
  @IsString({ message: VALIDATION_MESSAGE.STRING })
  readonly password: string;
}
