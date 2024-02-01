import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { AtGuard, PermissionsGuard } from './auth/common/guards';
import { UserModule } from './user/user.module';
import { SessionModule } from './session/session.module';
import { SchoolYearModule } from './school-year/school-year.module';
import { RuleModule } from './rule/rule.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    UserModule,
    SessionModule,
    SchoolYearModule,
    RuleModule,
    StudentModule,
  ],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: AtGuard,
    },
    {
      provide: 'APP_GUARD',
      useClass: PermissionsGuard,
    },
  ],
})
export class AppModule {}
