import { Injectable } from '@nestjs/common';

// TODO : Get calue from env
// TODO : Fix require if possible

@Injectable()
export class AuthService {
  async sendMailWhenPasswordIsForget(email: string, password: string) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const nodemailer = require('nodemailer');
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
        'Please find bellow your new password. Update it in your account settings ' +
        password,
    });
  }
}
