import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SessionsService } from 'src/sessions/sessions.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private sessionsService: SessionsService,
  ) {}

  async signUp(username: string, email: string, password: string) {
    try {
      const user = await this.usersService.create({
        name: username,
        email,
        password,
      });

      return user;
    } catch (err) {
      console.log(err);
    }
  }

  async signIn(email: string, pass: string): Promise<any> {
    try {
      const user = await this.usersService.findOneByEmail(email);

      if (user?.password !== pass) {
        throw new UnauthorizedException();
      }
      const payload = { sub: user.id, email: user.email };

      const session = await this.sessionsService.create({
        currentUserId: user.id,
        accessToken: this.jwtService.sign(payload),
        refreshToken: this.jwtService.sign(payload),
      });

      return {
        ...user,
        accessToken: session.accessToken,
        refreshToken: session.refreshToken,
      };
    } catch (err) {
      console.log(err);
    }
  }

  async getProfile(userId: string) {
    try {
      const user = await this.usersService.findOne(Number.parseInt(userId));

      return user;
    } catch (err) {
      console.log(err);
    }
  }
}
