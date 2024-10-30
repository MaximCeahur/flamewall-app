import { Controller, Get, Post, Body, Put, Param, Delete, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ReadUserDto } from './dto/read-user.dto';
import { ApiOperation, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { UseGuards } from '@nestjs/common';

@ApiTags('Users')

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation ({ summary: 'Create a user' })
  @ApiOkResponse ({ status: 201, description: "User created successfully", type: ReadUserDto })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto); 
  }

  @Get()
  @ApiOperation ({ summary: 'Get all users' })
  @ApiOkResponse ({ status: 201, description: "Users received successfully", type: ReadUserDto })
  async findAll(): Promise<ReadUserDto[]> {
    const users = await this.usersService.findAll();
    return users.map(user => new ReadUserDto(user)); // Преобразуем в DTO
  }

  @Get(':id')
  @ApiOperation ({ summary: 'Get user by id' })
  @ApiOkResponse ({ status: 201, description: "User received successfully", type: ReadUserDto })
  async findOne(@Param('id') id: string): Promise<ReadUserDto> {
    const user = await this.usersService.findOne(+id);
    return new ReadUserDto(user);  // Преобразуем в DTO
  }

  @Put(':id')
  @ApiOperation ({ summary: 'Update a user' })
  @ApiOkResponse ({ status: 201, description: "User updated successfully", type: ReadUserDto })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')  @ApiOperation ({ summary: 'Get all users' })
  @ApiOkResponse ({ status: 201, description: "User deleted successfully", type: ReadUserDto })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
