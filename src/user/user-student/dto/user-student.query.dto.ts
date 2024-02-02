import { IsNumberString, IsOptional } from 'class-validator';

export class FindUserStudentQueryDto {
  @IsOptional()
  @IsNumberString()
  // @ValidateIf((obj) => obj.date !== undefined)
  date?: number = null;
}
