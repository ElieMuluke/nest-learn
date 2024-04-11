import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(name: string, email: string, password: string) {
    try {
      const hashedPassword = await hash(password, 10);
      const user = await this.usersService.create({
        name,
        email,
        hashedPassword,
      });

      return user;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async signIn(email: string, password: string): Promise<any> {
    try {
      const user = await this.usersService.findOneByEmail(email);
      // remove entry hashedPassword from user object --> I know it can be done like this -> remove hashedPassword

      if (!user) {
        throw new NotFoundException('user does not exist');
      }

      if (!(await compare(password, user.hashedPassword))) {
        throw new NotFoundException('username or password are incorrent');
      }

      const payload = {
        userId: user.id,
        email: user.email,
        password: user.hashedPassword,
      };

      const updatedUser = await this.usersService.update(user.id, {
        accessToken: this.jwtService.sign(payload),
        refreshToken: this.jwtService.sign(payload),
      });

      return updatedUser;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async getProfile(userId: string) {
    try {
      const user = await this.usersService.findOne(Number(userId));

      return user;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async getUsers() {
    try {
      const user = await this.usersService.findAll();

      return user;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
