import { ApiProperty } from '@nestjs/swagger';
import { IsIn, Length, Max, Min } from 'class-validator';
import { LOCATIONS } from '@fit-friends/shared-types';
import { DescriptionLength, DtoValidationMessage, PriceLength, TitleLength } from '@fit-friends/core';

export class CreateGymDto {
  @ApiProperty({
    description: 'Название спортивного зала.',
    required: true,
    example: 'Спортзал Атлант'
  })
  @Length(TitleLength.Min, TitleLength.Max, {
    message: DtoValidationMessage.IncorrectLength
  })
  title: string

  @ApiProperty({
    description: 'Локация. Станция метро.',
    required: true,
    example: 'Петроградская'
  })
  @IsIn(LOCATIONS, {
    message: DtoValidationMessage.ArrayIsNotContains
  })
  location: string;

  @ApiProperty({
    description: 'Верифицированный зал. Признак, что зал проверен.',
    example: true,
    default: false,
  })
  isVerified?: boolean;

  @ApiProperty({
    description: 'Идентификаторы дополнительных удобств представленных в зале',
    required: true,
    example: [1, 5, 2]
  })
  parameters: number[];

  @ApiProperty({
    description: 'Описание спортивного зала.',
    required: true,
    example: 'Современные тренажеры и большое количество тренеров.'
  })
  @Length(DescriptionLength.Min, DescriptionLength.Max, {
    message: DtoValidationMessage.IncorrectLength
  })
  description: string;

  @ApiProperty({
    description: 'Стоимость одной тренировки.',
    required: true,
    example: PriceLength.Max
  })
  @Min(PriceLength.Min, {
    message: DtoValidationMessage.TooLowNumber
  })
  @Max(PriceLength.Max, {
    message: DtoValidationMessage.TooHighNumber
  })
  price: number;
}
