import { ApiProperty } from '@nestjs/swagger';
import { OrderType, PaymentType } from '@fit-friends/shared-types';
import { CountLength, PriceLength } from '@fit-friends/core';
import { Expose } from 'class-transformer';

export class OrderRdo {
  @ApiProperty({
    description: 'Идентификатор заказа.',
    required: true,
    example: 1
  })
  @Expose()
  public id: number;

  @ApiProperty({
    description: 'Вид покупки.',
    required: true,
    example: OrderType.Subscription
  })
  @Expose()
  public type: OrderType;

  @ApiProperty({
    description: 'Идентификатор тренировки или абонемента в зал.',
    required: true,
    example: 1
  })
  @Expose()
  public serviceId: number;

  @ApiProperty({
    description: 'Стоимость приобретаемой тренировки.',
    required: true,
    example: PriceLength.Max
  })
  @Expose()
  public price: number;

  @ApiProperty({
    description: 'Количество приобретаемых тренировок.',
    required: true,
    example: CountLength.Max
  })
  @Expose()
  public count: number;

  @ApiProperty({
    description: 'Общая сумма приобретаемых тренировок.',
    required: true,
    example: 10000
  })
  @Expose()
  public sum: number;

  @ApiProperty({
    description: 'Вариант оплаты заказа.',
    required: true,
    example: PaymentType.Mir
  })
  @Expose()
  public paymentType: PaymentType;

  @ApiProperty({
    description: 'Дата создания заказа.',
    required: true,
    example: '2023-03-25'
  })
  @Expose()
  public createdAt: Date;
}
