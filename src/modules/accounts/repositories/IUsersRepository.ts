import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";

interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<void>;

    save(data: User): Promise<User>;

    findByEmail(email: string): Promise<User>;

    findById(id: string): Promise<User>;
}

export { IUsersRepository };
