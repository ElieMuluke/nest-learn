import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
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
  signUp(@Body() signUpDto: Record<string, any>) {
    return {
      message: 'User registered successfully!',
      user: this.authService.signUp(
        signUpDto.username,
        signUpDto.email,
        signUpDto.password,
      ),
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return {
      message: 'User logged in successfully!',
      user: this.authService.signIn(signInDto.username, signInDto.password),
    };
  }

  // @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('profile/:id')
  getProfile(@Param() params: any): Record<string, any> {
    const userId = params.id;
    console.log(userId);

    return this.authService.getProfile(userId);
  }
}
