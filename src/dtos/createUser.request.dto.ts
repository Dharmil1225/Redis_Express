import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly address: string;

  @IsNumber()
  @IsOptional()
  readonly pinCode: number;

  @IsNumber()
  @IsOptional()
  readonly score: number
}
