import { Controller, Get } from '@nestjs/common';
import { UserSchoolYearService } from './user-school-year.service';
import { SchoolYearsRO } from 'src/school-year/types/school-year.type';
import { GetCurrentUserId } from 'src/auth/common/decorators';

@Controller('user/school_years')
export class UserSchoolYearController {
  constructor(private readonly userSchoolYearService: UserSchoolYearService) {}

  @Get()
  async findAll(@GetCurrentUserId() userId: number): Promise<SchoolYearsRO> {
    return await this.userSchoolYearService.findAll(userId);
  }
}
