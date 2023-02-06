import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';
import { VALIDATION_MESSAGE } from 'src/pipes/validation.message';

export class ArtistDto {
  @IsNotEmpty({ message: VALIDATION_MESSAGE.REQUIRED })
  @IsString({ message: VALIDATION_MESSAGE.STRING })
  readonly name: string;

  @IsNotEmpty({ message: VALIDATION_MESSAGE.REQUIRED })
  @IsBoolean({ message: VALIDATION_MESSAGE.BOOLEAN })
  readonly grammy: boolean;
}
