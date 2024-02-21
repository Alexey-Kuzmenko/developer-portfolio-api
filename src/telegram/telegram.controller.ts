import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { MessageDto } from './dto/message.dto';
import { ApiKeyAuthGuard } from 'src/auth/guards/api-key.guard';

@Controller('telegram')
export class TelegramController {
    constructor(private readonly telegramService: TelegramService) { }

    @Post('notify')
    @UsePipes(new ValidationPipe())
    @UseGuards(ApiKeyAuthGuard)
    sendMessage(@Body() dto: MessageDto): Promise<void> {
        const message: string = this.telegramService.generateMessage(dto)
        return this.telegramService.sendMessage(message)
    }
}
