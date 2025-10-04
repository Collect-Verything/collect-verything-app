import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { configEnv } from '../../env-config';
import { DeliveryBrokeObject } from './entities/delivery.entity';

const transporter = nodemailer.createTransport({
  service: configEnv.EMAIL_SERVICE,
  auth: {
    user: configEnv.EMAIL_SENDER,
    pass: configEnv.EMAIL_PASSWORD,
  },
});

@Injectable()
export class DeliveryService {
  async sendDeliveryInformation(deliveryInfo: DeliveryBrokeObject) {
    await transporter.sendMail({
      from: process.env.EMAIL_SENDER,
      // to: messageReceived.email, // Penser a retablir
      to: 'collectverythings@gmail.com',
      subject: `🚚 Collect & Verything - Information${deliveryInfo.typeDelivery === 'Magasin' || (deliveryInfo.typeDelivery === 'Point_Relais' && ' Livraison')}`,
      text: `Bonjour,

Voici votre confirmation de commande.

L’équipe Collect & Verything`,
      html: `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto;">
      <h2 style="color: #0A85FF;"> Confirmation de votre commande</h2>
      <p>Bonjour,</p>
      <p>Votre commande est confirmé <strong>Collect & Verything</strong>.</p>
      
      ${deliveryInfo.typeDelivery === 'Magasin' && `<p>Voici les articles que vous pouvez retirer en magasin :</p>`}
      ${deliveryInfo.typeDelivery === 'Point_Relais' && `<p>Voici les articles que vous allez recevoir au point relais que vous avez selectionné :</p>`}
      ${deliveryInfo.typeDelivery === 'undefined' && `<p>Voici les articles de votre commande :</p>`}
               
      <ul style="background: #f2f2f2; padding: 10px; border-radius: 5px; font-size: 18px;">
        ${deliveryInfo.products.map((item) => `<li>${item.productName} — Quantité: ${item.quantity}</li>`).join('')}
      </ul>
      <p>Merci pour votre confiance !</p>
      <p style="margin-top: 30px;">À bientôt,<br>L’équipe Collect & Verything</p>
      <hr style="margin-top: 40px;">
      <small style="color: #999;">Si vous n'êtes pas à l’origine de cette demande, vous pouvez ignorer ce message.</small>
    </div>
  `,
    });
  }
}
