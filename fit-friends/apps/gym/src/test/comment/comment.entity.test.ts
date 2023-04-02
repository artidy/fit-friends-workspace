import { CommentEntity } from '../../app/comment/comment.entity';
import { TEST_COMMENT } from './const';

describe('CommentEntity', () => {
  const commentEntity = new CommentEntity(TEST_COMMENT);

  it('should create an instance', () => {
    expect(commentEntity).toBeTruthy();
  });

  it('should have correct properties', () => {
    expect(commentEntity.id).toEqual(TEST_COMMENT.id);
    expect(commentEntity.text).toEqual(TEST_COMMENT.text);
    expect(commentEntity.rating).toEqual(TEST_COMMENT.rating);
    expect(commentEntity.authorId).toEqual(TEST_COMMENT.authorId);
    expect(commentEntity.trainingId).toEqual(TEST_COMMENT.trainingId);
  });

  it('should return correct object', () => {
    expect(commentEntity.toObject()).toEqual(TEST_COMMENT);
  });
});
