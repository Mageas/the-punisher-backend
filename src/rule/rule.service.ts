import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRuleDto, UpdateRuleDto } from './dto';
import { RuleRO } from './types';

export const ruleSelect = {
  id: true,
  name: true,
  description: true,
  count: true,
  repeat: true,
};

@Injectable()
export class RuleService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userId: number, dto: CreateRuleDto): Promise<RuleRO> {
    const rule = await this.prismaService.rule.create({
      data: {
        ...dto,
        user: {
          connect: {
            id: userId,
          },
        },
      },
      select: ruleSelect,
    });

    return { data: rule };
  }

  async update(
    userId: number,
    id: number,
    dto: UpdateRuleDto,
  ): Promise<RuleRO> {
    await this.isRuleOwned(userId, id);

    const rule = await this.prismaService.rule.update({
      where: { id },
      data: dto,
      select: ruleSelect,
    });

    return { data: rule };
  }

  async delete(userId: number, id: number): Promise<void> {
    await this.isRuleOwned(userId, id);

    await this.prismaService.rule.delete({
      where: { id },
    });
  }

  async isRuleOwned(userId: number, ruleId: number): Promise<void> {
    const rule = await this.prismaService.rule.findUnique({
      where: { id: ruleId, userId },
      select: { id: true },
    });

    if (!rule) {
      throw new UnauthorizedException('This rule does not exist');
    }
  }
}
