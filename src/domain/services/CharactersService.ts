import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Character } from "@domain/entities/Character";
import { PublisherCharacterEventRepository } from "@domain/repositories/Characters/PublisherCharacterEventRepository";
import { CharactersRepository } from "@domain/repositories/Characters/CharactersRepository";

const CACHE_IN_SECONDS = 3600;

@Injectable()
export class CharactersService {
  constructor(
    @Inject("CharacterRepository")
    private characterRepository: CharactersRepository,
    @Inject(CACHE_MANAGER)
    private cacheManager: any,
    @Inject("CharactersHttpClient")
    private charactersHttpClient,
    @Inject("PublisherCharacterEvent")
    private charactersMessagePublisher: PublisherCharacterEventRepository
  ) { }

  public async listById(id: any): Promise<Character> {
    let character = await this.retrieveFromCache(id);

    if (character) {
      return character;
    }

    character = await this.characterRepository.findOne(id);

    character = !character ? null : character;

    await this.storeCache(id, character);
    character = await this.retrieveFromCache(id);

    return character;
  }

  public async listExtenalRandomCharacter(): Promise<Character> {
    const id = Math.floor((Math.random() * 600) + 1);

    const { data } = await this.charactersHttpClient.listById(id);

    return data;
  }

  public async create(data: any): Promise<Character> {
    const {
      url,
      name,
      gender,
      culture,
      titles,
      aliases,
      father,
      mother,
      spouse,
      allegiances,
      books,
      povBooks,
      tvSeries,
      playedBy
    } = data;

    const character = new Character(
      url,
      name,
      gender,
      culture,
      titles,
      aliases,
      father,
      mother,
      spouse,
      allegiances,
      books,
      povBooks,
      tvSeries,
      playedBy);

    let rs = await this.characterRepository.save(character);

    await this.storeCache(rs.id ? rs.id.toString() : "1234", rs);

    return rs;
  }

  public async publishRandomCharacter(data: any): Promise<any> {
    return this.charactersMessagePublisher.publish(data);
  }

  private async storeCache(key: any, value: any): Promise<Character> {
    return await this.cacheManager.set(key, value, { ttl: CACHE_IN_SECONDS });
  }

  private async retrieveFromCache(key: any): Promise<any> {
    return await this.cacheManager.get(key);
  }
}