import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBasicAuth, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
import { AccessGuard } from 'src/guards/access.guard';
@ApiTags(`USERS`)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('created')
  public async createUser(@Body() createUserDto: CreateUserDto) {
    const data = await this.usersService.created(createUserDto);
    return data;
  }
  @ApiBearerAuth()
  @UseGuards(AccessGuard)
  @Get('get-all')
  public async getAll() {
    const data = await this.usersService.getAll();
    return data;
  }

  @Get('get-one/:id')
  public async getOne(@Param('id') id: string) {
    const data = await this.usersService.getOneById(id);
    return data;
  }

  @Get('get-one/:email')
  public async getOneByEmail(@Param('email') email: string) {
    const data = await this.usersService.getOneByEmail(email);
    return data;
  }

  @Put('updated/:id')
  public async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const data = await this.usersService.update(id, updateUserDto);
    return data;
  }

  @Delete('deleted/:id')
  public async delete(@Param('id') id: string) {
    const data = await this.usersService.delete(id);
    return data;
  }
}
