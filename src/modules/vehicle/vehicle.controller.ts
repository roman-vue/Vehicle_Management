import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto, UpdateVehicleDto } from './dto/vehicle.dto';
import { VehicleType } from 'src/utils/enum/vehicleType.enum';
import { AccessGuard } from 'src/guards/access.guard';

@ApiTags(`VEHICLE`)
@ApiBearerAuth()
@UseGuards(AccessGuard)
@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Patch(`assig-vehicle-to-user/:idUser/:idVehicle`)
  public async assigVehicle(
    @Param(`idUser`) idUser: string,
    @Param(`idVehicle`) idVehicle: string,
  ) {
    const data = await this.vehicleService.assignVehicle(idUser, idVehicle);
    return data;
  }

  @Post('created-vehicle')
  @ApiQuery({ name: 'type', enum: VehicleType })
  public async createVehicles(
    @Query('type') type: VehicleType,
    @Body() createVehicleDto: CreateVehicleDto,
  ) {
    const data = await this.vehicleService.created(type, createVehicleDto);
    return data;
  }

  @Get('get-all')
  public async getAll() {
    const data = await this.vehicleService.getAll();
    return data;
  }

  @Get('get-one/:id')
  public async getOne(@Param('id') id: string) {
    const data = await this.vehicleService.getOneById(id);
    return data;
  }

  @Get('get-one/:vehiclePlate')
  public async getOneByVehiclePlate(
    @Param('vehiclePlate') vehiclePlate: string,
  ) {
    const data = await this.vehicleService.getOneByVehiclePlate(vehiclePlate);
    return data;
  }

  @Put('updated/:id')
  @ApiQuery({ name: 'type', enum: VehicleType })
  public async updateUser(
    @Query('type') type: VehicleType,
    @Param('id') id: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ) {
    const data = await this.vehicleService.update(type, id, updateVehicleDto);
    return data;
  }

  @Delete('deleted/:id')
  public async delete(@Param('id') id: string) {
    const data = await this.vehicleService.delete(id);
    return data;
  }
}
