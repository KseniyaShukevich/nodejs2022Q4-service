import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { AlbumRepository } from './albums.repository';
import { ERROR_MESSAGE } from 'src/errors/errors.message';
import { TrackService } from 'src/tracks/tracks.service';
import { AlbumDto } from './dto/album.dto';
import { Album } from './albums.model';
import { ArtistService } from 'src/artists/artists.service';
import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class AlbumService {
  constructor(
    private albumRepository: AlbumRepository,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
  ) {}

  async getAlbums() {
    const albums = await this.albumRepository.getAll();

    return albums;
  }

  async getAlbumById(id: string) {
    const album = await this.albumRepository.findById(id);

    if (!album) {
      throw new HttpException(
        ERROR_MESSAGE.ALBUM_DOES_NOT_EXIST,
        HttpStatus.NOT_FOUND,
      );
    }

    return album;
  }

  async setToNullInAlbums(key: keyof Album, value: any) {
    const albums = await this.albumRepository.findAll(key, value);

    await Promise.all(
      albums.map((album) =>
        this.albumRepository.update(album.id, { ...album, [key]: null }),
      ),
    );
  }

  async createAlbum(dto: AlbumDto) {
    if (dto.artistId) {
      await this.artistService.validateArtistId(dto.artistId);
    }

    const album = await this.albumRepository.create(dto);

    return album;
  }

  async updateAlbum(id: string, dto: AlbumDto) {
    const findedAlbum = await this.albumRepository.findById(id);

    if (!findedAlbum) {
      throw new HttpException(
        ERROR_MESSAGE.ALBUM_DOES_NOT_EXIST,
        HttpStatus.NOT_FOUND,
      );
    }

    if (dto.artistId) {
      await this.artistService.validateArtistId(dto.artistId);
    }

    const album = await this.albumRepository.update(id, dto);

    return album;
  }

  async validateAlbumId(id: string) {
    const album = await this.albumRepository.findById(id);

    if (!album) {
      throw new HttpException(
        ERROR_MESSAGE.ALBUM_DOES_NOT_EXIST,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return album;
  }

  async deleteAlbum(id: string) {
    const album = await this.albumRepository.delete(id);

    if (!album) {
      throw new HttpException(
        ERROR_MESSAGE.ALBUM_DOES_NOT_EXIST,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.trackService.setToNullInTracks('albumId', id);
    await this.favoritesService.clearFavorites('albums', id);
  }
}
