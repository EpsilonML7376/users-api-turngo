import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { JwtService } from '../jwt/jwt.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly jwtService: JwtService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Google OAuth iniciará automáticamente
    // Este método no se ejecuta, Google maneja la autenticación
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: any, @Res() res: Response) {
    const user = req.user;
    
    // Generar JWT token
    const accessToken = this.jwtService.generateToken({ email: user.email });
    const refreshToken = this.jwtService.generateToken({ email: user.email }, 'refresh');

    // Redirigir al frontend con los tokens
    const redirectUrl = `http://localhost:4200/auth/callback?accessToken=${accessToken}&refreshToken=${refreshToken}&email=${user.email}`;
    res.redirect(redirectUrl);
  }
}

