import joi from "joi"
import {RegexEnum} from "../enums/regex.enum";
export class UserValidator {
    private static email = joi.string().email().trim();
    private static password = joi.string().regex(RegexEnum.PASSWORD);
    private static nameSchema = joi.string().regex(RegexEnum.NAME);
    private static surname = joi.string().regex(RegexEnum.NAME);
    private static age = joi.number();
}

export const userValidator = new UserValidator();