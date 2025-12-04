import { env } from '@app/configs/env.config.js';
import nodemailer, { type Transporter } from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport/index.js';

class EmailWorker {
  private transporter: Transporter;
  private senderEmail: string;

  constructor() {
    this.senderEmail = env.mail.user;

    const smtpConfig: SMTPTransport.Options = {
      host: env.mail.host,
      port: env.mail.port,
      secure: env.mail.port === 465,
      auth: {
        user: env.mail.user,
        pass: env.mail.password,
      },
    };
    this.transporter = nodemailer.createTransport(smtpConfig);
  }

  async sendMail(targetEmail: string, subject: string, content: string) {
    if (!this.transporter) {
      throw new Error('Email Transporter not initialized.');
    }

    const info = await this.transporter.sendMail({
      from: this.senderEmail,
      subject,
      to: targetEmail,
      text: JSON.stringify(content),
    });

    console.log(`✅ Message Sent [${targetEmail}]: ${info.messageId}`);
    return info.messageId;
  }
}

export const emailWorker = new EmailWorker();
