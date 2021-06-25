import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserToken } from "@modules/accounts/infra/typeorm/entities/UserToken";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository.";

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
    private userTokens: UserToken[] = [];

    async create({
        expires_date,
        user_id,
        refresh_token,
    }: ICreateUserTokenDTO): Promise<UserToken> {
        const userToken = new UserToken();

        Object.assign(userToken, { expires_date, user_id, refresh_token });

        this.userTokens.push(userToken);

        return userToken;
    }

    async findByUserToken(refresh_token: string): Promise<UserToken> {
        const userToken = this.userTokens.find(
            (item) => item.refresh_token === refresh_token
        );
        return userToken;
    }

    async findByUserId(user_id: string): Promise<UserToken[]> {
        const userTokens = this.userTokens.filter(
            (item) => item.user_id === user_id
        );
        return userTokens;
    }

    async deleteById(id: string): Promise<void> {
        const userTokenIdx = this.userTokens.findIndex(
            (item) => item.id === id
        );
        this.userTokens.splice(userTokenIdx, 1);
    }

    async findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string
    ): Promise<UserToken> {
        const userToken = this.userTokens.find(
            (item) =>
                item.refresh_token === refresh_token && item.user_id === user_id
        );
        return userToken;
    }
}

export { UsersTokensRepositoryInMemory };
