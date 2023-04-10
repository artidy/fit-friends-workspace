import { CoachProfile, TrainingLevel, TrainingType } from '@fit-friends/shared-types';

export class CoachProfileEntity implements CoachProfile {
  public _id: string;
  public userId: string;
  public level: TrainingLevel;
  public types: TrainingType[];
  public certificate: string;
  public merits: string;
  public isPersonalTraining: boolean;

  constructor(coachProfile: CoachProfile) {
    this.fillEntity(coachProfile);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(entity: CoachProfile): void {
    this._id = entity._id;
    this.userId = entity.userId;
    this.level = entity.level;
    this.types = entity.types;
    this.certificate = entity.certificate;
    this.merits = entity.merits;
    this.isPersonalTraining = entity.isPersonalTraining;
  }
}
