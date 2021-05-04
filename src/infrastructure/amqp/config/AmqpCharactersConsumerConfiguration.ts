import { ConfigService } from "@nestjs/config";
import { RmqOptions, Transport } from "@nestjs/microservices";

export class AmqpCharactersConsumerConfiguration {
  static register(configService: ConfigService): RmqOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: this.getConnectionUri(configService),
        queue: configService.get('infrastructure.amqp.queues.charactersToCreate'),
        noAck: false,
        prefetchCount: 1,
      }
    };
  }

  private static getConnectionUri(configService: ConfigService): string[] {
    const amqpConfig = configService.get('infrastructure.amqp');

    return [`amqp://${amqpConfig.userAndPass}@${amqpConfig.hostAndPort}`];
  }
}
