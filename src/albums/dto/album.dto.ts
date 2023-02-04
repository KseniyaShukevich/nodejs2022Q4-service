import { IsNotEmpty, IsPositive, IsString, ValidateIf } from 'class-validator';
import { VALIDATION_MESSAGE } from 'src/pipes/validation.message';

export class AlbumDto {
  @IsNotEmpty({ message: VALIDATION_MESSAGE.REQUIRED })
  @IsString({ message: VALIDATION_MESSAGE.STRING })
  readonly name: string;

  @IsNotEmpty({ message: VALIDATION_MESSAGE.REQUIRED })
  @IsPositive({ message: VALIDATION_MESSAGE.POSITIVE_NUMBER })
  readonly year: number;

  @IsNotEmpty({ message: VALIDATION_MESSAGE.REQUIRED })
  @ValidateIf((object, value) => value !== null)
  @IsString({ message: VALIDATION_MESSAGE.STRING_OR_NULL })
  readonly artistId: string | null;
}
