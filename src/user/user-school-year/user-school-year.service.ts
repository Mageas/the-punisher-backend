import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { schoolYearSelect } from 'src/school-year/school-year.service';
import { SchoolYearsRO } from 'src/school-year/types/school-year.type';

@Injectable()
export class UserSchoolYearService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(userId: number): Promise<SchoolYearsRO> {
    const schoolYears = await this.prismaService.schoolYear.findMany({
      where: { userId },
      select: schoolYearSelect,
    });

    return { data: schoolYears };
  }
}
