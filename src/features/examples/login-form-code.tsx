"use client";

import { Card } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { CodeBlock } from "@/components/ui/code-block";

export function LoginFormCode() {
  // שינוי נתיב התרגומים כאן גם
  const t = useTranslations("examples.login.form");

  const formCode = `export default function LoginForm() {
    const defaultValues = {
      email: "",
      password: "",
    };
  
    const handleSubmit = (data: ILoginData) => {
      // Handle login logic here
      console.log("Login data:", data);
    };
    const form = useAppForm({
      defaultValues,
      validators: {
        onChange: loginSchema,
      },
      onSubmit: ({ value }) => {
        handleSubmit(value);
      },
    });
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.FormLayout>
          {/* פרטים אישיים */}
          <form.FormSection title={"${t("personalDetails")}"}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <form.AppField
                name="email"
                children={(field) => (
                  <field.TextField
                    label={"${t("emailLabel")}"}
                    placeholder={"${t("emailPlaceholder")}"}
                    autoComplete="email"
                    type="email"
                  />
                )}
              />
              <form.AppField
                name="password"
                children={(field) => (
                  <field.PasswordInput
                    label="${t("passwordLabel")}"}
                    placeholder={"${t("passwordPlaceholder")}"}
                    // autoComplete="current-password"
                  />
                )}
              />
            </div>
          </form.FormSection>
  
          <div className="flex justify-end gap-3 mt-2">
            <Button variant="outline" className="min-w-[100px]">
              ${t("cancel")}
            </Button>
            <Button type="submit" className="min-w-[100px]">
            ${t("submit")}
            </Button>
          </div>
        </form.FormLayout>
      </form>
    );
  }`;

  const schemaCode = `const loginSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(100, "Password is too long"),
  });
  type ILoginData = z.infer<typeof loginSchema>;`;
  const dtoCode = `import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'User email address',
    required: true
  })
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  @Transform(({ value }) => typeof value === 'string' ? value.trim().toLowerCase() : value)
  email: string;

  @ApiProperty({
    example: 'securePassword123',
    description: 'User password',
    required: true,
    minLength: 6,
    maxLength: 100
  })
  @IsString()
  @Length(6, 100, { 
    message: (args) => args.constraints[0] === args.value.length 
      ? 'Password must be at least 6 characters' 
      : 'Password is too long'
  })
  password: string;
}

// Usage in controller
@Post('login')
async login(@Body() loginDto: LoginDto) {
  // Body is automatically validated thanks to ValidationPipe
  return this.authService.login(loginDto);
}

// Optional - validation pipe setup in main.ts
app.useGlobalPipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true
  })
);
  `;
  // Add schema and page code variables here when available

  return (
    <Card className="bg-card/60">
      <div className="px-6">
        <CodeBlock
          language="tsx"
          filename="login-form"
          tabs={[
            {
              name: "client/login-form.tsx",
              code: formCode,
              highlightLines: [11, 12, 13, 14, 15, 16, 17, 18, 19],
              language: "tsx",
            },
            {
              name: "server/login.dto.ts",
              code: dtoCode,
              // highlightLines: [1, 2, 3, 4, 5, 6, 7, 8, 9],
              language: "ts",
            },
            {
              name: "shared/login.schema.ts",
              code: schemaCode,
              highlightLines: [8],
            },
          ]}
        />
      </div>
    </Card>
  );
}
