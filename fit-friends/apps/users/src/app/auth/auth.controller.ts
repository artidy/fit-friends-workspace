import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { fillObject, User } from '@fit-friends/core';
import { UserRequest } from '@fit-friends/shared-types';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'User has been successfully logged.'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  public async login(@User() user: UserRequest) {
    return this.authService.loginUser(user);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a new access/refresh tokens'
  })
  public async refresh(@User() user: UserRequest) {
    const tokenData = await this.authService.loginUser({
      name: user.name,
      role: user.role,
      email: user.email,
      _id: user.id
    }, user.refreshTokenId);

    return fillObject(LoggedUserRdo, tokenData);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Logout'
  })
  public async logout(@User() user: UserRequest) {
    const tokenData = this.authService.logout(user.refreshTokenId);

    return fillObject(LoggedUserRdo, tokenData);
  }
}
