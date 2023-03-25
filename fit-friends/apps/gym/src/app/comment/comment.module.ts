import { Module } from '@nestjs/common';

import { CommentController } from './comment.controller';
import { CommentRepository } from './comment.repository';
import { CommentService } from './comment.service';

@Module({
  controllers: [CommentController],
  providers: [CommentRepository, CommentService]
})
export class CommentModule {}
