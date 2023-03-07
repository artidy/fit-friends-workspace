import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, Length, Max, Min } from 'class-validator';
import { LOCATIONS } from '@fit-friends/shared-types';
import { DescriptionLength, DtoValidationMessage, PriceLength, TitleLength } from '@fit-friends/core';

export class UpdateGymDto {
  @ApiProperty({
    description: 'Название спортивного зала.',
    required: false,
    example: 'Спортзал Атлант'
  })
  @IsOptional()
  @Length(TitleLength.Min, TitleLength.Max, {
    message: DtoValidationMessage.IncorrectLength
  })
  title?: string

  @ApiProperty({
    description: 'Локация. Станция метро.',
    required: false,
    example: 'Петроградская'
  })
  @IsOptional()
  @IsIn(LOCATIONS, {
    message: DtoValidationMessage.ArrayIsNotContains
  })
  location?: string;

  @ApiProperty({
    description: 'Верифицированный зал. Признак, что зал проверен.',
    example: true,
    default: false,
  })
  @IsOptional()
  isVerified?: boolean;

  @ApiProperty({
    description: 'Идентификаторы дополнительных удобств представленных в зале',
    required: false,
    example: [1, 5, 2]
  })
  @IsOptional()
  parameters?: number[];

  @ApiProperty({
    description: 'Описание спортивного зала.',
    required: false,
    example: 'Современные тренажеры и большое количество тренеров.'
  })
  @IsOptional()
  @Length(DescriptionLength.Min, DescriptionLength.Max, {
    message: DtoValidationMessage.IncorrectLength
  })
  description?: string;

  @ApiProperty({
    description: 'Стоимость одной тренировки.',
    required: false,
    example: PriceLength.Max
  })
  @IsOptional()
  @Min(PriceLength.Min, {
    message: DtoValidationMessage.TooLowPrice
  })
  @Max(PriceLength.Max, {
    message: DtoValidationMessage.TooHighPrice
  })
  price?: number;
}
