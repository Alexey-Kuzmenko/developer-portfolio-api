import { Inject, Injectable } from '@nestjs/common';
import { MessageDto } from './dto/message.dto';
import { Telegraf } from 'telegraf'
import { TelegramOptions } from './telegram.interface';
import { TELEGRAM_MODULE_OPTIONS } from './telegram.constants';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { format } from 'date-fns';

@Injectable()
export class TelegramService {
    bot: Telegraf
    options: TelegramOptions

    constructor(@Inject(TELEGRAM_MODULE_OPTIONS) options: TelegramOptions) {
        this.bot = new Telegraf(options.botToken);
        this.options = options
    }

    generateMessage(dto: MessageDto | AuthDto, messageType: 'order' | 'register' | 'login'): string {
        if (messageType === 'order' && 'message' in dto) {
            return `Name: ${dto.name}`
                + '\n'
                + 'Email:' + ' ' + '`' + dto.email + '`'
                + '\n'
                + '\n'
                + `Message: ${dto.message}`
        }

        if (messageType === 'register' && 'email' in dto) {
            return 'Attention! New user registered.'
                + '\n'
                + 'User email:' + ' ' + '`' + dto.email + '`'
                + '\n'
                + `Time of registration: ${format(new Date(), 'pp dd MMM yyyy')}`
        }

        if (messageType === 'login' && 'email' in dto) {
            return 'Attention! Detected login in the system.'
                + '\n'
                + 'User email:' + ' ' + '`' + dto.email + '`'
                + '\n'
                + `Time of registration: ${format(new Date(), 'pp dd MMM yyyy')}`
        }
    }

    async sendMessage(message: string) {
        this.bot.telegram.sendMessage(this.options.chatId, message, { parse_mode: 'Markdown' })
    }

    async sendAuthMessage(message: string) {
        this.bot.telegram.sendMessage(this.options.botChatId, message, { parse_mode: 'Markdown' })
    }
}
