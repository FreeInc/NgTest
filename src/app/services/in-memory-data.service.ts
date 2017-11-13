import { InMemoryDbService } from 'angular-in-memory-web-api';
import { HEROES } from '../entities/mock-heroes';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = HEROES;
    return {heroes};
  }
}
