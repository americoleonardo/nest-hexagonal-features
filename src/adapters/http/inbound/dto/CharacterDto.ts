import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, MaxLength } from 'class-validator';

export class CharacterDto {
  @IsString()
  @ApiProperty({
    example: '6063d0da0d9ae43b8720da8b',
    description: 'Auto generated id',
  })
  @MaxLength(100)
  @IsOptional()
  id: string;

  @IsString()
  @ApiProperty({
    example: 'https://anapioficeandfire.com/api/characters/583',
    description: 'Character uri',
  })
  @MaxLength(200)
  @IsOptional()
  url: any;

  @IsString()
  @ApiProperty({
    example: 'Jon Snow',
    description: 'Character name',
  })
  @MaxLength(100)
  @IsOptional()
  name: any;

  @IsString()
  @ApiProperty({
    example: 'Male',
    description: 'Character gender',
  })
  @MaxLength(10)
  @IsOptional()
  private gender: any;

  @IsString()
  @ApiProperty({
    example: 'Northmen',
    description: 'Character culture',
  })
  @MaxLength(100)
  @IsOptional()
  private culture: any;

  @IsArray()
  @ApiProperty({
    example: '[Chatacter titles]',
    description: 'Character titles',
  })
  @IsOptional()
  private titles: any;

  @IsArray()
  @ApiProperty({
    example: 'Lord snow',
    description: 'Character aliases',
  })
  @IsOptional()
  private aliases: any;

  @IsString()
  @ApiProperty({
    example: 'Targaryen',
    description: 'Father name',
  })
  @MaxLength(100)
  @IsOptional()
  private father?: any;

  @IsString()
  @ApiProperty({
    example: 'Liana Stark',
    description: 'mother name',
  })
  @MaxLength(100)
  @IsOptional()
  private mother?: any;


  @IsString()
  @ApiProperty({
    example: '',
    description: 'Spouse name',
  })
  @MaxLength(100)
  @IsOptional()
  private spouse?: any;

  @IsArray()
  @ApiProperty({
    example: '',
    description: 'House allegiances',
  })
  @IsOptional()
  private allegiances: any;

  @IsArray()
  @ApiProperty({
    example: '',
    description: 'Book versions',
  })
  @IsOptional()
  private books: any;

  @IsArray()
  @ApiProperty({
    example: '',
    description: 'Pov books version',
  })
  @IsOptional()
  private povBooks: any;

  @IsArray()
  @ApiProperty({
    example: 'Season 1',
    description: 'Tv series season',
  })
  @IsOptional()
  private tvSeries: any;

  @IsArray()
  @ApiProperty({
    example: 'Kit Harington',
    description: 'Played by',
  })
  @IsOptional()
  private playedBy?: any;
}
