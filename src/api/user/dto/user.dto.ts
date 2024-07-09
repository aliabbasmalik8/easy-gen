import { IsEmail, IsString } from 'class-validator';
import { IsPasswordValid } from '../../../utils/validator/password-validator';
export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsPasswordValid()
  password: string;
}
