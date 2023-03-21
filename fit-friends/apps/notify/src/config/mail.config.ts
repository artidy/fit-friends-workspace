import { ConfigService, registerAs } from '@nestjs/config';
import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import path from 'path';

export const mailOptions = registerAs('mail', () => ({
  server: process.env.SMTP_SERVER,
  port: process.env.SMTP_SERVER_PORT,
  email: process.env.ADMIN_EMAIL,
  user: process.env.EMAIL_USER,
  password: process.env.EMAIL_PASSWORD
}));

export function getMailConfig(): MailerAsyncOptions {
  return {
    useFactory: async (configService: ConfigService) => ({
      transport: {
        host: configService.get<string>('mail.server'),
        port: configService.get<number>('mail.port'),
        ignoreTLS: true,
        secure: false,
        auth: {
          user: configService.get<string>('mail.user'),
          pass: configService.get<string>('mail.password')
        }
      },
      defaults: {
        from: configService.get<string>('mail.email'),
      },
      template: {
        dir: path.resolve(__dirname, 'assets'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true
        }
      }
    }),
    inject: [ConfigService]
  }
}
