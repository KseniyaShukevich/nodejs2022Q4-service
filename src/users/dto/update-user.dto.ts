import { IsNotEmpty, IsString } from 'class-validator';
import { VALIDATION_MESSAGE } from 'src/pipes/validation.message';

export class UpdateUserDto {
  @IsNotEmpty({ message: VALIDATION_MESSAGE.REQUIRED })
  @IsString({ message: VALIDATION_MESSAGE.STRING })
  readonly oldPassword: string;

  @IsNotEmpty({ message: VALIDATION_MESSAGE.REQUIRED })
  @IsString({ message: VALIDATION_MESSAGE.STRING })
  readonly newPassword: string;
}
