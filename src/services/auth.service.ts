import {IUserCreateDTO, IUserDTO} from "../interfaces/user.interface";
import {userService} from "./user.service";
import {passwordService} from "./password.service";
import {TokenPairType} from "../interfaces/token.interface";
import {tokenService} from "./token.service";
import {tokenRepository} from "../repositories/token.repository";
import {IAuth} from "../interfaces/IAuth";
import {userRepository} from "../repositories/user.repository";
import {ApiError} from "../errors/api.error";
import {StatusCodesEnum} from "../enums/status-codes.enum";
import {userMapper} from "../mappers/user.mapper";

class AuthService {

    public async register(user: IUserCreateDTO): Promise<{ user: IUserDTO, tokens: TokenPairType }> {
            await userService.isEmailExists(user.email);
            const hashedPassword = await passwordService.hashPassword(user.password);
            const newUser = await userService.create({...user, password: hashedPassword});

            const tokens = tokenService.generateTokens({userId: newUser._id, role: newUser.role, accountType: newUser.accountType});
            await tokenRepository.save(newUser._id, tokens.refreshToken)

            return { user: userMapper.toDTO(newUser), tokens};
    }

    public async login(DTO: IAuth): Promise<{user: IUserDTO, tokens: TokenPairType}>{
        const user = await userRepository.getByEmail(DTO.email);

        if (!user) {
            throw new ApiError('Invalid email or password', StatusCodesEnum.UNAUTHORIZED)
        }

        const isValidPassword = await passwordService.comparePassword(DTO.password, user.password);

        if (!isValidPassword) {
            throw new ApiError('Invalid email or password', StatusCodesEnum.UNAUTHORIZED)
        }

        const tokens = tokenService.generateTokens({userId: user._id, role: user.role, accountType: user.accountType});
        await tokenRepository.save(user._id, tokens.refreshToken)

        return { user: userMapper.toDTO(user), tokens };
    }
}

export const authService = new AuthService();