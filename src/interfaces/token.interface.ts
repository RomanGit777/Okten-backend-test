import {RoleEnum} from "../enums/role.enum";
import {AccountTypeEnum} from "../enums/account-type.enum";
import { Types } from "mongoose";

interface IToken {
    userId: Types.ObjectId;
    refreshToken: string;
}

interface ITokenPayload {
    userId: string;
    role: RoleEnum;
    accountType: AccountTypeEnum;
}

type TokenPairType = {
    accessToken: string;
    refreshToken: string;
}

type IRefresh = Pick<IToken, "refreshToken">

export {
        IToken,
    ITokenPayload,
    TokenPairType,
    IRefresh
}