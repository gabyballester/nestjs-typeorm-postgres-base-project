import { DynamicModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';

import { Key, Env, Db } from 'src/common/enum';

export const DatabaseProvider: DynamicModule = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  async useFactory(config: ConfigService) {
    const isDevelopmentEnv = config.get(Key.NODE_ENV) !== Env.Production;

    const dbConfig = {
      type: config.get(Db.DB_DIALECT),
      host: config.get(Db.DB_HOST),
      port: +config.get(Db.DB_PORT),
      username: config.get(Db.DB_USER),
      password: config.get(Db.DB_PASSWORD),
      database: config.get(Db.DB_NAME),
      autoLoadEntities: config.get(Db.AUTO_LOAD_ENTITIES),
      synchronize: isDevelopmentEnv,
      logging: config.get(Db.DB_LOGGING),
    } as ConnectionOptions;

    return dbConfig;
  },
});
