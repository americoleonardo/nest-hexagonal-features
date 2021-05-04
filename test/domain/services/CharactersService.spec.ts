import { Test } from '@nestjs/testing';

import { CharactersService } from "@domain/services";
import { Character } from "@domain/entities";
import { CACHE_MANAGER, CacheModule } from "@nestjs/common";

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

const rawHttpCharacter = () => ({
  status: 200,
  statusText: 'OK',
  headers: {
    date: 'Tue, 20 Apr 2021 00:58:31 GMT',
    'content-type': 'application/json; charset=utf-8',
    'transfer-encoding': 'chunked',
    connection: 'close',
    'set-cookie': [
      '__cfduid=de6e3b6122a794473deb9a25bd54104081618880311; expires=Thu, 20-May-21 00:58:31 GMT; path=/; domain=.anapioficeandfire.com; HttpOnly; SameSite=Lax'
    ],
    vary: 'Accept-Encoding',
    'x-powered-by': 'ASP.NET',
    'cache-control': 'max-age=14400',
    'cf-cache-status': 'MISS',
    'cf-request-id': '098e6248310000622099078000000001',
    'expect-ct': 'max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"',
    'report-to': '{"endpoints":[{"url":"https:\\/\\/a.nel.cloudflare.com\\/report?s=J4aOjDt6PvSGWgH9gNfJix6ndBarl4YOLzCBvjgVs%2FP%2F9cNUA4gyTRUATD2PfvWNJdDuttV0jzpPtDgZchypYpbcL1o29xZHgc9EI8nTn9%2F4MoLYPQI%3D"}],"group":"cf-nel","max_age":604800}',
    nel: '{"max_age":604800,"report_to":"cf-nel"}',
    server: 'cloudflare',
    'cf-ray': '642a6cb9ecab6220-MIA',
    'alt-svc': 'h3-27=":443"; ma=86400, h3-28=":443"; ma=86400, h3-29=":443"; ma=86400'
  },
  data: {
    id: "123456",
    url: 'https://anapioficeandfire.com/api/characters/553',
    name: 'Jeyne Goodbrook',
    gender: 'Female',
    culture: '',
    born: 'In 293 AC',
    died: '',
    titles: [ '' ],
    aliases: [ '' ],
    father: '',
    mother: '',
    spouse: '',
    allegiances: [ 'https://anapioficeandfire.com/api/houses/151' ],
    books: [
      'https://anapioficeandfire.com/api/books/2',
      'https://anapioficeandfire.com/api/books/3',
      'https://anapioficeandfire.com/api/books/5'
    ],
    povBooks: [],
    tvSeries: [ '' ],
    playedBy: [ '' ]
  }
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

const findOne = jest.fn(async data => (characterObject));
const save = jest.fn(async data => (characterObject));
const characterRepositoryStub = () => ({
  findOne,
  save
})

const listById = jest.fn(async id => (rawHttpCharacter() as any));
const characterHttpClientStub = () => ({
  listById
});


const publish = jest.fn(async data => (true));
const publisherCharacterEventStub = () => ({
  publish
});

describe('domain :: services :: CharacterService', () => {
  let charactersService: CharactersService;
  let characterRepository: any;
  let cacheManager: any;
  let characterHttpClient: any;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ CacheModule.register() ],
      providers: [
        CharactersService,
        {
          provide: 'CharacterRepository',
          useValue: characterRepositoryStub()
        },
        {
          provide: 'CharactersHttpClient',
          useValue: characterHttpClientStub()
        },
        {
          provide: 'PublisherCharacterEvent',
          useValue: publisherCharacterEventStub()
        }
      ],
    }).compile();
    charactersService = moduleRef.get<CharactersService>(CharactersService);
    characterRepository = characterRepositoryStub();
    characterHttpClient = characterHttpClientStub();
    cacheManager = moduleRef.get<any>(CACHE_MANAGER);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });


  describe('Run test suite', () => {
    test('cache should be available', () => {
      expect(cacheManager).toBeDefined();
    });

    test('should return a character without cache', async () => {
      const listCharacterByIdSpy = jest.spyOn(characterRepository, 'findOne');

      const data = await charactersService.listById("any_id");

      expect(data).toBeInstanceOf(Character);

      expect(listCharacterByIdSpy).toHaveBeenCalledWith('any_id');
    });

    test('should store a null character with inside cache', async () => {
      jest.spyOn(characterRepository, 'findOne').mockImplementationOnce(() => undefined);

      const data = await charactersService.listById("any_id");

      expect(data).toBe(null);
    });


    test('should list an external and random character', async () => {
      const result = await charactersService.listExtenalRandomCharacter();

      const { data } = rawHttpCharacter();


      expect(result).toEqual(data);
    });

    test('should create a new character', async () => {
      const data = await charactersService.create(rawHttpCharacter());

      expect(data).toBeInstanceOf(Character);
    });

    test('should restore a character from cache', async () => {
      const data = await charactersService.create(rawHttpCharacter());

      const cache = await charactersService.listById("1234");

      expect(data).toEqual(cache);
    });

    test('should publish a message on RabbitMQ broker', async () => {
      const data = await charactersService.publishRandomCharacter(rawHttpCharacter());

      expect(data).toBeTruthy();
    });
  });
});