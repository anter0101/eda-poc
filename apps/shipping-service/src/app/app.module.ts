import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagingModule } from '@eda/messaging';
import PostgresTypeorm from 'src/config/db-config';
import { HealthModule } from 'src/app/modules/health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development', '../../.env.development'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresTypeorm,
      inject: [PostgresTypeorm],
    }),
    MessagingModule.forRoot(),
    HealthModule,
  ],
})
export class AppModule {}
