import { IsEmail, IsNotEmpty, IsOptional, IsInt, Min } from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  //   @ApiProperty({ description: 'First name of the user' })
  @IsNotEmpty()
  first_name: string;

  //   @ApiProperty({ description: 'Last name of the user' })
  @IsNotEmpty()
  last_name: string;

  //   @ApiProperty({ description: 'Age of the user', required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  age?: number;

  //   @ApiProperty({ description: 'Email of the user' })
  @IsEmail()
  email: string;

  //   @ApiProperty({ description: 'Username of the user' })
  @IsNotEmpty()
  username: string;

  //   @ApiProperty({ description: 'Password of the user' })
  @IsNotEmpty()
  password: string;
}
