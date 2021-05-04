import { Test } from '@nestjs/testing';
import { CacheModule, HttpModule, HttpService } from "@nestjs/common";
import { CharactersHttpClient } from "@infrastructure/http/CharactersHttpClient";
import { of } from "rxjs";

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

const httpServiceStub = () => ({
  get: jest.fn(() => of(rawHttpCharacter() as any))
});

const configServiceStub = () => ({
  get: jest.fn(async param => ("" as any))
});

describe('infrastructure :: http :: CharactersHttpClient', () => {
  let charactersHttpClient: CharactersHttpClient;
  let httpService: HttpService;


  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ CacheModule.register(), HttpModule ],
      providers: [
        CharactersHttpClient,
        {
          provide: 'HttpService',
          useValue: httpServiceStub()
        },
        {
          provide: 'ConfigService',
          useValue: configServiceStub()
        }
      ],
    }).compile();

    charactersHttpClient = moduleRef.get<CharactersHttpClient>(CharactersHttpClient);
    httpService = moduleRef.get<HttpService>(HttpService);
  });


  describe('listById()', () => {
    test('should list a character via http client', async () => {
      const data = await charactersHttpClient.listById("any_id");

      expect(data).toEqual(rawHttpCharacter())
    });
  });
});