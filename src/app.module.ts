import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Key } from './common/enum';
import { DatabaseModule } from './database/database.module';
import { ApiModule } from './api/api.module';
import { BcryptProvider } from './common/providers';


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
    
    const EnvGetter = (prop) => {
      return this.configService.get<string>(prop)
    }
    
    AppModule.port = parseInt(EnvGetter(Key.SERVER_PORT));
    AppModule.host = EnvGetter(Key.SERVER_HOST);
    AppModule.version = EnvGetter(Key.SERVER_VERSION);
  }
}
