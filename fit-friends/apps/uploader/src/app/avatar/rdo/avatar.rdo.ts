import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class AvatarRdo {
  @ApiProperty({
    description: 'Адрес аватарки пользователя',
    example: 'files/path'
  })
  @Expose()
  public url: string;
}
