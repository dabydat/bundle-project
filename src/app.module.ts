import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { envValidationSchema } from './common/config/envs/env.config';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './common/config/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: envValidationSchema,
    }),
    DatabaseModule.forRoot(),
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
