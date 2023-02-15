import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { VehicleType } from 'src/utils/enum/vehicleType.enum';

export class CreateVehicleDto {
  @ApiProperty({ default: 'BRP39G' })
  @IsString()
  vehiclePlate: string;

  @ApiProperty({ default: 'HONDA' })
  @IsString()
  branch: string;

  @ApiProperty({ default: 'DIO' })
  @IsString()
  model: string;

  @ApiProperty({ default: 0 })
  @IsNumber()
  numberDoors: number;
  vehicleType: VehicleType;
}

export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {}
