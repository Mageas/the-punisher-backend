import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { studentSelect } from 'src/student/student.service';
import { StudentsRO } from 'src/student/types';

@Injectable()
export class UserStudentService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(userId: number, date: number): Promise<StudentsRO> {
    const students = await this.prismaService.student.findMany({
      where: {
        userId,
        ...(date
          ? {
              years: {
                some: {
                  id: date,
                },
              },
            }
          : {
              years: {
                none: {},
              },
            }),
      },
      select: studentSelect,
    });

    return { data: students };
  }
}
