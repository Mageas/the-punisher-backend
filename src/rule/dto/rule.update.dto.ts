import { PartialType } from '@nestjs/mapped-types';
import { CreateRuleDto } from './rule.create.dto';

export class UpdateRuleDto extends PartialType(CreateRuleDto) {}
