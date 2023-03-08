import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { Location, LOCATIONS, UserGender, UserRole } from '@fit-friends/shared-types';

export class UserRdo {
  @ApiProperty({
    description: 'Идентификатор пользователя.',
    required: true,
    example: '507f191e810c19729de860ea'
  })
  @Transform(({ obj }) => obj._id.toString())
  @Expose({ name: '_id'})
  public id: string;

  @ApiProperty({
    description: 'Имя пользователя.',
    required: true,
    example: 'Иван'
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: 'Адрес электронной почты, используется в качестве имени пользователя (логин).',
    required: true,
    example: 'example@mail.com'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'Пол.',
    required: true,
    example: UserGender.Female
  })
  @Expose()
  public gender: UserGender;

  @ApiProperty({
    description: 'Дата рождения.',
    required: false,
    example: '23.03.1985'
  })
  @Expose()
  public birthDate?: Date;

  @ApiProperty({
    description: 'Роль пользователя.',
    required: true,
    example: UserRole.User
  })
  @Expose()
  public role: UserRole;

  @ApiProperty({
    description: 'Локация. Станция метро.',
    required: true,
    example: LOCATIONS[0]
  })
  @Expose()
  public location: Location;

  @ApiProperty({
    description: 'Дата регистрации.',
    required: true,
    example: '20230211'
  })
  @Expose()
  public createdAt: Date;
}
