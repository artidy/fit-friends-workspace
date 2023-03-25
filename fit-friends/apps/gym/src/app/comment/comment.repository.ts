import { Injectable } from '@nestjs/common';
import { Comment, TrainingAverageRating } from '@fit-friends/shared-types';

import { PrismaService } from '../prisma/prisma.service';
import { CommentEntity } from './comment.entity';

@Injectable()
export class CommentRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async findByAuthorId(authorId: string): Promise<Comment[]> {
    return this.prisma.comment.findMany({ where: { authorId }});
  }

  public async findByTrainingId(trainingId: number): Promise<Comment[]> {
    return this.prisma.comment.findMany({ where: { trainingId }});
  }

  public async findById(id: number): Promise<Comment|null> {
    return this.prisma.comment.findFirst({ where: { id }});
  }

  public async create(commentEntity: CommentEntity): Promise<Comment> {
    const comment = commentEntity.toObject();

    return this.prisma.comment.create({
      data: { ...comment }
    });
  }

  public async getAverageRatingByTrainingId(trainingId: number): Promise<TrainingAverageRating> {
    const trainingRating = await this.prisma.comment.aggregate({
      where: { trainingId },
      _avg: {
        rating: true
      }
    });

    return {
      trainingId,
      averageRating: trainingRating._avg.rating
    };
  }

  public async getAverageRating(): Promise<TrainingAverageRating[]> {
    const ratings = await this.prisma.comment.groupBy({
      by: ['trainingId'],
      _avg: {
        rating: true
      }
    });

    return ratings.map((rating) => ({
      trainingId: rating.trainingId,
      averageRating: rating._avg.rating
    }));
  }
}
