export const AppConfig = () => {
  return {
    infrastructure: {
      api: {
        iceAndFireApi: process.env.ICE_AND_FIRE_API
      },
      amqp: {
        user: process.env.RABBITMQ_USER,
        pass: process.env.RABBITMQ_PASS,
        host: process.env.RABBITMQ_HOST,
        port: process.env.RABBITMQ_PORT,
        userAndPass: `${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}`,
        hostAndPort: `${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`,
        queues: {
          charactersToCreate: process.env.CHARACTERS_QUEUE_TO_CREATE
        }
      },
      redis: {
        host: process.env.REDIS_HOST as any,
        password: process.env.REDIS_PASSWORD as any,
        port: process.env.REDIS_PORT as any,
      },
      databases: {
        characters: {
          type: process.env.DRIVER_DB as any,
          host: process.env.HOST_DB as any,
          port: process.env.PORT_DB as any,
          database: process.env.DATABASE as any,
        }
      }
    }
  }
};
