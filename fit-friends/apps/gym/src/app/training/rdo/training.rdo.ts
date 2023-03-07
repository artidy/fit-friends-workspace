import { Expose } from 'class-transformer';
import { Duration, TrainingGender, TrainingLevel, TrainingType } from '@fit-friends/shared-types';

export class TrainingRdo {
  @Expose()
  public id: number;

  @Expose()
  public title: string;

  @Expose()
  public level: TrainingLevel;

  @Expose()
  public type: TrainingType;

  @Expose()
  public duration: Duration;

  @Expose()
  public price: number;

  @Expose()
  public calories: number;

  @Expose()
  public description: string;

  @Expose()
  public gender: TrainingGender;

  @Expose()
  public video: string;

  @Expose()
  public isSpecial: boolean;

  @Expose()
  public coachId: string;

  @Expose()
  public comments: number[];
}
