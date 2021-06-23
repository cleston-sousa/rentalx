import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { AuthenticateUserUseCase } from "@modules/accounts/userCases/authenticateUser/AuthenticateUserUseCase";
import { CreateUserUseCase } from "@modules/accounts/userCases/createUser/CreateUserUseCase";
import { AppError } from "@shared/errors/AppError";

let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let user: ICreateUserDTO;

describe("authenticate user", () => {
    beforeEach(async () => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();

        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory
        );

        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);

        user = {
            email: "user@test.com",
            driver_license: "0000151151",
            name: "User Test",
            password: "123456",
        };

        await createUserUseCase.execute(user);
    });

    it("given email, password with valid values when execute then return authenticated info", async () => {
        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        expect(result).toHaveProperty("token");
    });

    it("given invalid email or password when execute then throws AppError", async () => {
        await expect(
            authenticateUserUseCase.execute({
                email: "random@email",
                password: user.password,
            })
        ).rejects.toEqual(new AppError("Email or password incorrect"));

        await expect(
            authenticateUserUseCase.execute({
                email: user.email,
                password: "random password",
            })
        ).rejects.toEqual(new AppError("Email or password incorrect"));
    });
});
