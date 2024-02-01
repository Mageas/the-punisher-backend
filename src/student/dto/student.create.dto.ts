import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  // @IsArray()
  // @IsInt({ each: true })
  @ValidateNested({ each: true })
  @Type(() => SchoolYearIdDto)
  schoolYearIds?: SchoolYearIdDto[];
}

export class SchoolYearIdDto {
  @IsNotEmpty()
  @IsInt()
  id: number;
}
