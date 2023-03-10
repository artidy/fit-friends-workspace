import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, Max, Min } from 'class-validator';
import { LOCATIONS, OrderType, PaymentType } from '@fit-friends/shared-types';
import { CountLength, DtoValidationMessage, PriceLength } from '@fit-friends/core';

export class CreateOrderDto {
  @ApiProperty({
    description: 'Вид покупки.',
    required: true,
    example: OrderType.Subscription
  })
  @IsEnum(OrderType)
  type: OrderType;

  @ApiProperty({
    description: 'Идентификатор тренировки или абонемента в зал.',
    required: true,
    example: 1
  })
  @IsInt({
    message: DtoValidationMessage.IsNotInteger
  })
  serviceId: number;

  @ApiProperty({
    description: 'Стоимость приобретаемой тренировки.',
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

  @ApiProperty({
    description: 'Количество приобретаемых тренировок.',
    required: true,
    example: CountLength.Max
  })
  @Min(CountLength.Min, {
    message: DtoValidationMessage.TooLowNumber
  })
  @Max(CountLength.Max, {
    message: DtoValidationMessage.TooHighNumber
  })
  count: number;

  @ApiProperty({
    description: 'Вариант оплаты заказа.',
    required: true,
    example: PaymentType.Mir
  })
  @IsEnum(PaymentType)
  paymentType: PaymentType;
}
