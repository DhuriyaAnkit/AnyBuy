import { IsEmail, IsNotEmpty, IsOptional, IsString, IsBoolean } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Please provide a valid email address.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required.' })
  password: string;

  @IsOptional()
  @IsBoolean()
  rememberMe?: boolean;
}
