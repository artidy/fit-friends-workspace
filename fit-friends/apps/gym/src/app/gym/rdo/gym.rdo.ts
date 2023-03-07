import { Expose } from 'class-transformer';

export class GymRdo {
  @Expose()
  public id: number;

  @Expose()
  public title: string;

  @Expose()
  public location: string;

  @Expose()
  public isVerified: boolean;

  @Expose()
  public parameters: string[];

  @Expose()
  public photos: string[];

  @Expose()
  public description: string;

  @Expose()
  public price: number;

  @Expose()
  public createdAt: Date;
}
