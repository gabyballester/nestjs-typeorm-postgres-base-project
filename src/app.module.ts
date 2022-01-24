import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Key } from './common/enum';
import { DatabaseModule } from './database/database.module';
import { ApiModule } from './api/api.module';
import { BcryptProvider } from './common/providers/bcrypt.provider';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'src/common/.env',
    }),
    DatabaseModule,
    ApiModule
  ],
  providers: [BcryptProvider],
})
export class AppModule {
  static port: number;
  static host: string;
  static version: string;

  constructor(private readonly configService: ConfigService) {
    AppModule.port = parseInt(this.configService.get<string>(Key.SERVER_PORT));
    AppModule.host = this.configService.get<string>(Key.SERVER_HOST);
    AppModule.version = this.configService.get<string>(Key.SERVER_VERSION);
  }
}
