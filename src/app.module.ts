import { Module } from '@nestjs/common';
import { TodosModule } from './todos/todos.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TodosModule, PrismaModule, AuthModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
