import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  async create(createTodoDto: CreateTodoDto) {
    return await this.prisma.todo.create({
      data: createTodoDto,
    });
  }

  async findAll() {
    // TODO: only show todos belonging to one user
    return await this.prisma.todo.findMany({});
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

  async removeAll() {
    return await this.prisma.todo.deleteMany();
  }
}
