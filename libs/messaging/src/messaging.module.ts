import { DynamicModule, Global, Module } from '@nestjs/common';
import { MessagingService } from './messaging.service';

/**
 * Stub RabbitMQ messaging module for Lab 0.
 * Real AMQP publish/subscribe wiring comes in later labs.
 */
@Global()
@Module({})
export class MessagingModule {
  static forRoot(): DynamicModule {
    return {
      module: MessagingModule,
      providers: [MessagingService],
      exports: [MessagingService],
    };
  }
}
