import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository.";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
    sub: string;
    email: string;
}

@injectable()
class RefreshTokenUseCase {
    constructor(
        @inject("usersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,

        @inject("dateProvider") private dateProvider: IDateProvider
    ) { }

    async execute(token: string): Promise<string> {
        const { email, sub } = verify(
            token,
            auth.secret_refresh_token
        ) as IPayload;

        const userToken =
            await this.usersTokensRepository.findByUserIdAndRefreshToken(
                sub,
                token
            );

        if (!userToken) {
            throw new AppError("refresh token does not exists");
        }

        await this.usersTokensRepository.deleteById(userToken.id);

        const refresh_token = sign({ email }, auth.secret_refresh_token, {
            subject: sub,
            expiresIn: auth.expires_in_refresh_token,
        });

        const expires_date = this.dateProvider.addDays(
            this.dateProvider.dateNow(),
            parseInt(auth.expires_in_days_refresh_token, 10)
        );

        await this.usersTokensRepository.create({
            user_id: sub,
            refresh_token,
            expires_date,
        });

        return refresh_token;
    }
}

export { RefreshTokenUseCase };
