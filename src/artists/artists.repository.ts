import { v4 as uuidv4 } from 'uuid';

import InMemoryStorage from '../database/InMemoryStorage';
import { ArtistDto } from './dto/artist.dto';
import { Artist } from './artists.model';

export class ArtistRepository {
  private database: InMemoryStorage<Artist>;

  constructor() {
    this.database = new InMemoryStorage();
  }

  public async create(artistDto: ArtistDto): Promise<Artist> {
    const artist = new Artist(uuidv4(), artistDto.name, artistDto.grammy);

    await this.database.add(artist);

    return artist;
  }

  public async getAll(): Promise<Artist[]> {
    const artists = await this.database.getAll();

    return artists;
  }

  public async findById(id: string): Promise<Artist | undefined> {
    const artist = await this.database.findBy('id', id);

    return artist;
  }

  public async update(
    id: string,
    artistDto: ArtistDto,
  ): Promise<Artist | undefined> {
    const findedArtist = await this.database.findBy('id', id);

    if (!findedArtist) {
      return undefined;
    }

    const artistUpdated = new Artist(id, artistDto.name, artistDto.grammy);
    const artist = await this.database.update('id', id, artistUpdated);

    return artist;
  }

  public async delete(id: string): Promise<Artist | undefined> {
    const artist = await this.database.remove('id', id);

    return artist;
  }
}
