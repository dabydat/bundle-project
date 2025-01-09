import { IsEmail, IsNotEmpty, IsOptional, IsInt, Min } from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  //   @ApiProperty({ description: 'First name of the user', required: false })
  @IsOptional()
  @IsNotEmpty()
  firstName?: string;

  //   @ApiProperty({ description: 'Last name of the user', required: false })
  @IsOptional()
  @IsNotEmpty()
  lastName?: string;

  //   @ApiProperty({ description: 'Age of the user', required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  age?: number;

  //   @ApiProperty({ description: 'Email of the user', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  //   @ApiProperty({ description: 'Username of the user', required: false })
  @IsOptional()
  @IsNotEmpty()
  username?: string;

  //   @ApiProperty({ description: 'Password of the user', required: false })
  @IsOptional()
  @IsNotEmpty()
  password?: string;
}
