import { CharactersService } from "@domain/services/CharactersService";
import { Controller, InternalServerErrorException, Logger } from "@nestjs/common";
import { Ctx, EventPattern, Payload, RmqContext } from "@nestjs/microservices";

@Controller()
export class AmqpConsumer {

  constructor(private readonly charactersService: CharactersService) { }

  @EventPattern('characters-to-create-queue')
  subscribeCharacterToCreate(@Payload() data: string, @Ctx() context: RmqContext) {
    try {
      Logger.log(`Subscribing new message from characters-to-create-queue`);

      const dataObject = JSON.parse(data);

      const body = dataObject.body;

      this.charactersService.create(body);

      const channel = context.getChannelRef();
      channel.ack(context.getMessage());
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
