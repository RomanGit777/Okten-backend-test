import {Token} from "../models/token.model";

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
}
export const tokenRepository = new TokenRepository();