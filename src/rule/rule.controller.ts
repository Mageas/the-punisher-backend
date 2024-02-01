import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { RuleService } from './rule.service';
import { GetCurrentUserId } from 'src/auth/common/decorators';
import { CreateRuleDto } from './dto';
import { RuleRO } from './types';

@Controller('rule')
export class RuleController {
  constructor(private readonly ruleService: RuleService) {}

  @Post()
  async create(
    @GetCurrentUserId() userId: number,
    @Body() dto: CreateRuleDto,
  ): Promise<RuleRO> {
    return this.ruleService.create(userId, dto);
  }

  @Patch(':id')
  async update(
    @GetCurrentUserId() userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateRuleDto,
  ): Promise<RuleRO> {
    return await this.ruleService.update(userId, id, dto);
  }

  @Delete(':id')
  async delete(
    @GetCurrentUserId() userId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return await this.ruleService.delete(userId, id);
  }
}
