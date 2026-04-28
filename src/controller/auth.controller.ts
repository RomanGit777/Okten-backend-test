import {Request, Response, NextFunction} from "express";
import {IUserCreateDTO, IUserDTO} from "../interfaces/user.interface";
import {authService} from "../services/auth.service";
import {TokenPairType} from "../interfaces/token.interface";
import {IAuth} from "../interfaces/IAuth";

class AuthController {

    public async register(req:Request, res:Response, next:NextFunction): Promise<{ user: IUserDTO; tokens: TokenPairType }>{
        try {
            const user = req.body as IUserCreateDTO;
            return authService.register(user);
        } catch (e){}
    }

    public async login(user: IAuth): Promise<{ user: IUserDTO; tokens: TokenPairType }>{
        return authService.login(user);
    }
}

export const authController = new AuthController();