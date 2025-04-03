import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ValidateEmailDto } from './dto/validate-email.dto';
import { User, UserResponse } from 'shared';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): UserResponse {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(): User[] {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): User | undefined {
    return this.usersService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    // כאן תוכל להוסיף לוגיקת עדכון
    // בדוגמה פשוטה זו היא לא מיושמת
  }

  @Post('validate-email')
  validateEmail(@Body() validateEmailDto: ValidateEmailDto) {
    return this.usersService.validateEmail(validateEmailDto.email);
  }
}
