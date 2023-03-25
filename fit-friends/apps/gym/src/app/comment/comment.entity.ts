import { Comment } from '@fit-friends/shared-types';
import { Entity } from '@fit-friends/core';

export class CommentEntity implements Entity<Comment>, Comment {
  id: number;
  authorId: string;
  trainingId: number;
  rating: number;
  text: string;

  constructor(comment: Comment) {
    this.fillEntity(comment);
  }

  fillEntity(entity: Comment) {
    this.id = entity.id;
    this.authorId = entity.authorId;
    this.trainingId = entity.trainingId;
    this.rating = entity.rating;
    this.text = entity.text;
  }

  toObject(): Comment {
    return { ...this };
  }
}
