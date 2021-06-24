import fs from "fs";
import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";

import appConfig from "@config/appConfig";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";

class EtherealMailProvider implements IMailProvider {
    private client: Transporter;
    constructor() {
        nodemailer
            .createTestAccount()
            .then((account) => {
                const transporter = nodemailer.createTransport({
                    host: account.smtp.host,
                    port: account.smtp.port,
                    secure: account.smtp.secure,
                    auth: {
                        user: account.user,
                        pass: account.pass,
                    },
                });

                this.client = transporter;
            })
            .catch((e) => {
                console.log(e);
            });
    }

    async sendMailTemplate(
        to: string,
        subject: string,
        path: string,
        variables: any
    ): Promise<void> {
        const templateFileContent = fs.readFileSync(path).toString("utf-8");

        const templateParse = handlebars.compile(templateFileContent);

        const templateHTML = templateParse(variables);

        const message = {
            from: appConfig.app_email_sender,
            to,
            subject,
            html: templateHTML,
        };

        const result = await this.client.sendMail(message);

        console.log("Message sent: %s", result.messageId);
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(result));
    }

    async sendMail(to: string, subject: string, body: string): Promise<void> {
        const message = {
            from: appConfig.app_email_sender,
            to,
            subject,
            text: body,
            html: body,
        };

        const result = await this.client.sendMail(message);

        console.log("Message sent: %s", result.messageId);
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(result));
    }
}

export { EtherealMailProvider };
