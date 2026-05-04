import {NextFunction, Request, Response} from "express";
import {tokenService} from "../services/token.service";
import {TokenTypeEnum} from "../enums/token-type.enum";
import {ApiError} from "../errors/api.error";
import {StatusCodesEnum} from "../enums/status-codes.enum";
import {userService} from "../services/user.service";
import {IRefresh} from "../interfaces/token.interface";

class AuthMiddleware {

    public async checkAccessToken(req: Request, res: Response, next: NextFunction){
            try {
                const authorizationHeader = req.headers.authorization;

                if (!authorizationHeader) {
                    throw new ApiError('No token provided', StatusCodesEnum.UNAUTHORIZED);
                }

                const accessToken = authorizationHeader.split(" ")[1];

                if (!accessToken) {
                    throw new ApiError('No token provided', StatusCodesEnum.UNAUTHORIZED);
                }

                const tokenPayload = tokenService.verifyTokens(accessToken, TokenTypeEnum.ACCESS);

                const isUserActive = await userService.isActive(tokenPayload.userId);

                if (!isUserActive) {
                    throw new ApiError("Account is not active", StatusCodesEnum.FORBIDDEN);
                }

                res.locals.tokenPayload = tokenPayload;

                next();
            } catch (e) {
                next(e);
            }
        }

    public async checkRefreshToken(req: Request, res: Response, next: NextFunction){
        try {
            const {refreshToken} = req.body as IRefresh;

            if (!refreshToken) {
                throw new ApiError('No refresh token provided', StatusCodesEnum.FORBIDDEN)
            }

            const tokenPayload = tokenService.verifyTokens(refreshToken, TokenTypeEnum.REFRESH);

            const IsTokenExists = await tokenService.isTokenExists(refreshToken, TokenTypeEnum.REFRESH);

            if (!IsTokenExists) {
                throw new ApiError('Invalid token', StatusCodesEnum.FORBIDDEN);
            }

            res.locals.tokenPayload = tokenPayload;

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const authMiddleware = new AuthMiddleware();