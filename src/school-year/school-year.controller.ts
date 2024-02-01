import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { SchoolYearService } from './school-year.service';
import { GetCurrentUserId } from 'src/auth/common/decorators';
import { CreateSchoolYearDto, UpdateSchoolYearDto } from './dto';
import { SchoolYearRO } from './types';

@Controller('school_years')
export class SchoolYearController {
  constructor(private readonly schoolYearService: SchoolYearService) {}

  @Post()
  async create(
    @GetCurrentUserId() userId: number,
    @Body() dto: CreateSchoolYearDto,
  ): Promise<SchoolYearRO> {
    return this.schoolYearService.create(userId, dto);
  }

  @Patch(':id')
  async update(
    @GetCurrentUserId() userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSchoolYearDto,
  ): Promise<SchoolYearRO> {
    return await this.schoolYearService.update(userId, id, dto);
  }

  @Delete(':id')
  async delete(
    @GetCurrentUserId() userId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return await this.schoolYearService.delete(userId, id);
  }
}
