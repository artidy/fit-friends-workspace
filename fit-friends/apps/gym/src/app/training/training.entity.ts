import { Entity } from '@fit-friends/core';
import {
  Duration,
  Training,
  TrainingGender,
  TrainingLevel,
  TrainingType
} from '@fit-friends/shared-types';

export class TrainingEntity implements Entity<Training>, Training {
  id: number;
  title: string;
  preview: string;
  level: string;
  type: string;
  duration: string;
  price: number;
  calories: number;
  description: string;
  gender: string;
  video: string;
  coachId: string;
  isSpecial: boolean;
  createdAt: Date;

  constructor(training: Training) {
    this.fillEntity(training);
  }

  fillEntity(entity: Training) {
    this.id = entity.id;
    this.title = entity.title;
    this.preview = entity.preview;
    this.level = entity.level;
    this.type = entity.type;
    this.duration = entity.duration;
    this.price = entity.price;
    this.calories = entity.calories;
    this.description = entity.description;
    this.gender = entity.gender;
    this.video = entity.video;
    this.coachId = entity.coachId;
    this.isSpecial = entity.isSpecial;
  }

  toObject(): Training {
    return { ...this };
  }
}
