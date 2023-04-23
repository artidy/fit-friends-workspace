import { Transform } from 'class-transformer';
import { IsArray, IsEnum, IsIn, IsNumber, IsOptional } from 'class-validator';

import { DEFAULT_TRAINING_COUNT_LIMIT } from '../../app.constant';
import {
  Duration,
  TRAINING_LEVELS,
  TrainingGender,
  TrainingLevel,
  TrainingType
} from '@fit-friends/shared-types';
import { DtoValidationMessage } from '@fit-friends/core';

export class TrainingQuery {
  @Transform(({ value }) => +value || DEFAULT_TRAINING_COUNT_LIMIT)
  @IsNumber({}, {
    message: DtoValidationMessage.IsNotInteger
  })
  @IsOptional()
  public limit = DEFAULT_TRAINING_COUNT_LIMIT;

  @Transform(({ value }) => value)
  @IsIn(TRAINING_LEVELS, {
    message: DtoValidationMessage.ArrayIsNotContains
  })
  @IsOptional()
  public level?: TrainingLevel;

  @Transform(({ value }) => value.split(','))
  @IsArray()
  @IsOptional()
  public types?: TrainingType[];

  @Transform(({ value }) => value)
  @IsEnum(TrainingGender)
  @IsOptional()
  public gender?: TrainingGender;

  @Transform(({ value }) => value)
  @IsEnum(Duration)
  @IsOptional()
  public duration?: Duration;

  @Transform(({ value }) => +value)
  @IsNumber()
  @IsOptional()
  public minPrice?: number;

  @Transform(({ value }) => +value)
  @IsNumber()
  @IsOptional()
  public maxPrice?: number;

  @Transform(({ value }) => +value)
  @IsNumber()
  @IsOptional()
  public calories: number;

  @Transform(({ value }) => +value)
  @IsNumber()
  @IsOptional()
  public page: number;
}
