import { Injectable } from '@nestjs/common';
import * as nodemailer from "nodemailer"
import {ForgotPassBrokeObject} from "./auth.controller";

// TODO : Creer une belle page Html pour l'envoi du mail
// TODO : Creer un lien avec un token de redirection vers le site web pour que le user generer lui meme un nouveau mot de passe



// TODO : Recevoir le mail du user dans l'object recu en evenement, creer un interface, mail et password


@Injectable()
export class AuthService {
  async sendForgotPassword(messageReceived: ForgotPassBrokeObject) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'collectverythings@gmail.com',
        pass: 'zcbq wkpq zfew edtd',
      },
    });

    await transporter.sendMail({
      from: 'collectverythings@gmail.com',
      // to: messageReceived.email, // Penser a retablir
      to: 'collectverythings@gmail.com',
      subject: 'Collect & Verything password recovery',
      text:
        'Please find bellow your new password. Update it in your account settings : ' +
          messageReceived.password,
    });
  }
}
