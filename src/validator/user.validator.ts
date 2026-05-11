import joi from "joi"
import {RegexEnum} from "../enums/regex.enum";
export class UserValidator {
    private static email = joi.string().email().trim();
    private static password = joi.string().regex(RegexEnum.PASSWORD);
    private static nameSchema = joi.string().regex(RegexEnum.NAME);
    private static surname = joi.string().regex(RegexEnum.NAME);
    private static age = joi.number().min(18).max(110);
    private static region = joi.string();
    private static phone = joi.string().regex(RegexEnum.PHONE);
    private static company = joi.string().trim().min(2).max(50);
    private static info = joi.string().trim().max(500);
    private static documents = joi.array().items(joi.string().trim());

    public static create = joi.object({
        name: this.nameSchema.required(),
        surname: this.surname.required(),
        age: this.age.required(),
        email: this.email.required(),
        password: this.password.required(),
        region: this.region.required(),
    })

    public static createSeller = joi.object({
        name: this.nameSchema.required(),
        surname: this.surname.required(),
        age: this.age.required(),
        email: this.email.required(),
        password: this.password.required(),
        region: this.region.required(),
        phone: this.phone.required(),
        company: this.company.required(),
        info: this.info.required(),
        documents: this.documents.required()
    })

    public static login = joi.object({
        email: this.email.required(),
        password: this.password.required(),
    })
}