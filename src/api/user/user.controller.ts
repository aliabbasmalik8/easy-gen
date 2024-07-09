import {
  Controller,
  Post,
  Request,
  Logger,
  UseGuards,
  Get,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { ConflictException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { JwtAuthGuard } from 'src/utils/guards/jwt-auth-guard';
import { AuthService } from '../auth/auth.service';
import { LoginDto } from '../auth/dto/auth.dto';

@Controller('user')
export class UserController {
  logger: Logger;
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
    ) {
    this.logger = new Logger(UserController.name);
  }

  @Post('')
  async create(@Body() createUserDto: CreateUserDto): Promise<any> {
    try {
      const query = { email: createUserDto.email };
      const isUser = await this.userService.findOne(query);
      if (isUser) throw new ConflictException('User Already Exist');
      const user = await this.userService.create(createUserDto);
      const loginDto = new LoginDto()
      loginDto.email=user.email
      loginDto.password = user.password
      const token = await this.authService.generateJwtToken(loginDto);
      return {access_token:token.access_token,user:user};
    } catch (err) {
      this.logger.error('Something went wrong in signup:', err);
      throw err;
    }
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  async getUser(@Request() req): Promise<any> {
    const user = req.user;
    try {
      const user_detail = this.userService.findOne({ email: user.email });
      if (!user_detail) throw new BadRequestException('User not found.');
      return user_detail;
    } catch (err) {
      this.logger.error('Something went wrong getting user detail:', err);
      throw err;
    }
  }
}
