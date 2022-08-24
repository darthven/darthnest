import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import * as packageJson from './../package.json';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    JwtModule.register({
      secret: 'hard!to-guess_secret',
      signOptions: { expiresIn: '24h' },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [
        () => ({
          VERSION: packageJson.version,
          IS_PROD: process.env.NODE_ENV === 'production',
        }),
      ],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      disableHealthCheck: true,
      autoSchemaFile: true,
      playground: true,
      debug: false,
    }),
    MongooseModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        uri: config.get('MONGO_DB_URL'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {}
