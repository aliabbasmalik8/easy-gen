import {
  Controller,
  Post,
  Logger,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  logger: Logger;
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {
    this.logger = new Logger(AuthController.name);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<any> {
    try {
      const hashedPassword = await this.authService.getHashedPassword(
        loginDto.password,
      );
      const user_detail = await this.userService.findOne({
        email: loginDto.email,
        password: hashedPassword,
      });
      if (!user_detail) throw new BadRequestException('Invalid credentials.');
      return await this.authService.generateJwtToken(loginDto);
    } catch (error) {
      throw error;
    }
  }
}
