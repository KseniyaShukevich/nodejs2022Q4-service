import { v4 as uuidv4 } from 'uuid';

import InMemoryStorage from '../database/InMemoryStorage';
import { AlbumDto } from './dto/album.dto';
import { Album } from './albums.model';

export class AlbumRepository {
  private database: InMemoryStorage<Album>;

  constructor() {
    this.database = new InMemoryStorage();
  }

  public async create(albumDto: AlbumDto): Promise<Album> {
    const album = new Album(
      uuidv4(),
      albumDto.name,
      albumDto.year,
      albumDto.artistId,
    );

    await this.database.add(album);

    return album;
  }

  public async getAll(): Promise<Album[]> {
    const albums = await this.database.getAll();

    return albums;
  }

  public async findById(id: string): Promise<Album | undefined> {
    const album = await this.database.findBy('id', id);

    return album;
  }

  public async findAll(
    key: keyof Album,
    value: any,
  ): Promise<Album[] | undefined> {
    const albums = await this.database.findAll(key, value);

    return albums;
  }

  public async update(
    id: string,
    albumDto: AlbumDto,
  ): Promise<Album | undefined> {
    const findedAlbum = await this.database.findBy('id', id);

    if (!findedAlbum) {
      return undefined;
    }

    const albumUpdated = new Album(
      id,
      albumDto.name,
      albumDto.year,
      albumDto.artistId,
    );

    const album = await this.database.update('id', id, albumUpdated);

    return album;
  }

  public async delete(id: string): Promise<Album | undefined> {
    const album = await this.database.remove('id', id);

    return album;
  }
}
