import { DynamicModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';

import { Key, Env, Db } from 'src/common/enum';

export const DatabaseProvider: DynamicModule = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  async useFactory(config: ConfigService) {
    const isDevelopmentEnv =
      config.get<string>(Key.NODE_ENV) !== Env.Production;

    const dbConfig = {
      type: config.get<string>(Db.DB_DIALECT),
      host: config.get<string>(Db.DB_HOST),
      port: parseInt(config.get<string>(Db.DB_PORT)),
      username: config.get<string>(Db.DB_USER),
      password: config.get<string>(Db.DB_PASSWORD),
      database: config.get<string>(Db.DB_NAME),
      autoLoadEntities: config.get<string>(Db.AUTO_LOAD_ENTITIES),
      synchronize: isDevelopmentEnv,
      logging: config.get<string>(Db.DB_LOGGING),
    } as ConnectionOptions;

    return dbConfig;
  },
});
