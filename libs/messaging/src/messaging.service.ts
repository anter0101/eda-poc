import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Placeholder messaging service. Lab 0 only exposes config readiness.
 */
@Injectable()
export class MessagingService {
  private readonly logger = new Logger(MessagingService.name);

  constructor(private readonly configService: ConfigService) {
    const url = this.configService.get<string>(
      'RABBITMQ_URL',
      'amqp://guest:guest@localhost:5672',
    );
    this.logger.log(`Messaging stub ready (RABBITMQ_URL=${url})`);
  }

  getRabbitMqUrl(): string {
    return this.configService.get<string>(
      'RABBITMQ_URL',
      'amqp://guest:guest@localhost:5672',
    );
  }
}
