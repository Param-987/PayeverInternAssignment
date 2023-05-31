import { MailerService } from '@nestjs-modules/mailer';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('email')
export class EmailController {
    constructor(private mailService:MailerService){}

    @Get('plain-text-email')
    async plaintextEmail(@Query('toemail') toemail){
        console.log(toemail)
        await this.mailService.sendMail({
            to:toemail,
            from:'kparam6162@gmail.com',
            subject:"Simple Plain Text",
            text:"WelCOme to nestjs"
        })
        return 'Success'
    }

}
