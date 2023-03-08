import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class LoggedUserRdo {
  @ApiProperty({
    description: 'Идентификатор пользователя.',
    required: true,
    example: '507f191e810c19729de860ea'
  })
  @Transform(({ obj }) => obj._id.toString())
  @Expose({ name: '_id'})
  public id: string;

  @ApiProperty({
    description: 'Адрес электронной почты, используется в качестве имени пользователя (логин).',
    required: true,
    example: 'example@mail.com'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'Токен доступа к закрытой части сайта.',
    required: true,
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  })
  @Expose()
  public accessToken: string;

  @ApiProperty({
    description: 'Токен обновления для токена доступа.',
    required: true,
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  })
  @Expose()
  public refreshToken: string;
}
