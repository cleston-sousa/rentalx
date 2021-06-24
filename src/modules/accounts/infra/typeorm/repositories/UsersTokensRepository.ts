import { getRepository, Repository } from "typeorm";

import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserToken } from "@modules/accounts/infra/typeorm/entities/UserToken";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository.";

class UsersTokensRepository implements IUsersTokensRepository {
    private repository: Repository<UserToken>;

    constructor() {
        this.repository = getRepository(UserToken);
    }

    async findByUserToken(refresh_token: string): Promise<UserToken> {
        const userToken = await this.repository.findOne({
            where: { refresh_token },
        });
        return userToken;
    }

    async create({
        user_id,
        refresh_token,
        expires_date,
    }: ICreateUserTokenDTO): Promise<UserToken> {
        const userToken = this.repository.create({
            user_id,
            refresh_token,
            expires_date,
        });

        const result = await this.repository.save(userToken);

        return result;
    }

    async findByUserId(user_id: string): Promise<UserToken[]> {
        const userTokens = await this.repository.find({ where: { user_id } });
        return userTokens;
    }

    async findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string
    ): Promise<UserToken> {
        const userToken = await this.repository.findOne({
            where: { user_id, refresh_token },
        });
        return userToken;
    }

    async deleteById(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}

export { UsersTokensRepository };
