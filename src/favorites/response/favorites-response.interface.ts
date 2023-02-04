import { Album } from 'src/albums/albums.model';
import { Artist } from 'src/artists/artists.model';
import { Track } from 'src/tracks/tracks.model';

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
