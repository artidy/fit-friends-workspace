import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class NotificationRdo {
  @ApiProperty({
    description: 'Уникальный идентификатор оповещения',
    example: '507f1f77bcf86cd799439011'
  })
  @Expose({name: '_id'})
  public id: string;

  @ApiProperty({
    description: 'Уникальный идентификатор пользователя',
    example: '507f1f77bcf86cd799439011'
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'Текст оповещения',
    example: 'Новая тренировка'
  })
  @Expose()
  public text: string;

  @ApiProperty({
    description: 'Дата создания оповещения',
    example: '2023-03-22'
  })
  @Expose()
  public createdAt: Date;
}
