import { PrismaClient } from '@prisma/client';
import { users } from './user.seed';
import * as bcrypt from 'bcrypt';
import { schoolYears } from './school_year.seed';
import { students } from './student.seed';

const prisma = new PrismaClient();

load();

async function load() {
  try {
    for (const item of users) {
      await prisma.user.create({
        data: {
          ...item,
          password: await bcrypt.hash(item.password, 10),
        },
      });
    }

    for (const item of schoolYears) {
      await prisma.schoolYear.create({
        data: item,
      });
    }

    for (const item of students) {
      await prisma.student.create({
        data: {
          ...item,
          years: {
            connect: [{ id: 1 }, { id: 2 }],
          },
        },
      });
    }

    const student = await prisma.student.findFirst({
      where: {
        years: {
          some: {
            id: 1,
          },
        },
      },
      include: { years: true },
    });
    console.log(student);
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}
