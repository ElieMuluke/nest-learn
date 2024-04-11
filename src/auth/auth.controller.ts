import {
  Body,
  Controller,
  // Get,
  HttpCode,
  HttpStatus,
  // Param,
  Post,
  // Request,
  // UseGuards,
} from '@nestjs/common';

// import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
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

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: Record<string, any>) {
    const signin = await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );

    console.log({ signin });

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
}
