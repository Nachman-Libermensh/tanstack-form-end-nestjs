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
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Code, Info, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { useDirection } from "@/lib/direction";

export default function LoginFormExamplePage() {
  const t = useTranslations("examples.login");
  const direction = useDirection();

  return (
    <div className="relative w-full">
      {/* חזרה לעמוד הדוגמאות - שיפור מרווחים */}
      <div className="w-full px-4 sm:px-6 md:px-8 mx-auto max-w-7xl pt-4">
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link
            href="/examples"
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
          >
            {direction === "rtl" ? (
              <ArrowLeft className="h-4 w-4 rotate-180" />
            ) : (
              <ArrowLeft className="h-4 w-4" />
            )}
            <span>{t("backToExamples")}</span>
          </Link>
        </Button>
      </div>

      {/* כותרת ראשית - תיקון המרווחים */}
      <section className="w-full bg-muted/30 py-10 mb-10 border-y">
        <div className="w-full px-4 sm:px-6 md:px-8 mx-auto max-w-7xl">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-3">{t("title")}</h1>
            <p className="text-muted-foreground text-lg">{t("description")}</p>
          </motion.div>
        </div>
      </section>

      {/* תוכן העמוד - תיקון המרווחים */}
      <div className="w-full px-4 sm:px-6 md:px-8 mx-auto max-w-7xl pb-16">
        <Tabs defaultValue="preview" dir={direction} className="mb-12 w-full">
          <TabsList className="w-full max-w-md mb-6 grid grid-cols-2 mx-auto">
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              {t("preview")}
            </TabsTrigger>
            <TabsTrigger value="code" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              {t("code")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="space-y-6 w-full">
            <Card className="bg-card/60 backdrop-blur-sm border shadow-sm w-full max-w-4xl mx-auto">
              <CardHeader className="pb-2 border-b">
                <CardTitle className="text-xl">{t("loginFormTitle")}</CardTitle>
                <CardDescription>{t("loginFormDescription")}</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="max-w-md mx-auto">
                  <LoginForm />
                </div>
              </CardContent>
              <CardFooter className="flex justify-center text-xs text-muted-foreground pt-2 pb-4">
                {t("securityNotice")}
              </CardFooter>
            </Card>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex gap-3 shadow-sm max-w-4xl mx-auto">
              <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium mb-1">{t("tipTitle")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("tipDescription")}
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="code" className="w-full">
            <div className="max-w-4xl mx-auto">
              <LoginFormCode />
            </div>
          </TabsContent>
        </Tabs>

        <Separator className="my-10" />

        {/* תכונות מרכזיות - שיפור המרווחים */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full"
        >
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 pb-2 border-b max-w-7xl mx-auto">
            <span className="h-7 w-1 bg-primary rounded-full"></span>
            {t("keyFeaturesTitle")}
          </h2>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
            {[
              "validation",
              "errorHandling",
              "typeInference",
              "reusability",
            ].map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              >
                <Card className="bg-card/70 backdrop-blur-sm h-full border hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-primary/90 text-primary-foreground flex items-center justify-center text-sm">
                        {index + 1}
                      </div>
                      {t(`features.${feature}.title`)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {t(`features.${feature}.description`)}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* קישורים לדוגמאות נוספות - שיפור המרווחים */}
        <div className="mt-16 bg-muted/30 rounded-lg p-6 border max-w-7xl mx-auto">
          <h3 className="text-lg font-medium mb-4">
            {t("exploreMoreExamples")}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {["contact", "multistep", "fileupload"].map((example) => (
              <Button
                key={example}
                variant="outline"
                className="justify-start"
                asChild
              >
                <Link href={`/examples/${example}`}>
                  {t(`more.${example}`)}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
