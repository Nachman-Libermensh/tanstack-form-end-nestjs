// import { PickType } from '@nestjs/mapped-types';
import { PickType } from '@nestjs/swagger'; // ייבוא PickType מ-NestJS Swagger
import { CreateUserDto } from './create-user.dto';

// לקיחת שדה האימייל בלבד מ-CreateUserDto
export class ValidateEmailDto extends PickType(CreateUserDto, [
  'email',
] as const) {}

// DTO לתגובה לבדיקת אימייל
export class ValidateEmailResponseDto {
  valid: boolean;
  message?: string;
}
