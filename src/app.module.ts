import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { TodosModule } from './todos/todos.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';

@Module({
  imports: [PrismaModule, AuthModule, TodosModule, UsersModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
      // ThrottlerModule.forRoot([{
      //   ttl: 60000,
      //   limit: 10,
      // }]),
    },
  ],
})
export class AppModule {}
