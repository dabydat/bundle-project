import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { envValidationSchema } from './common/config/envs/env.config';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './common/config/database/database.module';
import { GraphqlModule } from './common/config/modules/graphql.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: envValidationSchema,
    }),
    DatabaseModule.forRoot(),
    UsersModule,
    AuthModule,
    GraphqlModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
