"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { useDirection } from "@/hooks/use-direction";

export function LoginFormCode() {
  // שינוי נתיב התרגומים כאן גם
  const t = useTranslations("examples.login");
  const direction = useDirection();

  return (
    <Card className="bg-card/60 backdrop-blur-sm">
      <div className="p-6">
        <Tabs defaultValue="form" dir={direction}>
          <TabsList className="mb-4">
            <TabsTrigger value="form">{t("codeTab.form")}</TabsTrigger>
            <TabsTrigger value="schema">{t("codeTab.schema")}</TabsTrigger>
            <TabsTrigger value="page">{t("codeTab.page")}</TabsTrigger>
          </TabsList>

          {/* שאר הקוד נשאר זהה */}
          <TabsContent value="form" className="mt-0">
            <pre className="p-4 rounded-lg bg-muted/80 overflow-auto text-sm">
              <code>{`"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { loginSchema } from "./schema";

export function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);
  
  const form = useForm({
    validatorAdapter: zodValidator,
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      setServerError(null);
      
      try {
        // Call your API
        const response = await loginUser(value);
        // Handle success
      } catch (error) {
        // Handle error
        setServerError(error.message);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      form.handleSubmit();
    }}>
      <FormField
        name="email"
        control={form.control}
        render={({ field, state }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            {state.meta.touchedErrors && (
              <FormMessage>{state.meta.touchedErrors}</FormMessage>
            )}
          </FormItem>
        )}
      />
      
      {/* Password field similar to above */}
      
      <Button type="submit" disabled={isSubmitting}>
        Login
      </Button>
    </form>
  );
}`}</code>
            </pre>
          </TabsContent>

          {/* שאר הקוד נשאר זהה */}
        </Tabs>
      </div>
    </Card>
  );
}
