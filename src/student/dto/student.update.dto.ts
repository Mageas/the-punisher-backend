import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentDto } from './student.create.dto';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {}
