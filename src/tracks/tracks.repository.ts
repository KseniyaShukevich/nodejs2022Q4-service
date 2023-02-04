import { v4 as uuidv4 } from 'uuid';

import InMemoryStorage from '../database/InMemoryStorage';
import { TrackDto } from './dto/track.dto';
import { Track } from './tracks.model';

export class TrackRepository {
  private database: InMemoryStorage<Track>;

  constructor() {
    this.database = new InMemoryStorage();
  }

  public async create(trackDto: TrackDto): Promise<Track> {
    const track = new Track(
      uuidv4(),
      trackDto.name,
      trackDto.artistId,
      trackDto.albumId,
      trackDto.duration,
    );

    await this.database.add(track);

    return track;
  }

  public async getAll(): Promise<Track[]> {
    const tracks = await this.database.getAll();

    return tracks;
  }

  public async findById(id: string): Promise<Track | undefined> {
    const track = await this.database.findBy('id', id);

    return track;
  }

  public async findAll(
    key: keyof Track,
    value: any,
  ): Promise<Track[] | undefined> {
    const artists = await this.database.findAll(key, value);

    return artists;
  }

  public async update(
    id: string,
    trackDto: TrackDto,
  ): Promise<Track | undefined> {
    const findedTrack = await this.database.findBy('id', id);

    if (!findedTrack) {
      return undefined;
    }

    const trackUpdated = new Track(
      id,
      trackDto.name,
      trackDto.artistId || null,
      trackDto.albumId || null,
      trackDto.duration,
    );

    const track = await this.database.update('id', id, trackUpdated);

    return track;
  }

  public async delete(id: string): Promise<Track | undefined> {
    const track = await this.database.remove('id', id);

    return track;
  }
}
