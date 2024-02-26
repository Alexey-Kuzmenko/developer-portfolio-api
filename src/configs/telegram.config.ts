import { ConfigService } from '@nestjs/config';
import { TelegramOptions } from 'src/telegram/telegram.interface';

export const getTelegramConfig = (configService: ConfigService): TelegramOptions => {
    return {
        chatId: configService.get('TELEGRAM_CHAT_ID'),
        botToken: configService.get('TELEGRAM_BOT_TOKEN'),
        botChatId: configService.get('TELEGRAM_BOT_CHAT_ID')
    }
}