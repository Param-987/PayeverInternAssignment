import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule} from '@nestjs/mongoose'
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailController } from './email.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://kesarwaniparam6162:paroparo@cluster0.yjeae6x.mongodb.net/'),
    UserModule],
  controllers: [EmailController],
})
export class AppModule {}
