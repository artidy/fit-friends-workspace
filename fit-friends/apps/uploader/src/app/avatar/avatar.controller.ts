import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { AVATAR_TYPES, AvatarSettings, fillObject, MongoidValidationPipe, UrlPaths } from '@fit-friends/core';

import { AvatarService } from './avatar.service';
import { AvatarRdo } from './rdo/avatar.rdo';
import { getMulterConfig } from '../../config/multer.config';
import { getFilePipe } from '../helpers';

@ApiTags(UrlPaths.Avatars)
@Controller(UrlPaths.Avatars)
export class AvatarController {
  constructor(
    private readonly avatarService: AvatarService
  ) {}

  @ApiResponse({
    status: HttpStatus.OK, description: 'Данные успешно получены'
  })
  @Get('/:id')
  public async index(@Param('id') id: string) {
    const url = await this.avatarService.getAvatarUrl(id);

    return fillObject(AvatarRdo, { url });
  }

  @ApiResponse({
    status: HttpStatus.CREATED, description: 'Данные успешно добавлены'
  })
  @Post('/:id')
  @UseInterceptors(FileInterceptor(
    AvatarSettings.FieldName,
    getMulterConfig(AvatarSettings.Directory, AvatarSettings.MaxSize)))
  public async create(
    @Param('id', MongoidValidationPipe) id: string,
    @UploadedFile(getFilePipe(AVATAR_TYPES)) avatar: Express.Multer.File
  ) {
    const fileName = avatar.filename;
    await this.avatarService.add(id, fileName);
    const url = await this.avatarService.getAvatarUrl(id);

    return fillObject(AvatarRdo, { url });
  }

  @ApiResponse({
    status: HttpStatus.OK, description: 'Данные успешно обновлены'
  })
  @Patch('/:id')
  @UseInterceptors(FileInterceptor(
    AvatarSettings.FieldName,
    getMulterConfig(AvatarSettings.Directory, AvatarSettings.MaxSize)))
  public async update(
    @Param('id') id: string,
    @UploadedFile(getFilePipe(AVATAR_TYPES)) avatar: Express.Multer.File
  ) {
    const fileName = avatar.filename;
    await this.avatarService.change(id, fileName);
    const url = await this.avatarService.getAvatarUrl(id);

    return fillObject(AvatarRdo, { url });
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT, description: 'Данные успешно удалены'
  })
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id') id: string) {
    return this.avatarService.delete(id);
  }
}
