import { SchoolYear } from '@prisma/client';

interface SchoolYearOmit extends Omit<SchoolYear, 'userId'> {}

export type SchoolYearRO = {
  data: SchoolYearOmit;
};

export type SchoolYearsRO = {
  data: SchoolYearOmit[];
};
