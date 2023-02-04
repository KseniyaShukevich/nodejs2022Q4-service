import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { FavoritesRepository } from './favorites.repository';
import { ERROR_MESSAGE } from 'src/errors/errors.message';
import { TrackService } from 'src/tracks/tracks.service';
import { AlbumService } from 'src/albums/albums.service';
import { FavoritesResponse } from './response/favorites-response.interface';
import { ArtistService } from 'src/artists/artists.service';
import { Favorites } from './favorites.model';

@Injectable()
export class FavoritesService {
  constructor(
    private favoritesRepository: FavoritesRepository,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
  ) {}

  async getFavorites(): Promise<FavoritesResponse> {
    const [favorites] = await this.favoritesRepository.getAll();

    const artists = await Promise.all(
      favorites.artists.map((id) => this.artistService.getArtistById(id)),
    );

    const albums = await Promise.all(
      favorites.albums.map((id) => this.albumService.getAlbumById(id)),
    );

    const tracks = await Promise.all(
      favorites.tracks.map((id) => this.trackService.getTrackById(id)),
    );

    const favoritesResponse = { artists, albums, tracks };

    return favoritesResponse;
  }

  async addToFavorites(key: keyof Favorites, id: string) {
    switch (key) {
      case 'artists':
        await this.artistService.validateArtistId(id);
        break;
      case 'albums':
        await this.albumService.validateAlbumId(id);
        break;
      case 'tracks':
        await this.trackService.validateTrackId(id);
        break;
    }

    const [favorites] = await this.favoritesRepository.getAll();

    if (!favorites[key].includes(id)) {
      favorites[key].push(id);
    }

    return favorites;
  }

  async deleteFromFavorites(key: keyof Favorites, id: string) {
    const [favorites] = await this.favoritesRepository.getAll();
    const isFavorite = favorites[key].includes(id);

    if (!isFavorite) {
      throw new HttpException(
        ERROR_MESSAGE.DOES_NOT_EXIST_IN_FAVORITES,
        HttpStatus.NOT_FOUND,
      );
    }

    favorites[key] = favorites[key].filter((item) => item !== id);
  }
}
