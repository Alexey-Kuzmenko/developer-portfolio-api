import { Inject, Injectable } from '@nestjs/common';
import { MessageDto } from './dto/message.dto';
import { Telegraf } from 'telegraf'
import { TelegramOptions } from './telegram.interface';
import { TELEGRAM_MODULE_OPTIONS } from './telegram.constants';

@Injectable()
export class TelegramService {
    bot: Telegraf
    options: TelegramOptions

    constructor(@Inject(TELEGRAM_MODULE_OPTIONS) options: TelegramOptions) {
        this.bot = new Telegraf(options.botToken);
        this.options = options
    }

    generateMessage(dto: MessageDto): string {
        return `Name: ${dto.name}`
            + '\n'
            + 'Email:' + ' ' + '`' + dto.email + '`'
            + '\n'
            + '\n'
            + `Message: ${dto.message}`
    }

    async sendMessage(message: string) {
        this.bot.telegram.sendMessage(this.options.chatId, message, { parse_mode: 'Markdown' })
    }
}
