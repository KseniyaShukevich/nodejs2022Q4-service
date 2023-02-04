import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { TrackRepository } from './tracks.repository';
import { ERROR_MESSAGE } from 'src/errors/errors.message';
import { TrackDto } from './dto/track.dto';
import { ArtistService } from 'src/artists/artists.service';
import { AlbumService } from 'src/albums/albums.service';
import { Track } from './tracks.model';

@Injectable()
export class TrackService {
  constructor(
    private trackRepository: TrackRepository,
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
  ) {}

  async getTracks() {
    const tracks = await this.trackRepository.getAll();

    return tracks;
  }

  async getTrackById(id: string) {
    const track = await this.trackRepository.findById(id);

    if (!track) {
      throw new HttpException(
        ERROR_MESSAGE.TRACK_DOES_NOT_EXIST,
        HttpStatus.NOT_FOUND,
      );
    }

    return track;
  }

  async setToNullInTracks(key: keyof Track, value: any) {
    const tracks = await this.trackRepository.findAll(key, value);

    tracks.forEach(async (track) => {
      await this.trackRepository.update(track.id, { ...track, [key]: null });
    });
  }

  async createTrack(dto: TrackDto) {
    if (dto.artistId) {
      await this.artistService.validateArtistId(dto.artistId);
    }

    if (dto.albumId) {
      await this.albumService.validateAlbumId(dto.albumId);
    }

    const track = await this.trackRepository.create(dto);

    return track;
  }

  async updateTrack(id: string, dto: TrackDto) {
    const findedTrack = await this.trackRepository.findById(id);

    if (!findedTrack) {
      throw new HttpException(
        ERROR_MESSAGE.TRACK_DOES_NOT_EXIST,
        HttpStatus.NOT_FOUND,
      );
    }

    if (dto.artistId) {
      await this.artistService.validateArtistId(dto.artistId);
    }

    if (dto.albumId) {
      await this.albumService.validateAlbumId(dto.albumId);
    }

    const track = await this.trackRepository.update(id, dto);

    return track;
  }

  async deleteTrack(id: string) {
    const track = await this.trackRepository.delete(id);

    if (!track) {
      throw new HttpException(
        ERROR_MESSAGE.TRACK_DOES_NOT_EXIST,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
