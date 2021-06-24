import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserToken } from "@modules/accounts/infra/typeorm/entities/UserToken";

interface IUsersTokensRepository {
    create(data: ICreateUserTokenDTO): Promise<UserToken>;

    findByUserToken(refresh_token: string): Promise<UserToken>;

    findByUserId(user_id: string): Promise<UserToken[]>;

    deleteById(id: string): Promise<void>;

    findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string
    ): Promise<UserToken>;
}

export { IUsersTokensRepository };
