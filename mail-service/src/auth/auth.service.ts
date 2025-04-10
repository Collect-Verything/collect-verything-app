import { Injectable } from '@nestjs/common';
import * as nodemailer from "nodemailer"

@Injectable()
export class AuthService {
  async sendForgotPassword(email: string, password: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'collectverythings@gmail.com',
        pass: 'zcbq wkpq zfew edtd',
      },
    });

    await transporter.sendMail({
      from: 'collectverythings@gmail.com',
      to: email,
      subject: 'Collect & Verything password recovery',
      text:
        'Please find bellow your new password. Update it in your account settings : ' +
        password,
    });
  }
}
