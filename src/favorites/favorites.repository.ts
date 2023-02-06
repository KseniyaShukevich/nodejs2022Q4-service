import InMemoryStorage from '../database/InMemoryStorage';
import { Favorites } from './favorites.model';

export class FavoritesRepository {
  private database: InMemoryStorage<Favorites>;

  constructor() {
    this.create();
  }

  private async create(): Promise<void> {
    const database = new InMemoryStorage<Favorites>();
    const favorites = new Favorites([], [], []);

    await database.add(favorites);
    this.database = database;
  }

  public async getAll(): Promise<Favorites[]> {
    const favorites = await this.database.getAll();

    return favorites;
  }
}
