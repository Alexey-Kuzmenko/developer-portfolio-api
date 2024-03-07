import { DynamicModule, Module, Provider } from '@nestjs/common';
import { CaptchaController } from './captcha.controller';
import { CaptchaService } from './captcha.service';
import { CaptchaModuleOptions } from './captcha.interface';
import { CAPTCHA_MODULE_OPTIONS } from './captcha.constants';

@Module({})
export class CaptchaModule {
  static forRootAsync(options: CaptchaModuleOptions): DynamicModule {

    const asyncOptions = this.createAsyncOptionsProvider(options);

    return {
      module: CaptchaModule,
      imports: options.imports,
      controllers: [CaptchaController],
      providers: [CaptchaService, asyncOptions]
    };

  }

  private static createAsyncOptionsProvider(options: CaptchaModuleOptions): Provider {
    return {
      provide: CAPTCHA_MODULE_OPTIONS,
      useFactory: async (...args: any[]) => {
        const config = await options.useFactory(...args);
        return config;
      },
      inject: options.inject || []
    };
  }
}
