import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ruleSelect } from 'src/rule/rule.service';
import { RulesRO } from 'src/rule/types';

@Injectable()
export class UserRuleService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(userId: number): Promise<RulesRO> {
    const schoolYears = await this.prismaService.rule.findMany({
      where: { userId },
      select: ruleSelect,
    });

    return { data: schoolYears };
  }
}
