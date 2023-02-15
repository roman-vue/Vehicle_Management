import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsDecimal,
  IsEmail,
  IsNumber,
  IsString,
} from 'class-validator';
import { BIKETYPE, VehicleType } from 'src/utils/enum/vehicleType.enum';

export class CreateVehicleDto {
  @ApiProperty({ default: 'BRP39G' })
  vehiclePlate: string;

  @ApiProperty({ default: 'HONDA' })
  branch: number;

  @ApiProperty({ default: 'DIO' })
  model: string;

  @ApiProperty({ default: 0 })
  numberDoors: number;

  @ApiProperty({ default: BIKETYPE.SCOOTER })
  vehicleType: VehicleType | BIKETYPE;
}

export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {}
