import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  async create(createTodoDto: CreateTodoDto) {
    return await this.prisma.todo.create({
      data: createTodoDto as Prisma.TodoCreateInput, // Explicitly cast createTodoDto to the expected type
    });
  }

  async findAll() {
    return await this.prisma.todo.findMany({
      where: {
        published: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.todo.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    return await this.prisma.todo.update({
      where: { id },
      data: updateTodoDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.todo.delete({
      where: { id },
    });
  }
}
