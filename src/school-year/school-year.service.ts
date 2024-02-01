import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSchoolYearDto, UpdateSchoolYearDto } from './dto';
import { SchoolYearRO } from './types';

export const schoolYearSelect = {
  id: true,
  year: true,
};

@Injectable()
export class SchoolYearService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    userId: number,
    dto: CreateSchoolYearDto,
  ): Promise<SchoolYearRO> {
    const schoolYear = await this.prismaService.schoolYear.create({
      data: {
        ...dto,
        user: {
          connect: {
            id: userId,
          },
        },
      },
      select: schoolYearSelect,
    });

    return { data: schoolYear };
  }

  async update(
    userId: number,
    id: number,
    dto: UpdateSchoolYearDto,
  ): Promise<SchoolYearRO> {
    await this.isSchoolYearOwner(userId, id);

    const schoolYear = await this.prismaService.schoolYear.update({
      where: { id },
      data: dto,
      select: schoolYearSelect,
    });

    return { data: schoolYear };
  }

  async delete(userId: number, id: number): Promise<void> {
    await this.isSchoolYearOwner(userId, id);

    await this.prismaService.schoolYear.delete({
      where: { id },
    });
  }

  async isSchoolYearOwner(userId: number, schoolYearId: number): Promise<void> {
    const schoolYear = await this.prismaService.schoolYear.findUnique({
      where: { id: schoolYearId, userId },
      select: { id: true },
    });

    if (!schoolYear) {
      throw new UnauthorizedException('This school year does not exist');
    }
  }
}
