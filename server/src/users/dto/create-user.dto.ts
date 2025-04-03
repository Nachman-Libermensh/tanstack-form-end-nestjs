import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Matches,
} from 'class-validator';
import { CreateUser } from 'shared'; // ייבוא הממשק מהחבילה המשותפת

// DTO ליצירת משתמש - משתמש בולידטורים של class-validator לתיקוף בצד השרת
export class CreateUserDto implements Omit<CreateUser, 'confirmPassword'> {
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
}
