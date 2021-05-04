import { EntityRepository, Repository } from "typeorm";
import { Character } from "@domain/entities/Character";

@EntityRepository(Character)
export class CharacterRepository extends Repository<Character> {
}