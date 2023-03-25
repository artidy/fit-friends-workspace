import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { Auth, fillObject, User } from '@fit-friends/core';
import { UserRequest, UserRole } from '@fit-friends/shared-types';

import { CommentService } from './comment.service';
import { CommentRdo } from './rdo/comment.rdo';
import { TrainingAverageRatingRdo } from './rdo/training-average-rating.rdo';
import { CreateCommentDto } from './dto/create-comment.dto';

@ApiTags('comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiResponse({
    status: HttpStatus.OK, description: 'Данные успешно получены'
  })
  @Get('/:trainingId')
  public async index(@Param('trainingId') trainingId: number) {
    const comments = this.commentService.findByTrainingId(trainingId);

    return fillObject(CommentRdo, comments);
  }

  @ApiResponse({
    status: HttpStatus.OK, description: 'Данные успешно получены'
  })
  @Auth(UserRole.User)
  @Get('/')
  public async getUserComments(@User() user: UserRequest) {
    const comments = this.commentService.findByAuthorId(user.id);

    return fillObject(CommentRdo, comments);
  }

  @ApiResponse({
    status: HttpStatus.CREATED, description: 'Данные успешно добавлены'
  })
  @Auth(UserRole.User)
  @Post('/:trainingId')
  public async create(@User() user: UserRequest,
                      @Param('trainingId') trainingId: number,
                      @Body() dto: CreateCommentDto) {
    const comment = await this.commentService.create(user.id, trainingId, dto);

    return fillObject(CommentRdo, comment);
  }

  @ApiResponse({
    status: HttpStatus.OK, description: 'Данные успешно получены'
  })
  @Get('/rating/average')
  public async getAverageRating() {
    const averageRating = this.commentService.getAverageRating();

    return fillObject(TrainingAverageRatingRdo, averageRating);
  }

  @ApiResponse({
    status: HttpStatus.OK, description: 'Данные успешно получены'
  })
  @Get('/rating/average/:trainingId')
  public async getAverageRatingByTrainingId(@Param('trainingId') trainingId: number) {
    const averageRating = this.commentService.getAverageRatingByTrainingId(trainingId);

    return fillObject(TrainingAverageRatingRdo, averageRating);
  }
}
