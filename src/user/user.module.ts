import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSchoolYearModule } from './user-school-year/user-school-year.module';
import { UserRuleModule } from './user-rule/user-rule.module';
import { UserStudentModule } from './user-student/user-student.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [UserSchoolYearModule, UserRuleModule, UserStudentModule],
})
export class UserModule {}
