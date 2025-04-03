import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserResponse } from 'shared'; // ייבוא הטיפוסים מהחבילה המשותפת

@Injectable()
export class UsersService {
  private readonly users: User[] = []; // כעת השירות מכיר את טיפוס User מהחבילה המשותפת

  create(createUserDto: CreateUserDto): UserResponse {
    // יצירת משתמש חדש - ללא שמירת הסיסמה בתוך המערך
    const newUser: User = {
      id: Date.now().toString(),
      name: createUserDto.name,
      email: createUserDto.email,
      password: 'hashed_password', // בפרויקט אמיתי היית מצפין את הסיסמה כאן
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

  findByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }

  findById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  validateEmail(email: string): { valid: boolean; message?: string } {
    const existingUser = this.findByEmail(email);
    if (existingUser) {
      return { valid: false, message: 'כתובת האימייל כבר קיימת במערכת' };
    }
    return { valid: true };
  }
}
