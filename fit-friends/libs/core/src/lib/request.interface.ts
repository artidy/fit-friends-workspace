import { Request } from 'express';
import { UserRequest } from '@fit-friends/shared-types';

export interface ExtendedRequest extends Request {
  user: UserRequest | undefined;
}
