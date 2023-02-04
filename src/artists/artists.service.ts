import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ArtistRepository } from './artists.repository';
import { ERROR_MESSAGE } from 'src/errors/errors.message';
import { ArtistDto } from './dto/artist.dto';

@Injectable()
export class ArtistService {
  constructor(private artistRepository: ArtistRepository) {}

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
    const findedUser = await this.artistRepository.findById(id);

    if (!findedUser) {
      throw new HttpException(
        ERROR_MESSAGE.ARTIST_DOES_NOT_EXIST,
        HttpStatus.NOT_FOUND,
      );
    }

    const artist = await this.artistRepository.update(id, dto);

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
  }
}
