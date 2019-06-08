import { IsNotEmpty } from 'class-validator';

export class CreateNewsDto {
  @IsNotEmpty()
  readonly image: string;

  @IsNotEmpty()
  readonly content: string;

  @IsNotEmpty()
  readonly position: string;
}
