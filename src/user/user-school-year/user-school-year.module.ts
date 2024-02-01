import { Module } from '@nestjs/common';
import { UserSchoolYearController } from './user-school-year.controller';
import { UserSchoolYearService } from './user-school-year.service';

@Module({
  controllers: [UserSchoolYearController],
  providers: [UserSchoolYearService],
})
export class UserSchoolYearModule {}
