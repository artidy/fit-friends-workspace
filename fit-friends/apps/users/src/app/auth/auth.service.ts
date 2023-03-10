import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import { RefreshTokenPayload, TokenPayload, User } from '@fit-friends/shared-types';

import { jwtConfig } from '../../config/jwt.config';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { LoginUserDto } from './dto/login-user.dto';
import { UserRepository } from '../user/user.repository';
import { UserEntity } from '../user/user.entity';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { UserNotRegisteredException, UserPasswordWrongException } from '@fit-friends/core';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly refreshTokenService: RefreshTokenService,
    @Inject (jwtConfig.KEY) private readonly config: ConfigType<typeof jwtConfig>,
  ) {}

  public async verifyUser({email, password}: LoginUserDto) {
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new UserNotRegisteredException(email);
    }

    const userEntity = new UserEntity(existUser);

    if (! await userEntity.comparePassword(password)) {
      throw new UserPasswordWrongException();
    }

    return userEntity.toObject();
  }

  public async loginUser(user: Pick<User, '_id' | 'email' | 'role' | 'name'>, refreshTokenId?: string): Promise<LoggedUserRdo> {
    const payload: TokenPayload = {
      id: user._id,
      email: user.email,
      role: user.role,
      name: user.name
    };

    await this.refreshTokenService.deleteRefreshSession(refreshTokenId);

    const refreshTokenPayload: RefreshTokenPayload = {
      ...payload, refreshTokenId: randomUUID()
    }

    await this.refreshTokenService.createRefreshSession(refreshTokenPayload);

    return {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken: await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.config.refreshSecret,
        expiresIn: this.config.refreshExpiresIn,
      })
    };
  }

  public async logout(refreshTokenId: string) {
    await this.refreshTokenService.deleteRefreshSession(refreshTokenId);
  }
}
