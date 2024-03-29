import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { TelegramController } from './telegram.controller';
import { TelegramService } from './telegram.service';
import { TelegramModuleOptions } from './telegram.interface';
import { TELEGRAM_MODULE_OPTIONS } from './telegram.constants';

@Global()
@Module({})
export class TelegramModule {
  static forRootAsync(options: TelegramModuleOptions): DynamicModule {
    const asyncOptions = this.generateAsyncOptions(options);

    return {
      module: TelegramModule,
      imports: options.imports,
      controllers: [TelegramController],
      providers: [TelegramService, asyncOptions],
      exports: [TelegramService]
    };
  }
  private static generateAsyncOptions(options: TelegramModuleOptions): Provider {
    return {
      provide: TELEGRAM_MODULE_OPTIONS,
      useFactory: async (...args: any[]) => {
        const config = await options.useFactory(...args);
        return config;
      },
      inject: options.inject || []
    };
  }
}  
