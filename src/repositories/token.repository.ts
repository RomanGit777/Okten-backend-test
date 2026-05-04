import {Token} from "../models/token.model";
import {IToken} from "../interfaces/token.interface";

class TokenRepository {

    public save(userId: string, refreshToken: string){
        return Token.create({ userId, refreshToken });
    }

    public find(refreshToken: string){
        return Token.findOne({ refreshToken })
    }

    public delete(refreshToken: string){
        return Token.deleteOne({ refreshToken });
    }

    public async findByParams(params: Partial<IToken>): Promise<IToken | null> {
        return Token.findOne(params);
    }
}
export const tokenRepository = new TokenRepository();