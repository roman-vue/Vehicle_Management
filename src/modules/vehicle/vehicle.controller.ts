import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/vehicle.dto';

@ApiTags(`VEHICLE`)
@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post('created')
  public async createVehicle(@Body() createVehicleDto: CreateVehicleDto) {
    const data = await this.vehicleService;
    return data;
  }

  @Get('get-all')
  public async getAll() {
    const data = await this.vehicleService;
    return data;
  }

  @Get('get-one/:id')
  public async getOne(@Param('id') id: string) {
    const data = await this.vehicleService;
    return data;
  }

  @Get('get-one/:vehiclePlate')
  public async getOneByVehiclePlate(
    @Param('vehiclePlate') vehiclePlate: string,
  ) {
    const data = await this.vehicleService;
    return data;
  }

  @Put('updated/:id')
  public async updateUser(@Param('id') id: string, @Body() create) {
    const data = await this.vehicleService;
    return data;
  }

  @Delete('deleted/:id')
  public async delete(@Param('id') id: string) {
    const data = await this.vehicleService;
    return data;
  }
}
