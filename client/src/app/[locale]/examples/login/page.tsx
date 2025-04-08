"use client";

import { useTranslations } from "next-intl";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "./login-form";
import { LoginFormCode } from "./login-form-code";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDirection } from "@/hooks/use-direction";
import { Separator } from "@/components/ui/separator";
import { Info } from "lucide-react";

export default function LoginFormExamplePage() {
  // שינוי: שימוש בנתיב המתאים בדיוק למבנה קובץ התרגומים
  const t = useTranslations("examples.login");
  const direction = useDirection();

  console.log("Current translations path:", "login");
  console.log("Translation title test:", t("title"));

  return (
    <div className="container max-w-6xl py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t("title")}</h1>
        <p className="text-muted-foreground text-lg max-w-3xl">
          {t("description")}
        </p>
      </div>

      <Tabs defaultValue="preview" dir={direction} className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="preview">{t("preview")}</TabsTrigger>
          <TabsTrigger value="code">{t("code")}</TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="space-y-6">
          <Card className="bg-card/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>{t("loginFormTitle")}</CardTitle>
              <CardDescription>{t("loginFormDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-w-md mx-auto">
                <LoginForm />
              </div>
            </CardContent>
          </Card>

          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex gap-3">
            <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium mb-1">{t("tipTitle")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("tipDescription")}
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="code">
          <LoginFormCode />
        </TabsContent>
      </Tabs>

      <Separator className="my-8" />

      <h2 className="text-2xl font-semibold mb-4">{t("keyFeaturesTitle")}</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {["validation", "errorHandling", "typeInference", "reusability"].map(
          (feature) => (
            <Card key={feature} className="bg-card/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">
                  {t(`features.${feature}.title`)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t(`features.${feature}.description`)}
                </p>
              </CardContent>
            </Card>
          )
        )}
      </div>
    </div>
  );
}
