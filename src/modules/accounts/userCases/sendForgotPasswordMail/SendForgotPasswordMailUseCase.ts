import { resolve } from "path";
import { inject, injectable } from "tsyringe";
import { v4 as uuidv4 } from "uuid";

import appConfig from "@config/appConfig";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository.";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "@shared/errors/AppError";

@injectable()
class SendForgotPasswordMailUseCase {
    constructor(
        @inject("usersRepository") private usersRepository: IUsersRepository,
        @inject("usersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("dateProvider") private dateProvider: IDateProvider,
        @inject("mailProvider") private mailProvider: IMailProvider
    ) { }

    async execute(email: string): Promise<void> {
        const exp = parseInt(appConfig.recovery_password_expiration, 10);
        const user = await this.usersRepository.findByEmail(email);

        const templatePath = resolve(
            __dirname,
            "..",
            "..",
            "views",
            "emails",
            "forgotPassword.hbs"
        );

        if (!user) throw new AppError("user does not exists");

        const token = uuidv4();

        const expires_date = this.dateProvider.addSeconds(
            this.dateProvider.dateNow(),
            exp
        );

        await this.usersTokensRepository.create({
            user_id: user.id,
            refresh_token: token,
            expires_date,
        });

        const variables = {
            name: user.name,
            link: `${process.env.PASSWORD_RESET_LINK}${token}`,
        };

        await this.mailProvider.sendMailTemplate(
            user.email,
            "password recovery",
            templatePath,
            variables
        );
    }
}

export { SendForgotPasswordMailUseCase };
