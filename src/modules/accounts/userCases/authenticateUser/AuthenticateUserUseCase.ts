import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

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
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("usersRepository") private usersRepository: IUsersRepository
    ) { }

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) throw new AppError("Email or password incorrect");

        const passwordMatch = compare(user.password, password);

        if (!passwordMatch) throw new AppError("Email or password incorrect");

        const token = sign({}, "w3e4r5t6y7u8i9o0", {
            subject: user.id,
            expiresIn: "1d",
        });

        const authenticatedInfo: IResponse = {
            token,
            user: {
                name: user.name,
                email,
            },
        };

        return authenticatedInfo;
    }
}

export { AuthenticateUserUseCase };
