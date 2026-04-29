import joi from "joi"
import {RegexEnum} from "../enums/regex.enum";
export class UserValidator {
    private static email = joi.string().email().trim();
    private static password = joi.string().regex(RegexEnum.PASSWORD);
    private static nameSchema = joi.string().regex(RegexEnum.NAME);
    private static surname = joi.string().regex(RegexEnum.NAME);
    private static age = joi.number();
    private static region = joi.string();

    public static create = joi.object({
        name: this.nameSchema.required(),
        surname: this.surname.required(),
        age: this.age.required(),
        email: this.email.required(),
        password: this.password.required(),
        region: this.region.required(),
    })

    public static login = joi.object({
        email: this.email.required(),
        password: this.password.required(),
    })
}

export const userValidator = new UserValidator();