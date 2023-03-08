import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsEnum, IsIn, IsOptional, Length } from 'class-validator';
import { DtoValidationMessage, PasswordLength, TitleLength } from '@fit-friends/core';
import { Location, LOCATIONS, UserGender, UserRole } from '@fit-friends/shared-types';

export class CreateUserDto {
  @ApiProperty({
    description: 'Имя пользователя.',
    required: true,
    example: 'Иван'
  })
  @Length(
    TitleLength.Min,
    TitleLength.Max,
    {
      message: DtoValidationMessage.IncorrectLength
    })
  name: string;

  @ApiProperty({
    description: 'Адрес электронной почты, используется в качестве имени пользователя (логин).',
    required: true,
    example: 'example@mail.com'
  })
  @IsEmail(
    {},
    {
      message: DtoValidationMessage.IncorrectEmail
    })
  email: string;

  @ApiProperty({
    description: 'Пароль пользователя.',
    required: true,
    example: '123456789'
  })
  @Length(
    PasswordLength.Min,
    PasswordLength.Max,
    {
      message: DtoValidationMessage.IncorrectLength
    }
  )
  password: string;

  @ApiProperty({
    description: 'Пол.',
    required: true,
    example: UserGender.Female
  })
  @IsEnum(UserGender, {
    message: DtoValidationMessage.ArrayIsNotContains
  })
  gender: UserGender;

  @ApiProperty({
    description: 'Дата рождения.',
    required: true,
    example: '23.03.1985'
  })
  @IsOptional()
  @IsDate({
    message: DtoValidationMessage.IsNotDate
  })
  birthDate?: Date;

  @ApiProperty({
    description: 'Роль пользователя.',
    required: true,
    example: UserRole.User
  })
  @IsEnum(UserRole, {
    message: DtoValidationMessage.ArrayIsNotContains
  })
  role: UserRole;

  @ApiProperty({
    description: 'Локация. Станция метро.',
    required: true,
    example: LOCATIONS[0]
  })
  @IsIn(LOCATIONS, {
    message: DtoValidationMessage.ArrayIsNotContains
  })
  location: Location;
}
