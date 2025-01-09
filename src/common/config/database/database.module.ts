import { Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createDataSourceOptions } from './data.source';
import { envVarsConfig } from '../envs/env.config';

const envVars = envVarsConfig.default_database;

@Module({})
/**
 * The DatabaseModule class is responsible for configuring and providing the database connection
 * settings for the application using TypeORM and NestJS.
 *
 * @remarks
 * This module uses the `TypeOrmModule.forRootAsync` method to asynchronously configure the
 * database connection settings. It imports the `ConfigModule` to access configuration values
 * and uses a factory function to create the data source options.
 *
 * @example
 * ```typescript
 * import { DatabaseModule } from './database.module';
 *
 * @Module({
 *   imports: [DatabaseModule.forRoot()],
 * })
 * export class AppModule {}
 * ```
 *
 * @public
 */
export class DatabaseModule {
  static forRoot(): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: async () => ({
            ...createDataSourceOptions(envVars),
            autoLoadEntities: true,
          }),
          inject: [ConfigService],
        }),
        // TypeOrmModule.forRootAsync({
        //     name: 'second',
        //     imports: [ConfigModule],
        //     useFactory: async (configService: ConfigService) => ({
        //         ...createDataSourceOptions(configService, 'SECOND'),
        //         autoLoadEntities: true,
        //     }),
        //     inject: [ConfigService],
        // }),
      ],
    };
  }
}
