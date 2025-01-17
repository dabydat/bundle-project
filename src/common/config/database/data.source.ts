import { DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

type Env = {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
};

/**
 * Creates and returns the data source options for a PostgreSQL database.
 *
 */
export const createDataSourceOptions = (env: Env): DataSourceOptions => ({
  type: 'postgres',
  ...env,
  entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  synchronize: true,
  migrationsRun: false,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
});
