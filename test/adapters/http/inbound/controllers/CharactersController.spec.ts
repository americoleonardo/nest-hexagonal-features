import { Test } from '@nestjs/testing';

import { CharactersController } from "@src/adapters";
import { CharactersService } from "@domain/services";
import { Character } from "@domain/entities";
import { CacheModule } from "@nestjs/common";

const mockCharacter = () => ({
  url: "https://anapioficeandfire.com/api/characters/583",
  name: "Jon Snow",
  gender: "Male",
  culture: "Northmen",
  titles: [
    "Lord Commander of the Night's Watch"
  ],
  aliases: [
    "Lord Crow"
  ],
  father: "",
  mother: "",
  spouse: "",
  allegiances: [
    "https://anapioficeandfire.com/api/houses/362"
  ],
  books: [
    "https://anapioficeandfire.com/api/books/5"
  ],
  povBooks: [
    "https://anapioficeandfire.com/api/books/1"
  ],
  tvSeries: [
    "Season 1"
  ],
  playedBy: [
    "Kit Harington"
  ],
  id: "6076fd3c2571de3aab1f6dfb"
});

const characterObject = new Character(
    "https://anapioficeandfire.com/api/characters/583",
    "Jon Snow",
    "Male",
    "Northmen",
    [
      "Lord Commander of the Night's Watch"
    ],
    [
      "Lord Crow"
    ],
    "",
    "",
    "",
    [
      "https://anapioficeandfire.com/api/houses/362"
    ],
    [
      "https://anapioficeandfire.com/api/books/5"
    ],
    [
      "https://anapioficeandfire.com/api/books/1",
    ],
    [
      "Season 1",
    ],
    "Kit Harington"
);

describe('adapters :: http :: inbound :: controllers :: CharacterController', () => {
  let charactersController: CharactersController;
  let charactersService: CharactersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ CacheModule.register() ],
      controllers: [ CharactersController ],
      providers: [
        CharactersService,
        {
          provide: 'CharacterRepository',
          useValue: () => ({})
        },
        {
          provide: 'CharactersHttpClient',
          useValue: () => ({})
        },
        {
          provide: 'PublisherCharacterEvent',
          useValue: () => ({})
        }
      ],
    }).compile();

    charactersService = moduleRef.get<CharactersService>(CharactersService);
    charactersController = moduleRef.get<CharactersController>(CharactersController);
  });

  describe('listById()', () => {
    test('should return a character', async () => {
      const fakeCharacter = mockCharacter() as any;

      jest.spyOn(charactersService, 'listById').mockImplementationOnce(() => fakeCharacter);

      expect(await charactersController.listById("6076fd3c2571de3aab1f6dfb" as any)).toBe(fakeCharacter);
    });

    test('should throw if invoke throws', async () => {
      jest.spyOn(charactersService, 'listById').mockImplementationOnce(() => null);

      const promise = charactersController.listById("asds" as any);

      await expect(promise).rejects.toThrow();
    });
  });

  describe('create()', () => {
    test('should create a character', async () => {
      const fakeCharacter = mockCharacter() as any;
      jest.spyOn(charactersService, 'create').mockImplementationOnce(() => fakeCharacter);

      expect(await charactersController.create(mockCharacter() as any)).toBe(fakeCharacter);
    });

    test('should throw if invoke throws', async () => {
      const fakeCharacter = mockCharacter() as any;
      jest.spyOn(charactersService, 'create').mockImplementationOnce(() => { throw new Error() });

      const promise = charactersController.create(fakeCharacter);

      await expect(promise).rejects.toThrow();
    });
  });

  describe('createRandomCharacter()', () => {
    test('should publish a character in RabbitMQ', async () => {
      const fakeCharacter = mockCharacter() as any;
      jest.spyOn(charactersService, 'listExtenalRandomCharacter').mockImplementationOnce(() => fakeCharacter);

      jest.spyOn(charactersService, 'publishRandomCharacter').mockImplementationOnce(() => { return undefined });

      expect(await charactersController.createRandomCharacter()).toBeTruthy();
    });

    test('should throw if invoke throws', async () => {
      jest.spyOn(charactersService, 'create').mockImplementationOnce(() => { throw new Error() });

      const promise = charactersController.createRandomCharacter();

      await expect(promise).rejects.toThrow();
    });
  });
});