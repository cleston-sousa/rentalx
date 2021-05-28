import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserUseCase } from "@modules/accounts/userCases/authenticateUser/AuthenticateUserUseCase";

class AuthenticateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;

        const authenticateUserUseCase = container.resolve(
            AuthenticateUserUseCase
        );

        const authenticatedInfo = await authenticateUserUseCase.execute({
            email,
            password,
        });

        return response.json(authenticatedInfo);
    }
}

export { AuthenticateUserController };
