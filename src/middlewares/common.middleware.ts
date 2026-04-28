import {ObjectSchema, ValidationError} from "joi";
import {NextFunction,Request,Response} from "express";
import {ApiError} from "../errors/api.error";

class CommonMiddleware {
    public validateBody(validator: ObjectSchema){
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                req.body = await validator.validateAsync(req.body);
                next();
            } catch (e) {
                if (e instanceof ValidationError) {
                    next(new ApiError(e.details[0].message, 400));
                }
                next(e);
            }
        }
    }
}

export const commonMiddleware = new CommonMiddleware();