import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Headers,
  Param, Delete, UploadedFile, UseInterceptors
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AvatarSettings, UrlPaths } from '@fit-friends/core';
import FormData from 'form-data';

import { AvatarsService } from './avatars.service';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags(UrlPaths.Avatars)
@Controller(UrlPaths.Avatars)
export class AvatarsController {
  constructor(private readonly avatarsService: AvatarsService) {}

  @ApiResponse({
    status: HttpStatus.OK, description: 'Вы успешно получили данные'
  })
  @Get(':userId')
  @HttpCode(HttpStatus.OK)
  public async getByUserId(@Param('userId') userId: string, @Headers() headers) {
    return this.avatarsService.getByUserId(userId, headers);
  }

  @ApiResponse({
    status: HttpStatus.CREATED, description: 'Вы успешно загрузили данные'
  })
  @Post(':userId')
  @UseInterceptors(FileInterceptor(AvatarSettings.FieldName))
  @HttpCode(HttpStatus.CREATED)
  public async uploadFile(@UploadedFile() uploadData, @Headers() headers, @Param('userId') userId: string) {
    const avatarPath = await this.avatarsService.getByUserId(userId, headers);

    const formData = new FormData();
    formData.append('avatar', uploadData.buffer, {
      filename: uploadData.originalname,
      contentType: uploadData.mimeType
    });

    headers = {
      'Authorization': headers.Authorization,
      'Content-Type': `multipart/form-data; boundary=${formData.getBoundary()}`,
    }

    console.log(avatarPath.url);

    return avatarPath.url !== '' ? await this.avatarsService.update(userId, formData, headers) :
      await this.avatarsService.create(userId, formData, headers);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT, description: 'Аватар успешно удален'
  })
  @Delete(':userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('userId') userId: string, @Headers() headers) {
    return this.avatarsService.delete(userId, headers);
  }
}
