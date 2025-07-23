import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Req,
  UseGuards,
  Get,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import * as bcrypt from 'bcrypt';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private setAuthCookies(
    res: Response,
    tokens: { access_token: string; refresh_token: string },
  ) {
    res.cookie('access_token', tokens.access_token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 1000,
    });
    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }

  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const tokens = await this.authService.login(loginDto);
    this.setAuthCookies(res, tokens);
    return res.status(HttpStatus.OK).json({ message: 'Login successful' });
  }

  @ApiOperation({ summary: 'Register user' })
  @ApiResponse({ status: 201, description: 'User registered' })
  @Post('register')
  async register(@Body() registerDto: RegisterDto, @Res() res: Response) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const user = await this.authService.register({
      ...registerDto,
      password: hashedPassword,
    });
    const tokens = await this.authService.login({
      email: user.email,
      password: registerDto.password,
    });
    this.setAuthCookies(res, tokens);
    return res
      .status(HttpStatus.CREATED)
      .json({ id: user.id, email: user.email });
  }

  @ApiOperation({ summary: 'Refresh tokens' })
  @ApiResponse({ status: 200, description: 'Tokens refreshed' })
  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  async refresh(
    @Body() { refresh_token }: RefreshTokenDto,
    @Res() res: Response,
  ) {
    const tokens = await this.authService.refreshTokens(refresh_token);
    this.setAuthCookies(res, tokens);
    return res.status(HttpStatus.OK).json({ message: 'Tokens refreshed' });
  }

  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({ status: 200, description: 'Logged out successfully.' })
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req, @Res() res: Response) {
    const userId = req.user.id;
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    return this.authService.logout(userId);
  }

  @ApiOperation({ summary: 'User data' })
  @ApiResponse({ status: 200, description: 'User registered' })
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getUser(@Req() req) {
    const userId = req.user.id;

    return this.authService.getUser(userId);
  }
}
