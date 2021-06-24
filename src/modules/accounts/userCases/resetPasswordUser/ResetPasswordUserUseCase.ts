import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository.";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    token: string;
    password: string;
}

@injectable()
class ResetPasswordUserUseCase {
    constructor(
        @inject("usersRepository") private usersRepository: IUsersRepository,
        @inject("usersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("dateProvider") private dateProvider: IDateProvider
    ) { }

    async execute({ password, token }: IRequest): Promise<void> {
        const userToken = await this.usersTokensRepository.findByUserToken(
            token
        );

        if (!userToken) throw new AppError("invalid token");

        const expired = this.dateProvider.expired(
            userToken.expires_date,
            this.dateProvider.dateNow()
        );

        if (expired) throw new AppError("expired token");

        const user = await this.usersRepository.findById(userToken.user_id);

        if (!user) throw new AppError("invalid user");

        user.password = await hash(password, 8);

        await this.usersRepository.save(user);

        await this.usersTokensRepository.deleteById(userToken.id);
    }
}

export { ResetPasswordUserUseCase };
