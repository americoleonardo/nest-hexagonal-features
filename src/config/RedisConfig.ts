import { CacheModule, DynamicModule } from "@nestjs/common";
import { ConfigService, ConfigModule } from "@nestjs/config";

export class RedisConfig {
  static load(): DynamicModule {
    return CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => (
        this.getConfig(configService)
      ),
      inject: [ConfigService],
    });
  }

  private static getConfig(configService: ConfigService): any {
    const config = configService.get('infrastructure.redis');

    return {
      host: config.host,
      password: config.password,
      port: config.port
    };
  }
}
