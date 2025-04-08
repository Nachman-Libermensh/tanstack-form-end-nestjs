"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { useDirection } from "@/hooks/use-direction";
import { CodeBlock } from "@/components/ui/code-block";

export function LoginFormCode() {
  // שינוי נתיב התרגומים כאן גם
  const tLogin = useTranslations("examples.login");
  const t = useTranslations("examples.login.form");
  const direction = useDirection();

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
  const dtoCode = `// Your page code will go here`;
  // Add schema and page code variables here when available

  return (
    <Card className="bg-card/60 backdrop-blur-sm">
      <div className="p-6">
        <Tabs defaultValue="form" dir={direction}>
          <TabsList className="mb-4">
            <TabsTrigger value="form">{tLogin("codeTab.form")}</TabsTrigger>
            <TabsTrigger value="schema">{tLogin("codeTab.schema")}</TabsTrigger>
            <TabsTrigger value="page">{tLogin("codeTab.page")}</TabsTrigger>
          </TabsList>

          <TabsContent value="form" className="mt-0">
            <CodeBlock
              language="tsx"
              filename="login-form.tsx"
              code={formCode}
            />
          </TabsContent>

          <TabsContent value="schema" className="mt-0">
            <CodeBlock language="tsx" filename="schema.ts" code={schemaCode} />
          </TabsContent>

          <TabsContent value="page" className="mt-0">
            <CodeBlock language="ts" filename="login.dto.ts" code={dtoCode} />
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
}
