import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSchoolYearDto {
  @IsNotEmpty()
  @IsString()
  year: string;
}
