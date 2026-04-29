import {ObjectSchema} from "joi";
import {NextFunction, Request, Response} from "express";
import {tokenService} from "../services/token.service";
import {TokenTypeEnum} from "../enums/token-type.enum";
import {ApiError} from "../errors/api.error";
import {StatusCodesEnum} from "../enums/status-codes.enum";
import {userService} from "../services/user.service";

class AuthMiddleware {

    public checkAccessToken(validator: ObjectSchema){
        return async (req: Request, res: Response, next: NextFunction) => {
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

                req.res.locals.tokenPayload = tokenPayload;

                next();
            } catch (e) {

            }
        }
    }
}

export const authMiddleware = new AuthMiddleware();