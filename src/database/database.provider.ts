import { DynamicModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';

import { Key, Env, Db } from 'src/common/enum';

export const DatabaseProvider: DynamicModule = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
   
  async useFactory(config: ConfigService) {
    const EnvGetter = (prop: string) => {
      return config.get<string>(prop)
    }
    const isDevelopmentEnv =
      EnvGetter(Key.NODE_ENV) !== Env.Production;

    const dbConfig = {
      type: EnvGetter(Db.DB_DIALECT),
      host: EnvGetter(Db.DB_HOST),
      port: EnvGetter(Db.DB_PORT),
      username: EnvGetter(Db.DB_USER),
      password: EnvGetter(Db.DB_PASSWORD),
      database: EnvGetter(Db.DB_NAME),
      autoLoadEntities: EnvGetter(Db.AUTO_LOAD_ENTITIES),
      synchronize: isDevelopmentEnv,
      logging: EnvGetter(Db.DB_LOGGING),
    } as ConnectionOptions;

    return dbConfig;
  },
});
