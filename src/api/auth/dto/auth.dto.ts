import { IsString } from 'class-validator';
import { IsPasswordValid } from 'src/utils/validator/password-validator';

export class LoginDto {
  @IsString()
  email: string;

  @IsString()
  @IsPasswordValid()
  password: string;
}
