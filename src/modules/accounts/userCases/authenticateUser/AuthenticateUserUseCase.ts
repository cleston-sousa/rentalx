import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository.";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    };
    token: string;
    refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("usersRepository") private usersRepository: IUsersRepository,
        @inject("usersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("dateProvider") private dateProvider: IDateProvider
    ) { }

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) throw new AppError("Email or password incorrect");

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) throw new AppError("Email or password incorrect");

        const token = sign({}, auth.secret_token, {
            subject: user.id,
            expiresIn: auth.expires_in_token,
        });

        const refresh_token = sign({ email }, auth.secret_refresh_token, {
            subject: user.id,
            expiresIn: auth.expires_in_refresh_token,
        });

        const expires_date = this.dateProvider.addDays(
            this.dateProvider.dateNow(),
            parseInt(auth.expires_in_days_refresh_token, 10)
        );

        await this.usersTokensRepository.create({
            user_id: user.id,
            refresh_token,
            expires_date,
        });

        const authenticatedInfo: IResponse = {
            token,
            refresh_token,
            user: {
                name: user.name,
                email,
            },
        };

        return authenticatedInfo;
    }
}

export { AuthenticateUserUseCase };
