import { Module } from '@nestjs/common';
import { UserRuleService } from './user-rule.service';
import { UserRuleController } from './user-rule.controller';

@Module({
  providers: [UserRuleService],
  controllers: [UserRuleController]
})
export class UserRuleModule {}
