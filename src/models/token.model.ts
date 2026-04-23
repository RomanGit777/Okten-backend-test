import {Schema, model} from 'mongoose'
import {IToken} from "../interfaces/token.interface";

const TokenSchema = new Schema<IToken>(
    {
    userId: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
    refreshToken: {type: String, required: true},
    },
    {versionKey: false}
)

export const Token = model<IToken>('Token', TokenSchema);