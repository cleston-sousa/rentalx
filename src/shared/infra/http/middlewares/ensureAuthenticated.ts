import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { container } from "tsyringe";

import auth from "@config/auth";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    const authHeader = request.headers.authorization;

    if (!authHeader) throw new AppError("Token missing", 401);

    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(token, auth.secret_token) as IPayload;

        const usersRepository =
            container.resolve<IUsersRepository>("usersRepository");

        const user = await usersRepository.findById(user_id);

        if (!user) throw new AppError("Invalid user", 401);

        request.user = {
            id: user_id,
        };

        next();
    } catch {
        throw new AppError("Invalid token", 401);
    }
}
