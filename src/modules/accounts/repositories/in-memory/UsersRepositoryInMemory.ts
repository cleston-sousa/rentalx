import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
    users: User[] = [];

    async create({
        name,
        email,
        password,
        driver_license,
    }: ICreateUserDTO): Promise<void> {
        const user = new User();

        Object.assign(user, {
            name,
            email,
            password,
            driver_license,
        });

        this.users.push(user);
    }

    async save(data: User): Promise<User> {
        const user = this.users.find((item) => item.id === data.id);
        Object.assign(user, data);
        return user;
    }

    async findByEmail(email: string): Promise<User> {
        return this.users.find((item) => item.email === email);
    }
    async findById(id: string): Promise<User> {
        return this.users.find((item) => item.id === id);
    }
}

export { UsersRepositoryInMemory };
