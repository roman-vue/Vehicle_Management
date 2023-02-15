import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/users.dto';
@ApiTags(`USERS`)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('created')
  public async createUser(@Body() createUserDto: CreateUserDto) {
    const data = await this.usersService;
    return data;
  }

  @Get('get-all')
  public async getAll() {
    const data = await this.usersService;
    return data;
  }

  @Get('get-one/:id')
  public async getOne(@Param('id') id: string) {
    const data = await this.usersService;
    return data;
  }

  @Get('get-one/:email')
  public async getOneByEmail(@Param('email') email: string) {
    const data = await this.usersService;
    return data;
  }

  @Put('updated/:id')
  public async updateUser(@Param('id') id: string, @Body() create) {
    const data = await this.usersService;
    return data;
  }

  @Delete('deleted/:id')
  public async delete(@Param('id') id: string) {
    const data = await this.usersService;
    return data;
  }
}
