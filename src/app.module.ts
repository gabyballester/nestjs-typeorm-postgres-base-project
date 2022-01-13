import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Key } from './common/enum';
import { DatabaseModule } from './database/database.module';


@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule],
})
export class AppModule {
  static port: number;
  static host: string;
  static version: string;

  constructor(private readonly configService: ConfigService) {
    AppModule.port = +this.configService.get(Key.SERVER_PORT);
    AppModule.host = this.configService.get(Key.SERVER_HOST);
    AppModule.version = this.configService.get(Key.SERVER_VERSION);
  }
}
