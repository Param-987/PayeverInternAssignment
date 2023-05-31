import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule} from '@nestjs/mongoose'
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailController } from './email.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.mongo_url),
    UserModule],
  controllers: [EmailController],
})
export class AppModule {}
