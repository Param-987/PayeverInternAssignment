import { HttpException, Injectable, HttpStatus } from "@nestjs/common";
import { Model, NumberExpression } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { IUser } from "./Interfaces/user.Interface";
import { ImageInterface } from "./Interfaces/image.interface";
import { userdto } from "./user.userdto";
import { MailerService } from "@nestjs-modules/mailer";
import axios from "axios";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class UserService {
  constructor(
    @InjectModel("User") private readonly userModel: Model<IUser>,
    @InjectModel("Avatar") private readonly avatarModel: Model<ImageInterface>,
    private mailService: MailerService
  ) {}

  // Task 1
  public async postUsers(newuser: userdto) {
    try {
      const user = new this.userModel(newuser);
      await user.save();
      const email = String(newuser.email);
      await this.plaintextEmail(email);
      return `New User Added.We have send a Welcome Mail.Thankyou for SignIn Up`
    } catch (error) {
      throw new HttpException(
        "Error Occured in Post!!!. User With Id allready exist..",
        HttpStatus.CONFLICT
      );
    }
  }

    // code to send Email to user email Recieved
    async plaintextEmail(toemail: string) {
        await this.mailService.sendMail({
          to: toemail,
          from: "kparam6162@gmail.com",
          subject: "Simple Plain Text",
          text: "Welcome to Nestjs RestApi.ThankYou",
        });
        return "Success";
      }

  // Task 2
  public async getUserbyId(id: Number) {
    try {
      const user = await axios.get(`https://reqres.in/api/users/${id}`);
      return user.data.data;
    } catch (error) {
      throw new HttpException(
        `User with id:${id} not found.`,
        HttpStatus.NOT_FOUND
      );
    }
  }

  // Task 3
  public async getUserAvatar(id: Number) {
    try {
      const user = await this.avatarModel.findOne({ id }).exec();
      if (user) {
        return user.data;
      }

      // generate a random String
      const hashValue = [...Array(10)]
        .map(() => Math.random().toString(36)[2])
        .join("");

      const response = await axios.get(`https://reqres.in/api/users/${id}`);
      
      const avatarUrl = response.data.data.avatar;
      // if avatarUrl not exist/not valid
      if (!avatarUrl)
        throw new HttpException(
          "Avatar Url is not correct.Try again",
          HttpStatus.BAD_REQUEST
        );

      const res = await axios.get(avatarUrl, { responseType: "arraybuffer" });
      const imageBuffer = Buffer.from(res.data, "binary");
      const base64Image = imageBuffer.toString("base64");
      const newImage = new this.avatarModel({
        id: id,
        hash: hashValue,
        data: base64Image,
      });
      await newImage.save();

      const fileName = `${id}_${hashValue}.jpg`;
      const filePath = `avatar/${fileName}`;
      fs.writeFileSync(filePath, imageBuffer);
      return base64Image;
    } catch (error) {
        throw new HttpException(
            "Internal Server Error.User with above Id not exist.Try Again with different Id",
            HttpStatus.BAD_REQUEST
          );
    }
  }


  // Task 4
  public async deleteUserById(id: Number) {
    try {
      await this.userModel.deleteOne({ id });
      const avatar = await this.avatarModel.findOne({ id }).exec();
      if (avatar) {
        const filePath = `avatar/${id}_${avatar.hash}.jpg`;
        await this.avatarModel.deleteOne({ id });
        fs.unlink(filePath, (e) => {
          if (e) throw e;
          else console.log("Deleted Successfully");
        });
        return `Successfully Deleted`;
      } else {
        return "File Do Not Exist";
      }
    } catch (error) {
      return new HttpException(
        "Error Occured in Deleting",
        HttpStatus.EXPECTATION_FAILED
      );
    }
  }
}
