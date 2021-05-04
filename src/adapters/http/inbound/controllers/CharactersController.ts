import {
  ApiBody,
  ApiTags,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNoContentResponse
} from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  NotFoundException,
  InternalServerErrorException,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { CharactersService } from "@domain/services";
import { CharacterDto } from "@src/adapters/http/inbound/dto";
import { ParseObjectIdPipe } from "@domain/criteria/validators/pipes/ParseObjectIdPipes";
import { ObjectID } from "typeorm";
import { Character } from "@domain/entities/Character";

const BASE_RESOURCE = `/v1/characters`;

@ApiTags('chatacters')
@Controller(`${BASE_RESOURCE}`)
export class CharactersController {
  constructor(
    private readonly charactersService: CharactersService
  ) {}

  @ApiOkResponse({ description: "Created character", type: CharacterDto})
  @ApiNotFoundResponse({ description: 'Character #id not found' })
  @Get('/:chatacter_id')
  public async listById(@Param('chatacter_id', ParseObjectIdPipe) id: ObjectID): Promise<Character> {
    const character = await this.charactersService.listById(id)

    if (!character) {
      throw new NotFoundException(`Character ${id} not found`);
    }

    return character;
  }

  @ApiCreatedResponse({ description: "Returns character", type: CharacterDto})
  @ApiBody({ type: CharacterDto })
  @Post("/")
  public async create(@Body() body: CharacterDto): Promise<any> {
    try {
      return await this.charactersService.create(body);
    } catch (e) {
      throw new InternalServerErrorException("Internal error");
    }
  }

  @ApiBody({ type: CharacterDto })
  @ApiNoContentResponse({ description: 'Message queued' })
  @Post("/random")
  @HttpCode(HttpStatus.NO_CONTENT)
  public async createRandomCharacter(): Promise<any> {
    try {
      const character = await this.charactersService.listExtenalRandomCharacter();

      await this.charactersService.publishRandomCharacter(character);

      return true;
    } catch (e) {
      throw new InternalServerErrorException("Internal error");
    }
  }
}
