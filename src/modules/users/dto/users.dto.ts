import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsDecimal,
  IsEmail,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ default: 'roman' })
  @IsString()
  name: string;
  @ApiProperty({ default: 'calderin' })
  @IsString()
  lastName: string;
  @ApiProperty({ default: 23 })
  @IsNumber()
  age: number;
  @ApiProperty({ default: 'rcalderin@gmail.com' })
  @IsEmail()
  email: string;
  @ApiProperty({ default: 'string' })
  @IsString()
  password: string;
  @ApiProperty({ default: `2023-02-14` })
  @IsString()
  birthdate: Date;
  @ApiProperty({ default: '4343524' })
  @IsString()
  identification: string;
  @ApiProperty({ default: 'backend developer' })
  @IsString()
  profession: string;
  @ApiProperty({ default: false })
  @IsBoolean()
  married: boolean;
  @ApiProperty({
    description: 'Monthly income as a decimal number',
    example: 2500.5,
  })
  @IsNumber()
  monthlyIncome: number;
  currentVehicle: Object;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
