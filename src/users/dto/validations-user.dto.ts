import { IsInt, IsString, MaxLength, Min } from 'class-validator';

export class FindUserByUsernameDto {
  @IsString()
  @MaxLength(10)
  username: string;
}

export class FindUserByIdDto {
  @IsInt()
  @Min(1)
  id: string;
}
