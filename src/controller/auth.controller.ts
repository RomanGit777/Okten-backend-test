import {NextFunction, Request, Response} from "express";
import {ISellerCreateDTO, IUserCreateDTO} from "../interfaces/user.interface";
import {authService} from "../services/auth.service";
import {IAuth} from "../interfaces/IAuth";
import {StatusCodesEnum} from "../enums/status-codes.enum";
import {ITokenPayload} from "../interfaces/token.interface";
import {userService} from "../services/user.service";
import {userMapper} from "../mappers/user.mapper";
import {tokenService} from "../services/token.service";
import {tokenRepository} from "../repositories/token.repository";

class AuthController {
    public async register(req:Request, res:Response, next:NextFunction){
        try {
            const body = req.body as IUserCreateDTO;
            const data = await authService.register(body);
            res.status(StatusCodesEnum.CREATED).json(data);
        } catch (e){
            next(e);
        }
    }

    public async registerSeller(req:Request, res:Response, next:NextFunction) {
        try {
            const body = req.body as ISellerCreateDTO;
            const data = await authService.registerSeller(body);
            res.status(StatusCodesEnum.CREATED).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async login(req:Request, res:Response, next:NextFunction){
        try {
            const body = req.body as IAuth;
            const data = await authService.login(body);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async me(req:Request, res:Response, next:NextFunction){
        try {
            const tokenPayload = res.locals.tokenPayload as ITokenPayload;
            const {userId} = tokenPayload;
            const user = await userService.getById(userId);
            res.status(StatusCodesEnum.OK).json(userMapper.toDTO(user));
        }catch (e) {
            next(e);
        }
    }

    public async refresh(req:Request, res:Response, next:NextFunction){
        try {
            const {refreshToken} = req.body;

            const {role, userId, accountType} = res.locals.tokenPayload as ITokenPayload;

            await tokenRepository.delete(refreshToken);

            const tokens = tokenService.generateTokens({role,userId,accountType});

            await tokenRepository.save(userId, tokens.refreshToken);

            res.status(StatusCodesEnum.OK).json(tokens);
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();