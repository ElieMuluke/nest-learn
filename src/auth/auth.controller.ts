import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/constants';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  async signUp(@Body() signUpDto: Record<string, any>) {
    const newUser = await this.authService.signUp(
      signUpDto.name,
      signUpDto.email,
      signUpDto.password,
    );

    if (!newUser) {
      return {
        message: 'User not registered successfully!',
      };
    }

    return {
      message: 'User registered successfully!',
    };
  }

  @Public()
  @Post('login')
  async signIn(@Body() signInDto: Record<string, any>) {
    const signin = await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );

    if (!signin) {
      return {
        message: 'User not signed in successfully!',
      };
    }
    return {
      message: 'User signed in successfully!',
      user: signin,
    };
  }

  @Get('logout/:id')
  async logout(@Param('id') id: number) {
    const logout = await this.authService.logout(Number(id));

    if (!logout) {
      return {
        message: 'User not logged out successfully!',
      };
    }
    return {
      message: 'User logged out successfully!',
    };
  }
}
