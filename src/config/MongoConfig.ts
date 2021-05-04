import { DynamicModule } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";

export class MongoConfig {
  static load(): DynamicModule {
    return TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => (
          this.getMongoConfiguration(configService)
      )
    })
  }

  private static getMongoConfiguration(configService: ConfigService): TypeOrmModuleOptions {
    const config = configService.get('infrastructure.databases.characters');

    return {
      type: config.type,
      host: config.host,
      port: config.port,
      database: config.database,
      synchronize: true,
      useUnifiedTopology: true,
      autoLoadEntities: true,
    };
  }
}
