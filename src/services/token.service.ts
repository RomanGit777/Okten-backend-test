import {ITokenPayload, TokenPairType} from "../interfaces/token.interface";
import jwt from "jsonwebtoken";
import {config} from "../configs/config";
import {TokenTypeEnum} from "../enums/token-type.enum";
import {ApiError} from "../errors/api.error";
import {StatusCodesEnum} from "../enums/status-codes.enum";
import {tokenRepository} from "../repositories/token.repository";

class TokenService {
    public generateTokens(payload: ITokenPayload): TokenPairType {
        const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET,
            { expiresIn: config.JWT_ACCESS_LIFETIME as jwt.SignOptions["expiresIn"] });
        const refreshToken = jwt.sign(payload, config.JWT_REFRESH_SECRET, {
            expiresIn: config.JWT_REFRESH_LIFETIME as jwt.SignOptions["expiresIn"] });
        return {
            accessToken,
            refreshToken
        }
    }
    public verifyTokens( token : string, type : TokenTypeEnum): ITokenPayload {
        try {
            let secret: string;

            switch (type) {
                case TokenTypeEnum.ACCESS:
                    secret = config.JWT_ACCESS_SECRET;
                    break;
                case TokenTypeEnum.REFRESH:
                    secret = config.JWT_REFRESH_SECRET;
                    break;
                default : throw new ApiError('Invalid token type', StatusCodesEnum.BAD_REQUEST)
            }

            return jwt.verify(token, secret) as ITokenPayload;

        } catch (e) {
            throw new ApiError('Invalid token', StatusCodesEnum.UNAUTHORIZED)
        }
    }

    public async isTokenExists(token: string, type: TokenTypeEnum): Promise<boolean> {
        const ITokenPromise = await tokenRepository.findByParams({
            [type]: token
        });
        return !!ITokenPromise
    }
}

export const tokenService = new TokenService();