import { Avatar, AvatarApi } from '../../types/avatar';

export function avatarAdapt(avatar: AvatarApi): Avatar {
  return {
    ...avatar
  }
}
