import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository.";
import { AuthenticateUserUseCase } from "@modules/accounts/userCases/authenticateUser/AuthenticateUserUseCase";
import { CreateUserUseCase } from "@modules/accounts/userCases/createUser/CreateUserUseCase";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepository: IUsersRepository;
let usersTokensRepository: IUsersTokensRepository;
let user: ICreateUserDTO;
let dateProvider: IDateProvider;

describe("authenticate user", () => {
    beforeEach(async () => {
        usersRepository = new UsersRepositoryInMemory();
        usersTokensRepository = new UsersTokensRepositoryInMemory();
        dateProvider = new DayjsDateProvider();

        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepository,
            usersTokensRepository,
            dateProvider
        );

        createUserUseCase = new CreateUserUseCase(usersRepository);

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
