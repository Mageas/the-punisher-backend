import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRuleDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  count: number;

  @IsBoolean()
  repeat: boolean;
}
