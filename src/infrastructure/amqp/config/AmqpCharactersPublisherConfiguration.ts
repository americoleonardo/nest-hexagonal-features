import { DynamicModule } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientOptions, ClientProxyFactory, Transport } from "@nestjs/microservices";

export class AmqpCharactersPublisherConfiguration {
  static register(): DynamicModule {
    return {
      module: AmqpCharactersPublisherConfiguration,
      providers: [
        this.charactersToCreatePublisher()
      ],
      imports: [
        ConfigService
      ],
      exports: [
        'CharactersToCreatePublisher'
      ]
    };
  }

  private static charactersToCreatePublisher() {
    return {
      inject: [ ConfigService ],
      provide: 'CharactersToCreatePublisher',
      useFactory: (configService: ConfigService) => {
        const amqpOptions: ClientOptions = {
          transport: Transport.RMQ,
          options: {
            urls: this.getConnectionUri(configService),
            queue: configService.get('infrastructure.amqp.queues.charactersToCreate'),
          }
        };

        return ClientProxyFactory.create(amqpOptions);
      }
    };
  }

  private static getConnectionUri(configService: ConfigService): string[] {
    const amqpConfig = configService.get('infrastructure.amqp');
    return [`amqp://${amqpConfig.userAndPass}@${amqpConfig.hostAndPort}`];
  }
}
