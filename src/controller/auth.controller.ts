import {NextFunction, Request, Response} from "express";
import {IUserCreateDTO} from "../interfaces/user.interface";
import {authService} from "../services/auth.service";
import {IAuth} from "../interfaces/IAuth";
import {StatusCodesEnum} from "../enums/status-codes.enum";

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

    public async login(req:Request, res:Response, next:NextFunction){
        try {
            const body = req.body as IAuth;
            const data = await authService.login(body);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();