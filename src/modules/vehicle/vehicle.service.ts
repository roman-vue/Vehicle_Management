import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Vehicle,
  VehicleDocument,
} from 'src/database/schemas/Vehicle/vehicle.schema';
import { CreateVehicleDto, UpdateVehicleDto } from './dto/vehicle.dto';
import { VehicleType } from 'src/utils/enum/vehicleType.enum';
import { UsersService } from '../users/users.service';
import {
  History,
  HistoryDocument,
} from 'src/database/schemas/History/History.schema';
import { UserDocument, Users } from 'src/database/schemas/Users/users.schema';

@Injectable()
export class VehicleService {
  constructor(
    @InjectModel(History.name)
    private readonly historyModel: Model<HistoryDocument>,
    @InjectModel(Vehicle.name)
    private readonly vehicleModel: Model<VehicleDocument>,
    @InjectModel(Users.name)
    private readonly usersModel: Model<UserDocument>,
  ) {}

  public async assignVehicle(idUser: string, idVehicle) {
    const verifyIdUser = await this.usersModel.findOne({ id: idUser });
    const verifyIdVehicle = await this.getOneById(idVehicle);
    verifyIdUser.currentVehicle = verifyIdVehicle;
    let history = await this.historyModel.findOne({ name: verifyIdUser.name });
    if (history == null) {
      let newHistory = {
        name: verifyIdUser.name,
        lastName: verifyIdUser.lastName,
        history: [verifyIdVehicle],
      };
      const saveHistory = new this.historyModel(newHistory);
      await saveHistory.save();
    } else {
      history.history.push(verifyIdVehicle);
      const saveHistory = new this.historyModel(history);
      await saveHistory.save();
    }
    const assign = new this.usersModel(verifyIdUser);
    const save = await assign.save();
  }

  public async created(type: VehicleType, createVehicleDto: CreateVehicleDto) {
    createVehicleDto.vehicleType = type;
    const newVehicle = new this.vehicleModel(createVehicleDto);
    const save = newVehicle.save();
    return save;
  }

  public async getAll() {
    const find = await this.vehicleModel.find();
    return find;
  }

  public async getOneById(id: string) {
    const find = await this.vehicleModel.findOne({ id: id });
    if (!find) {
      throw new NotFoundException(`este vehiculo ${id} no existe`);
    }
    return find;
  }

  public async getOneByVehiclePlate(vehiclePlate: string) {
    const find = await this.vehicleModel.findOne({
      vehiclePlate: vehiclePlate,
    });
    if (!find) {
      throw new NotFoundException(`este vehiculo ${vehiclePlate} no existe`);
    }
    return find;
  }

  public async update(
    type: VehicleType,
    id: string,
    { vehiclePlate, branch, model, numberDoors, vehicleType }: UpdateVehicleDto,
  ) {
    const verifyId = await this.getOneById(id);
    verifyId.vehiclePlate = vehiclePlate;
    verifyId.branch = branch;
    verifyId.model = model;
    verifyId.numberDoors = numberDoors;
    verifyId.vehicleType = type;
    const updateVehicle = new this.vehicleModel(verifyId);
    const save = updateVehicle.save();
    return save;
  }

  public async delete(id: string) {
    const verifyId = await this.getOneById(id);
    const deleted = await this.vehicleModel.remove(verifyId);
    return deleted;
  }
}
