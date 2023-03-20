import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class GymFavoriteRdo {
  @ApiProperty({
    description: 'Идентификатор позиции списка избранного.',
    required: true,
    example: '507f191e810c19729de860ea'
  })
  @Transform(({ obj }) => obj._id.toString())
  @Expose({ name: '_id'})
  public id: string;

  @ApiProperty({
    description: 'Идентификатор зала.',
    required: true,
    example: 1
  })
  @Expose()
  public gymId: number;
}
