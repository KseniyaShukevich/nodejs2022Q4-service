import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ArtistRepository } from './artists.repository';
import { ERROR_MESSAGE } from 'src/errors/errors.message';
import { ArtistDto } from './dto/artist.dto';
import { TrackService } from 'src/tracks/tracks.service';
import { AlbumService } from 'src/albums/albums.service';
import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class ArtistService {
  constructor(
    private artistRepository: ArtistRepository,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
  ) {}

  async getArtists() {
    const artists = await this.artistRepository.getAll();

    return artists;
  }

  async getArtistById(id: string) {
    const artist = await this.artistRepository.findById(id);

    if (!artist) {
      throw new HttpException(
        ERROR_MESSAGE.ARTIST_DOES_NOT_EXIST,
        HttpStatus.NOT_FOUND,
      );
    }

    return artist;
  }

  async createArtist(dto: ArtistDto) {
    const artist = await this.artistRepository.create(dto);

    return artist;
  }

  async updateArtist(id: string, dto: ArtistDto) {
    const findedArtist = await this.artistRepository.findById(id);

    if (!findedArtist) {
      throw new HttpException(
        ERROR_MESSAGE.ARTIST_DOES_NOT_EXIST,
        HttpStatus.NOT_FOUND,
      );
    }

    const artist = await this.artistRepository.update(id, dto);

    return artist;
  }

  async validateArtistId(id: string) {
    const artist = await this.artistRepository.findById(id);

    if (!artist) {
      throw new HttpException(
        ERROR_MESSAGE.ARTIST_DOES_NOT_EXIST,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return artist;
  }

  async deleteArtist(id: string) {
    const artist = await this.artistRepository.delete(id);

    if (!artist) {
      throw new HttpException(
        ERROR_MESSAGE.ARTIST_DOES_NOT_EXIST,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.trackService.setToNullInTracks('artistId', id);
    await this.albumService.setToNullInAlbums('artistId', id);
    await this.favoritesService.clearFavorites('artists', id);
  }
}
