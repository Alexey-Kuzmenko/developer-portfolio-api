import { ModuleMetadata } from '@nestjs/common';

export interface CaptchaOptions {
    secretKey: string
    apiUrl: string
}

export interface CaptchaModuleOptions extends Pick<ModuleMetadata, 'imports'> {
    useFactory: (...args: any[]) => Promise<CaptchaOptions> | CaptchaOptions
    inject?: any[]
}