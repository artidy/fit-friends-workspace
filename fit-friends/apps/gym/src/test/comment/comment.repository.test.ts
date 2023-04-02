import { Test, TestingModule } from '@nestjs/testing';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { prismaMock, PrismaMockType } from '@fit-friends/core';

import { PrismaService } from '../../app/prisma/prisma.service';
import { CommentRepository } from '../../app/comment/comment.repository';
import { CommentEntity } from '../../app/comment/comment.entity';
import { TEST_COMMENT } from './const';

describe('CommentRepository', () => {
  let commentRepository: CommentRepository;
  let prismaService: PrismaMockType;
  let commentEntity: DeepMockProxy<CommentEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, CommentRepository]
    })
      .overrideProvider(PrismaService)
      .useValue(prismaMock)
      .compile();

    commentRepository = module.get<CommentRepository>(CommentRepository);
    prismaService = module.get<PrismaMockType>(PrismaService);
    commentEntity = mockDeep<CommentEntity>();
  });

  describe('findByAuthorId', () => {
    it('should return comments filtered by authorId', async () => {
      prismaService.comment.findMany.mockReturnValue([TEST_COMMENT]);
      const result = await commentRepository.findByAuthorId(TEST_COMMENT.authorId);

      expect(result).toContain(TEST_COMMENT);
      expect(prismaService.comment.findMany).toHaveBeenCalledWith({
        where: {
          authorId: TEST_COMMENT.authorId
        }
      });
    });
  });

  describe('findByTrainingId', () => {
    it('should return comments filtered by trainingId', async () => {
      prismaService.comment.findMany.mockReturnValue([TEST_COMMENT]);
      const result = await commentRepository.findByTrainingId(TEST_COMMENT.trainingId);

      expect(result).toContain(TEST_COMMENT);
      expect(prismaService.comment.findMany).toHaveBeenCalledWith({
        where: {
          trainingId: TEST_COMMENT.trainingId
        }
      });
    });
  });

  describe('findById', () => {
    it('should return comment by id', async () => {
      prismaService.comment.findFirst.mockReturnValue(TEST_COMMENT);
      const result = await commentRepository.findById(TEST_COMMENT.id);

      expect(result).toEqual(TEST_COMMENT);
      expect(prismaService.comment.findFirst).toHaveBeenCalledWith({
        where: {
          id: TEST_COMMENT.id
        }
      });
    });
  });

  describe('create', () => {
    it('should create and return new comment', async () => {
      commentEntity.toObject.mockReturnValue(TEST_COMMENT);
      prismaService.comment.create.mockReturnValue(TEST_COMMENT);

      const result = await commentRepository.create(commentEntity);

      expect(result).toEqual(TEST_COMMENT);
      expect(prismaService.comment.create).toHaveBeenCalledWith({
        data: { ...commentEntity.toObject() }
      });
    });
  });

  describe('getAverageRatingByTrainingId', () => {
    it('should get average rating from comments by trainingId', async () => {
      prismaService.comment.aggregate.mockReturnValue({
        _avg: {
          rating: TEST_COMMENT.rating
        }
      });
      const result = await commentRepository.getAverageRatingByTrainingId(TEST_COMMENT.trainingId);

      expect(result).toEqual({
        trainingId: TEST_COMMENT.trainingId,
        averageRating: TEST_COMMENT.rating
      });
      expect(prismaService.comment.aggregate).toHaveBeenCalledWith({
        where: { trainingId: TEST_COMMENT.trainingId },
        _avg: {
          rating: true
        }
      });
    });
  });

  describe('getAverageRating', () => {
    it('should get average rating from comments', async () => {
      const averageContent = {
        trainingId: TEST_COMMENT.trainingId,
        _avg: {
          rating: TEST_COMMENT.rating
        }
      };

      prismaService.comment.groupBy.mockReturnValue([averageContent]);
      const result = await commentRepository.getAverageRating();

      expect(result).toEqual([{
        trainingId: averageContent.trainingId,
        averageRating: averageContent._avg.rating,
      }]);
      expect(prismaService.comment.groupBy).toHaveBeenCalledWith({
        by: ['trainingId'],
        _avg: {
          rating: true
        }
      });
    });
  });
});
