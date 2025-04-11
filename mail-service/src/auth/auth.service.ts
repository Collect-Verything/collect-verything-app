import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ForgotPassBrokeObject } from './auth.controller';
import { configEnv } from '../../env-config';

// TODO : Creer une belle page Html pour l'envoi du mail
// TODO : Creer un lien avec un token de redirection vers le site web pour que le user generer lui meme un nouveau mot de passe

// TODO : Recevoir le mail du user dans l'object recu en evenement, creer un interface, mail et password

@Injectable()
export class AuthService {
  async sendForgotPassword(messageReceived: ForgotPassBrokeObject) {
    const transporter = nodemailer.createTransport({
      service: configEnv.EMAIL_SERVICE,
      auth: {
        user: configEnv.EMAIL_MESSAGE_BROKER,
        pass: configEnv.PASSWORD_MESSAGE_BROKER,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_MESSAGE_BROKER,
      // to: messageReceived.email, // Penser a retablir
      to: 'collectverythings@gmail.com',
      subject:
        '🔐 Collect & Verything - Réinitialisation de votre mot de passe',
      text: `Bonjour,

Voici votre nouveau mot de passe temporaire : ${messageReceived.password}

Nous vous recommandons de vous connecter dès que possible et de le modifier depuis les paramètres de votre compte.

Merci de votre confiance,
L’équipe Collect & Verything`,
      html: `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto;">
      <h2 style="color: #0A85FF;">🔐 Réinitialisation de votre mot de passe</h2>
      <p>Bonjour,</p>
      <p>Vous avez demandé à réinitialiser votre mot de passe sur <strong>Collect & Verything</strong>.</p>
      <p>Voici votre nouveau mot de passe temporaire :</p>
      <p style="background: #f2f2f2; padding: 10px; border-radius: 5px; font-size: 18px; text-align: center;">
        <strong>${messageReceived.password}</strong>
      </p>
      <p>
        Merci de vous connecter avec ce mot de passe et de le changer rapidement dans les paramètres de votre compte.
      </p>
      <p style="margin-top: 30px;">À bientôt,<br>L’équipe Collect & Verything</p>
      <hr style="margin-top: 40px;">
      <small style="color: #999;">Si vous n'êtes pas à l’origine de cette demande, vous pouvez ignorer ce message.</small>
    </div>
  `,
    });
  }
}
