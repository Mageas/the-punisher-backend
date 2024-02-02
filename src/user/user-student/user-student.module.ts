import { Module } from '@nestjs/common';
import { UserStudentService } from './user-student.service';
import { UserStudentController } from './user-student.controller';

@Module({
  providers: [UserStudentService],
  controllers: [UserStudentController],
})
export class UserStudentModule {}
