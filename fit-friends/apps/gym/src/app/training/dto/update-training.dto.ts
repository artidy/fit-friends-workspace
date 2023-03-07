import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsIn, IsInt, IsOptional, IsString, Length, Max, Min } from 'class-validator';
import { CaloriesLength, DescriptionLength, DtoValidationMessage, PriceLength, TitleLength } from '@fit-friends/core';
import {
  Duration,
  TRAINING_LEVELS,
  TRAINING_TYPES,
  TrainingGender,
  TrainingLevel,
  TrainingType
} from '@fit-friends/shared-types';

export class UpdateTrainingDto {
  @ApiProperty({
    description: 'Название тренировки.',
    required: false,
    example: 'Фитнес'
  })
  @IsOptional()
  @Length(TitleLength.Min, TitleLength.Max, {
    message: DtoValidationMessage.IncorrectLength
  })
  title?: string

  @ApiProperty({
    description: 'Уровень пользователя, на которого рассчитана тренировка.',
    required: false,
    example: TRAINING_LEVELS[0]
  })
  @IsOptional()
  @IsIn(TRAINING_LEVELS, {
    message: DtoValidationMessage.ArrayIsNotContains
  })
  level?: TrainingLevel;

  @ApiProperty({
    description: 'Тип тренировки.',
    required: false,
    example: TRAINING_TYPES[0]
  })
  @IsOptional()
  @IsIn(TRAINING_TYPES, {
    message: DtoValidationMessage.ArrayIsNotContains
  })
  type?: TrainingType;

  @ApiProperty({
    description: 'Продолжительность тренировки в минутах.',
    required: false,
    example: Duration.Short
  })
  @IsOptional()
  @IsEnum(Duration)
  duration?: Duration;

  @ApiProperty({
    description: 'Стоимость тренировки в рублях.',
    required: false,
    example: PriceLength.Max
  })
  @IsOptional()
  @IsInt({
    message: DtoValidationMessage.IsNotInteger
  })
  price?: number;

  @ApiProperty({
    description: 'Количество калорий.',
    required: false,
    example: CaloriesLength.Max
  })
  @IsOptional()
  @Min(CaloriesLength.Min, {
    message: DtoValidationMessage.TooLowNumber
  })
  @Max(CaloriesLength.Max, {
    message: DtoValidationMessage.TooHighNumber
  })
  calories?: number;

  @ApiProperty({
    description: 'Описание тренировки.',
    required: false,
    example: 'На протяжении тренировки у вас появится прилив сил.'
  })
  @IsOptional()
  @Length(DescriptionLength.Min, DescriptionLength.Max, {
    message: DtoValidationMessage.IncorrectLength
  })
  description?: string;

  @ApiProperty({
    description: 'Пол пользователя для которого предназначена тренировка.',
    required: false,
    example: TrainingGender.Male
  })
  @IsOptional()
  @IsEnum(TrainingGender, {
    message: DtoValidationMessage.ArrayIsNotContains
  })
  gender?: TrainingGender;

  @ApiProperty({
    description: 'Видео файл с демонстрацией тренировки.',
    required: false
  })
  @IsOptional()
  @IsString({
    message: DtoValidationMessage.IsEmpty
  })
  video?: string;

  @ApiProperty({
    description: 'Флаг определяет участие тренировки (участвует, не участвует) в качестве специального предложения.',
    example: true,
    default: false,
  })
  @IsOptional()
  isSpecial?: boolean;
}
