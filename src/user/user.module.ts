import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { MailerModule } from '@nestjs-modules/mailer';
import { ImageSchema } from './schemas/image.schema';


@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name:'User',
        schema:UserSchema
      },
      {
        name:'Avatar',
        schema:ImageSchema
      }
    ]),
    MailerModule.forRoot({
      transport:{
        host:"smtp.sendgrid.net",
        auth:{
          user:'apikey',
          pass:"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",
        }
      }
    }),
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
