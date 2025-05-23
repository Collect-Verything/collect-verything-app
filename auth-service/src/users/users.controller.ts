import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { SuperAdminGuards } from '../auth/guards/super-admin';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { configEnv } from '../../env-config';

@Controller(configEnv.AUTH_URL_USERS)
@ApiTags(configEnv.AUTH_URL_USERS)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(SuperAdminGuards)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: UserEntity })
  async create(@Body() createUserDto: CreateUserDto) {
    return new UserEntity(await this.usersService.create(createUserDto));
  }

  @Post('job')
  @UseGuards(SuperAdminGuards)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: UserEntity })
  async createJobber(@Body() createUserDto: CreateUserDto) {
    return new UserEntity(await this.usersService.createJobber(createUserDto));
  }

  // Simple user only
  @Get()
  @UseGuards(SuperAdminGuards)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async findAll() {
    const users = await this.usersService.findAll();
    return users.map((user) => new UserEntity(user));
  }

  @Get('jobs')
  @UseGuards(SuperAdminGuards)
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async findAllByJob() {
    const users = await this.usersService.findAllUserJob();
    return users.map((user) => new UserEntity(user));
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return new UserEntity(await this.usersService.findOne(id));
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: UserEntity })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return new UserEntity(await this.usersService.update(id, updateUserDto));
  }

  @Patch('stripe-user/:userId/:stripeId')
  @ApiCreatedResponse({ type: UserEntity })
  @ApiBearerAuth()
  async updateStripeUserId(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('stripeId') stripeId: string
  ) {
    return this.usersService.updateUserIdStripe(userId, stripeId);
  }

  @Patch('password/:id')
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: UserEntity })
  async updatePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePasswordDto: UpdateUserPasswordDto
  ) {
    return new UserEntity(await this.usersService.updatePassword(id, updatePasswordDto));
  }

  @Delete(':id')
  @UseGuards(SuperAdminGuards)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new UserEntity(await this.usersService.remove(id));
  }
}
