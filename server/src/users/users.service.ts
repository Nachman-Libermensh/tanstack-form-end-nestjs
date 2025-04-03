/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { User } from '@shared/user.interface'; // ייבוא ממשק המשתמש מהמודול המשותף
import { User } from './user.interface'; // ייבוא ממשק המשתמש מהמודול המקומי

@Injectable()
export class UsersService {
  private readonly users: User[] = []; // הגדרה מפורשת של טיפוס המערך

  create(createUserDto: CreateUserDto) {
    const newUser: User = {
      id: Date.now().toString(),
      ...createUserDto,
    };

    this.users.push(newUser);
    return {
      message: 'משתמש נוצר בהצלחה',
      user: newUser,
    };
  }

  findAll(): User[] {
    return this.users;
  }
}
