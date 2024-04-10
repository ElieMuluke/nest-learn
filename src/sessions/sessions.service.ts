import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  SessionCreateInput,
  SessionUpdateInput,
} from 'src/sessions/dto/sessions.dto';

@Injectable()
export class SessionsService {
  constructor(private prisma: PrismaService) {}

  async create(receivedData: SessionCreateInput) {
    return await this.prisma.session.create({
      data: receivedData,
    });
  }

  async findAll() {
    return await this.prisma.session.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.session.findUnique({
      where: { id },
    });
  }

  async findOneByToken(token: string) {
    return await this.prisma.session.findFirst({
      where: { accessToken: token },
    });
  }

  async update(id: number, data: SessionUpdateInput) {
    return await this.prisma.session.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return await this.prisma.session.delete({
      where: { id },
    });
  }
}
