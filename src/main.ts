import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, ValidationPipe } from "@nestjs/common";
import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import { BootstrapModule } from "@src/BootstrapModule";
import { AmqpCharactersConsumerConfiguration } from "@infrastructure/amqp/config/AmqpCharactersConsumerConfiguration";
import { ConfigService } from "@nestjs/config";

(async () => {
  const app = await NestFactory.create(
    BootstrapModule,
    process.env.NODE_ENV == 'local' ? {} : {logger: false}
  );

  app.use(helmet());

  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors) => new BadRequestException(errors),
    validationError: {
      target: false,
      value: false
    }
  }));

  const options = new DocumentBuilder()
    .setTitle('Game of thrones hexagonal concept')
    .setDescription('Basic structure how to use and consume a hexagonal architecture based on Node JS')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup(`${process.env.API_VERSION}/api-docs`, app, document);

  const configService = app.get<ConfigService>(ConfigService);

  app.connectMicroservice(AmqpCharactersConsumerConfiguration.register(configService));

  await app.startAllMicroservicesAsync()

  await app.listen(process.env.PORT);
})()