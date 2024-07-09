import { Injectable, forwardRef, Inject, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './model/user.model';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  logger: Logger;
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject(forwardRef(() => AuthService))
    private AuthService: AuthService,
  ) {
    this.logger = new Logger(UserService.name);
  }

  async findOne(query: any): Promise<any> {
    return await this.userModel.findOne(query);
  }

  async create(user: CreateUserDto): Promise<any> {
    const hashedPassword = await this.AuthService.getHashedPassword(
      user.password,
    );
    user.password = hashedPassword;
    const newUser = new this.userModel(user);
    return newUser.save();
  }
}
