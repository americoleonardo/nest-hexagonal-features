import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { CharactersService } from "@domain/services";
import { CharactersController } from "@adapters/http/inbound/controllers/CharactersController";
import { AmqpConsumer } from "@adapters/amqp/AmqpConsumer";
import { InfrastructureModule } from "@src/config/InfrastructureModule";
import { LoggerMiddleware } from "@infrastructure/logger/LoggerMiddleware";

const providers = [
  CharactersService
];

@Module({
  imports: [
    InfrastructureModule
  ],
  controllers: [
    CharactersController,
    AmqpConsumer
  ],
  exports: providers,
  providers,
})

export class CharactersModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
