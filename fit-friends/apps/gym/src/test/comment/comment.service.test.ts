import { Test, TestingModule } from '@nestjs/testing';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { TrainingAverageRating } from '@fit-friends/shared-types';

import { TEST_COMMENT } from './const';
import { CommentRepository } from '../../app/comment/comment.repository';
import { CommentService } from '../../app/comment/comment.service';
import { CommentEntity } from '../../app/comment/comment.entity';

describe('CommentService', () => {
  let repository: DeepMockProxy<CommentRepository>;
  let service: CommentService;

  beforeEach(async () => {
    repository = mockDeep<CommentRepository>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentRepository, CommentService]
    })
      .overrideProvider(CommentRepository)
      .useValue(repository)
      .compile();

    service = module.get<CommentService>(CommentService);
  });

  describe('findByAuthorId', () => {
    it('should return comments filtered by authorId', async () => {
      repository.findByAuthorId.mockReturnValue(Promise.resolve([TEST_COMMENT]));
      const result = await service.findByAuthorId(TEST_COMMENT.authorId);

      expect(result).toContain(TEST_COMMENT);
      expect(repository.findByAuthorId).toHaveBeenCalledWith(TEST_COMMENT.authorId);
    });
  });

  describe('findByTrainingId', () => {
    it('should return comments filtered by trainingId', async () => {
      repository.findByTrainingId.mockReturnValue(Promise.resolve([TEST_COMMENT]));
      const result = await service.findByTrainingId(TEST_COMMENT.trainingId);

      expect(result).toContain(TEST_COMMENT);
      expect(repository.findByTrainingId).toHaveBeenCalledWith(TEST_COMMENT.trainingId);
    });
  });

  describe('findById', () => {
    it('should return comment by id', async () => {
      repository.findById.mockReturnValue(Promise.resolve(TEST_COMMENT));
      const result = await service.findById(TEST_COMMENT.id);

      expect(result).toEqual(TEST_COMMENT);
      expect(repository.findById).toHaveBeenCalledWith(TEST_COMMENT.id);
    });
  });

  describe('create', () => {
    it('should create and return new comment', async () => {
      repository.create.mockReturnValue(Promise.resolve(TEST_COMMENT));

      const result = await service.create(
        TEST_COMMENT.authorId,
        TEST_COMMENT.trainingId,
        {
          text: TEST_COMMENT.text,
          rating: TEST_COMMENT.rating
      });

      expect(result).toEqual(TEST_COMMENT);
      expect(repository.create).toHaveBeenCalledWith(new CommentEntity({
        text: TEST_COMMENT.text,
        rating: TEST_COMMENT.rating,
        authorId: TEST_COMMENT.authorId,
        trainingId: TEST_COMMENT.trainingId
      }));
    });
  });

  describe('getAverageRating', () => {
    it('should get average rating for all trainings', async () => {
      const averageData: TrainingAverageRating = {
        trainingId: TEST_COMMENT.trainingId,
        averageRating: TEST_COMMENT.rating
      }
      repository.getAverageRating.mockReturnValue(Promise.resolve([averageData]));

      const result = await service.getAverageRating();

      expect(result).toContain(averageData);
      expect(repository.getAverageRating).toHaveBeenCalled();
    });
  });

  describe('getAverageRatingByTrainingId', () => {
    it('should get average rating by trainingId', async () => {
      const averageData: TrainingAverageRating = {
        trainingId: TEST_COMMENT.trainingId,
        averageRating: TEST_COMMENT.rating
      }
      repository.getAverageRatingByTrainingId.mockReturnValue(Promise.resolve(averageData));

      const result = await service.getAverageRatingByTrainingId(TEST_COMMENT.trainingId);

      expect(result).toEqual(averageData);
      expect(repository.getAverageRatingByTrainingId).toHaveBeenCalledWith(TEST_COMMENT.trainingId);
    });
  });
});
