import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

const api_username = process.env.api_username
const api_password = process.env.api_password

@Injectable()
export class AuthService {
    constructor(
       // private readonly omscustomerService: OmscustomerService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(username: string, password: string) {
        // find if user exist with this email

        if (username === api_username && await this.comparePassword(password, api_password)) {

            return {username,login_time : Date.now()} 

        } else {

           return false
        }
    }

    public async login(user) {

        const token = await this.generateToken(user);

        return { user, token };
    }


    private async generateToken(user) {
        const token = await this.jwtService.signAsync(user);
        return token;
    }

    public async hashPassword(password) {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    }

    public async comparePassword(enteredPassword, dbPassword) {
        const match = await bcrypt.compare(enteredPassword, dbPassword);
        return match;
    }
}