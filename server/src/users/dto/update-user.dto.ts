// import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger'; // ייבוא PartialType מ-NestJS Swagger

import { CreateUserDto } from './create-user.dto';

// הרחבה של CreateUserDto עם כל השדות אופציונליים
export class UpdateUserDto extends PartialType(CreateUserDto) {}
