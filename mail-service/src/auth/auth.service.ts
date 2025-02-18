import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  
  async sendMailWhenPasswordIsForget(email: string, password: string) {
    const nodemailer = require("nodemailer");

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "collectverything@gmail.com",
        pass: "motdepasse1@",
      },
    });

    await transporter.sendMail({
      from: 'collectverything@gmail.com',
      to: email,
      subject: "Collect&Verything password recovery",
      text: "Please find bellow your new password. Update it in your account settings "+password,
    });

  }
}
