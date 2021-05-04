import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Character } from "@domain/entities/Character";
import { RedisConfig } from "@src/config/RedisConfig";
import { MongoConfig } from "@src/config/MongoConfig";
import { CharactersHttpClient } from "@infrastructure/http/CharactersHttpClient";
import { AmqpCharactersPublisherConfiguration } from "@infrastructure/amqp/config/AmqpCharactersPublisherConfiguration";
import { PublisherCharacterEvent } from "@infrastructure/amqp/PublisherCharacterEvent";

const modules = [
  RedisConfig.load(),
  MongoConfig.load(),
  TypeOrmModule.forFeature([ Character ])
];

@Module({
  providers: [
    CharactersHttpClient,
    PublisherCharacterEvent,
  ],
  imports: [
    AmqpCharactersPublisherConfiguration.register(),
    ...modules,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    })
  ],
  controllers: [
  ],
  exports: [
    ...modules,
    CharactersHttpClient,
    PublisherCharacterEvent
  ]
})

export class InfrastructureModule { }
