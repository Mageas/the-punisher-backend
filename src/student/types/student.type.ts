import { Student } from '@prisma/client';

interface StudentOmit extends Omit<Student, 'userId'> {}

export type StudentRO = {
  data: StudentOmit;
};

export type StudentsRO = {
  data: StudentOmit[];
};
