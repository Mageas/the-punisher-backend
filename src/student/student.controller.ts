import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { GetCurrentUserId } from 'src/auth/common/decorators';
import { CreateStudentDto, UpdateStudentDto } from './dto';
import { StudentRO } from './types';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  async create(
    @GetCurrentUserId() userId: number,
    @Body() dto: CreateStudentDto,
  ): Promise<StudentRO> {
    return this.studentService.create(userId, dto);
  }

  @Patch(':id')
  async update(
    @GetCurrentUserId() userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateStudentDto,
  ): Promise<StudentRO> {
    return await this.studentService.update(userId, id, dto);
  }

  @Delete(':id')
  async delete(
    @GetCurrentUserId() userId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return await this.studentService.delete(userId, id);
  }
}
