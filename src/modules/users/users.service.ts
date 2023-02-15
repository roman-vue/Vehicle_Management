import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, Users } from 'src/database/schemas/Users/users.schema';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<UserDocument>,
  ) {}

  public async created(createUserDto: CreateUserDto) {
    createUserDto.currentVehicle = null;
    createUserDto.password = await this.hash(createUserDto.password);
    const newUser = new this.userModel(createUserDto);
    const save = newUser.save();
    return save;
  }

  public async getAll() {
    const find = await this.userModel.find();
    return find;
  }

  public async getOneById(id: string) {
    const find = await this.userModel.findOne({ id: id });
    if (!find) {
      throw new NotFoundException(`este usuario ${id} no existe`);
    }
    return find;
  }

  public async getOneByEmail(email: string) {
    const find = await this.userModel.findOne({ email: email });
    if (!find) {
      throw new NotFoundException(`este usuario ${email} no existe`);
    }
    return find;
  }

  public async update(
    id: string,
    {
      name,
      lastName,
      age,
      email,
      identification,
      birthdate,
      profession,
      married,
      monthlyIncome,
    }: UpdateUserDto,
  ) {
    const verifyId = await this.getOneById(id);
    verifyId.name = name;
    verifyId.lastName = lastName;
    verifyId.age = age;
    verifyId.email = email;
    verifyId.identification = identification;
    verifyId.birthdate = birthdate;
    verifyId.profession = profession;
    verifyId.married = married;
    verifyId.monthlyIncome = monthlyIncome;
    const updateUser = new this.userModel(verifyId);
    const save = updateUser.save();
    return save;
  }

  public async delete(id: string) {
    const verifyId = await this.getOneById(id);
    const deleted = await this.userModel.remove(verifyId);
    return deleted;
  }

  private async hash(password) {
    const encrypted = await bcrypt.hash(password, 10);
    return encrypted;
  }
}
