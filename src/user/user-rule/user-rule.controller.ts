import { Controller, Get } from '@nestjs/common';
import { GetCurrentUserId } from 'src/auth/common/decorators';
import { UserRuleService } from './user-rule.service';
import { RulesRO } from 'src/rule/types';

@Controller('user/rules')
export class UserRuleController {
  constructor(private readonly userRuleService: UserRuleService) {}

  @Get()
  async findAll(@GetCurrentUserId() userId: number): Promise<RulesRO> {
    return await this.userRuleService.findAll(userId);
  }
}
