import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { CharactersModule } from "@src/config/CharactersModule";
import { AppConfig } from "@src/config/AppConfig";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ AppConfig ]
    }),
    CharactersModule
  ],
  controllers: [],
  providers: []
})

export class BootstrapModule { }
