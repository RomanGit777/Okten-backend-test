import {Schema, model} from "mongoose";
import {ICar} from "../interfaces/car.interface";

const CarSchema = new Schema({
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    price: {type: Number, required: true},
    sellerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
},
    {timestamps: true, versionKey: false},
    );

export const Car = model<ICar>("Car", CarSchema);