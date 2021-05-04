import { Inject, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientRMQ } from "@nestjs/microservices";
import { PublisherCharacterEventRepository } from "@domain/repositories/Characters/PublisherCharacterEventRepository";

@Injectable()
export class PublisherCharacterEvent implements PublisherCharacterEventRepository {
    private readonly queueName: string;

    constructor(
      @Inject('CharactersToCreatePublisher') private readonly clientRMQ: ClientRMQ,
      private readonly configService: ConfigService) {
      this.queueName = configService.get('infrastructure.amqp.queues.charactersToCreate');
    }

    public async publish(data?: any) {
      Logger.log(`Send character to queue ${this.queueName}`);

      await this.clientRMQ.emit<string>(`${this.queueName}`, JSON.stringify({ 'body': data }));
    }
}
