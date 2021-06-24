import { Request, Response } from "express";
import { container } from "tsyringe";

import { RefreshTokenUseCase } from "@modules/accounts/userCases/refreshToken/RefreshTokenUseCase";

class RefreshTokenController {
    async handle(request: Request, response: Response): Promise<Response> {
        const token =
            request.body.token ||
            request.headers["x-access-token"] ||
            request.query.token;

        const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

        const newRefreshToken = await refreshTokenUseCase.execute(token);

        return response.status(200).json(newRefreshToken);
    }
}

export { RefreshTokenController };
