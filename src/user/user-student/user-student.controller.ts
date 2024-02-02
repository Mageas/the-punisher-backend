import { Controller, Get, Query } from '@nestjs/common';
import { GetCurrentUserId } from 'src/auth/common/decorators';
import { UserStudentService } from './user-student.service';
import { StudentsRO } from 'src/student/types';
import { FindUserStudentQueryDto } from './dto/user-student.query.dto';

@Controller('user/students')
export class UserStudentController {
  constructor(private readonly userStudentServicer: UserStudentService) {}

  @Get()
  async findAll(
    @GetCurrentUserId() userId: number,
    @Query() query: FindUserStudentQueryDto,
  ): Promise<StudentsRO> {
    const { date } = query;

    return await this.userStudentServicer.findAll(userId, +date);
  }
}
