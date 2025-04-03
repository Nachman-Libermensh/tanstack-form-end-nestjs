import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Matches,
  matches,
} from 'class-validator';
import { CreateUser } from 'shared'; // ייבוא הממשק מהחבילה המשותפת
import { Match } from 'src/validators/match';

// DTO ליצירת משתמש - משתמש בולידטורים של class-validator לתיקוף בצד השרת
export class CreateUserDto implements CreateUser {
  @IsNotEmpty({ message: 'שם הוא שדה חובה' })
  @IsString({ message: 'שם חייב להיות טקסט' })
  @MinLength(2, { message: 'שם חייב להכיל לפחות 2 תווים' })
  name: string;

  @IsNotEmpty({ message: 'אימייל הוא שדה חובה' })
  @IsEmail({}, { message: 'כתובת האימייל אינה תקינה' })
  email: string;

  @IsNotEmpty({ message: 'סיסמה היא שדה חובה' })
  @MinLength(8, { message: 'הסיסמה חייבת להכיל לפחות 8 תווים' })
  @Matches(/[A-Z]/, { message: 'הסיסמה חייבת להכיל לפחות אות גדולה אחת' })
  @Matches(/[0-9]/, { message: 'הסיסמה חייבת להכיל לפחות ספרה אחת' })
  password: string;

  @IsNotEmpty({ message: 'אימות סיסמה הוא שדה חובה' })
  @MinLength(8, { message: 'אימות סיסמה חייב להכיל לפחות 8 תווים' })
  @Match('password', { message: 'הסיסמאות חייבות להיות זהות' })
  confirmPassword: string;
}
