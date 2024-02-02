import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(private readonly configService: ConfigService) { }

    test(): string {
        return this.configService.get('API_KEY')
    }

    validateApiKey(apiKey: string): string | null {
        const permanentApiKey = this.configService.get('API_KEY')
        return apiKey === permanentApiKey ? apiKey : null
    }

}
