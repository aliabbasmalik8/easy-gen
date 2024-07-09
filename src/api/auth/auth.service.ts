import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateJwtToken(loginDto: LoginDto) {
    const payload = {
      email: loginDto.email,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getHashedPassword(password: string): Promise<any> {
    const hashedPassword = await bcrypt.hash(
      password,
      process.env.PASSWORD_HASH_SALT,
    );
    return hashedPassword;
  }
}
