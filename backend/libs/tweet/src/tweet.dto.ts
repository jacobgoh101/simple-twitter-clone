import { IsString, MinLength, MaxLength } from 'class-validator';

export class CreateTweetDto {
  @IsString()
  @MinLength(5)
  @MaxLength(64)
  body: string;
}
