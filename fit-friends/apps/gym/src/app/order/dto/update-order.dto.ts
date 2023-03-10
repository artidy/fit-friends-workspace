import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, Max, Min } from 'class-validator';
import { PaymentType } from '@fit-friends/shared-types';
import { CountLength, DtoValidationMessage, PriceLength } from '@fit-friends/core';

export class UpdateOrderDto {
  @ApiProperty({
    description: 'Стоимость приобретаемой тренировки.',
    required: false,
    example: PriceLength.Max
  })
  @IsOptional()
  @Min(PriceLength.Min, {
    message: DtoValidationMessage.TooLowNumber
  })
  @Max(PriceLength.Max, {
    message: DtoValidationMessage.TooHighNumber
  })
  price?: number;

  @ApiProperty({
    description: 'Количество приобретаемых тренировок.',
    required: false,
    example: CountLength.Max
  })
  @IsOptional()
  @Min(CountLength.Min, {
    message: DtoValidationMessage.TooLowNumber
  })
  @Max(CountLength.Max, {
    message: DtoValidationMessage.TooHighNumber
  })
  count?: number;

  @ApiProperty({
    description: 'Вариант оплаты заказа.',
    required: false,
    example: PaymentType.Mir
  })
  @IsOptional()
  @IsEnum(PaymentType)
  paymentType?: PaymentType;
}
