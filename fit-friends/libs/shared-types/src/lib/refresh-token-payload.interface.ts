import { TokenPayload } from '@fit-friends/shared-types';

export interface RefreshTokenPayload extends TokenPayload {
  refreshTokenId: string;
}
