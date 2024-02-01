import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStudentDto, SchoolYearIdDto, UpdateStudentDto } from './dto';
import { StudentRO } from './types';
import { Prisma } from '@prisma/client';

const studentSelect = {
  id: true,
  name: true,
  years: {
    select: {
      id: true,
      year: true,
    },
  },
};

@Injectable()
export class StudentService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userId: number, dto: CreateStudentDto): Promise<StudentRO> {
    await this.validateSchoolYearIDs(dto.schoolYearIds);

    const student = await this.prismaService.student.create({
      data: {
        name: dto.name,
        userId: userId,
        years: {
          connect: dto.schoolYearIds,
        },
      },
      select: studentSelect,
    });

    return { data: student };
  }

  async update(
    userId: number,
    id: number,
    dto: UpdateStudentDto,
  ): Promise<StudentRO> {
    await this.isStudentOwned(userId, id);

    const { schoolYearIds, ...data } = dto;

    await this.validateSchoolYearIDs(schoolYearIds);

    const studentUpdateData: Prisma.StudentUpdateInput = {
      ...data,
    };

    if (schoolYearIds) {
      studentUpdateData.years = {
        set: schoolYearIds,
      };
    }

    const student = await this.prismaService.student.update({
      where: { id },
      data: studentUpdateData,
      select: studentSelect,
    });

    return { data: student };
  }

  async delete(userId: number, id: number): Promise<void> {
    await this.isStudentOwned(userId, id);

    await this.prismaService.student.delete({
      where: { id },
    });
  }

  async isStudentOwned(userId: number, studentId: number): Promise<void> {
    const student = await this.prismaService.student.findUnique({
      where: { id: studentId, userId },
      select: { id: true },
    });

    if (!student) {
      throw new UnauthorizedException('This student does not exist');
    }
  }

  private async validateSchoolYearIDs(years: SchoolYearIdDto[]): Promise<void> {
    if (!years) {
      return null;
    }

    const foundSchoolYears = await this.prismaService.schoolYear.findMany({
      where: {
        id: {
          in: years.map((item) => item.id),
        },
      },
      select: {
        id: true,
      },
    });

    if (foundSchoolYears.length !== years.length) {
      throw new UnauthorizedException('Some school year IDs are invalid');
    }
  }
}
