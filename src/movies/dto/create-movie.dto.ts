import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  readonly title: string;

  @IsNumber()
  readonly year: number;

  @IsOptional() // 있어도되고 없어도됨
  @IsString({ each: true }) // 각각(모든 요소)가 전부 문자열
  readonly genres: string[];
}
