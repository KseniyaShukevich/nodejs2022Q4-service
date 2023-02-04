import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
  UsePipes,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { TrackDto } from './dto/track.dto';
import { TrackService } from './tracks.service';

@Controller('/api')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get('/track')
  getAll() {
    return this.trackService.getTracks();
  }

  @Get('/track/:id')
  getById(@Param('id') id: string) {
    return this.trackService.getTrackById(id);
  }

  @UsePipes(ValidationPipe)
  @Post('/track')
  create(@Body() trackDto: TrackDto) {
    return this.trackService.createTrack(trackDto);
  }

  @UsePipes(ValidationPipe)
  @Put('/track/:id')
  update(@Param('id') id: string, @Body() trackDto: TrackDto) {
    return this.trackService.updateTrack(id, trackDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/track/:id')
  delete(@Param('id') id: string) {
    return this.trackService.deleteTrack(id);
  }
}
