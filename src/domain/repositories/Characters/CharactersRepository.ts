import { Character } from "@domain/entities/Character";

export interface CharactersRepository {
  findOne: (id: string) => Promise<any>;
  save: (character: Character) => Promise<any>;
}
