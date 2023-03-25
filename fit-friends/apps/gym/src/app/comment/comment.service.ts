import { Injectable } from '@nestjs/common';
import { Comment, TrainingAverageRating } from '@fit-friends/shared-types';

import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentEntity } from './comment.entity';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  public async findByAuthorId(authorId: string): Promise<Comment[]> {
    return this.commentRepository.findByAuthorId(authorId);
  }

  public async findByTrainingId(trainingId: number): Promise<Comment[]> {
    return this.commentRepository.findByTrainingId(trainingId);
  }

  public async findById(id: number): Promise<Comment|null> {
    return this.commentRepository.findById(id);
  }

  public async create(userId: string, trainingId: number, dto: CreateCommentDto): Promise<Comment> {

    return this.commentRepository.create(new CommentEntity({
      ...dto,
      authorId: userId,
      trainingId
    }));
  }

  public async getAverageRating(): Promise<TrainingAverageRating[]> {
    return this.commentRepository.getAverageRating();
  }

  public async getAverageRatingByTrainingId(trainingId: number): Promise<TrainingAverageRating> {
    return this.commentRepository.getAverageRatingByTrainingId(trainingId);
  }
}
