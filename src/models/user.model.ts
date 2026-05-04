import {Schema, model} from "mongoose";
import {IUser} from "../interfaces/user.interface";
import {RoleEnum} from "../enums/role.enum";
import {AccountTypeEnum} from "../enums/account-type.enum";

const UserSchema = new Schema({
        name: {type: String, required: true},
        surname: {type: String, required: true},
        age: {type: Number, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        region: {type: String, required: true},

        role: {type: String, enum: RoleEnum, default: RoleEnum.BUYER},
        accountType: {type: String, enum: AccountTypeEnum, default: AccountTypeEnum.BASIC},

        isActive: {type: Boolean, default: true},
        isDeleted: {type: Boolean, default: false}
    },
    {timestamps: true, versionKey: false}
);

export const User = model<IUser>("User", UserSchema);