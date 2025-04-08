"use client";

import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Link } from "@/i18n/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDirection } from "@/hooks/use-direction";
import SimpleUserForm from "@/components/pages/examples/user-form";

export default function Home() {
  const t = useTranslations("home");
  const [open, setOpen] = useState(false);
  const direction = useDirection();
  return (
    <>
      {/* Main Content */}
      <main className="flex-1 w-full">
        {/* Hero Section - אינו מסתיר את הרקע */}
        <section className="py-12 md:py-16 px-4 md:px-6 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t("title")}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            {t("description")}
          </p>
          <p className="text-base max-w-2xl mx-auto">{t("intro")}</p>
        </section>

        {/* Technologies Section - עם רקע שקוף */}
        <section className="py-10 px-4 md:px-6">
          <div className="max-w-5xl mx-auto bg-background/60 backdrop-blur-sm rounded-lg p-6 border">
            <h2 className="text-2xl font-semibold mb-6">{t("title")}</h2>
            <ul className="grid sm:grid-cols-2 gap-4">
              {["tanstack", "nestjs", "typescript", "zod"].map((tech) => (
                <li key={tech} className="bg-card/80 p-4 rounded-lg border">
                  <h3 className="font-medium text-lg mb-2">
                    {t(`technologies.${tech}.name`)}
                  </h3>
                  <p className="text-muted-foreground">
                    {t(`technologies.${tech}.description`)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Goals Section - רקע עדין */}
        <section className="py-10 px-4 md:px-6 bg-secondary/5">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              {t("goals.title")}
            </h2>
            <div className="space-y-4">
              {[
                "unified_api",
                "consistent_validation",
                "generic_components",
                "code_sharing",
              ].map((goal, index) => (
                <Card
                  key={goal}
                  className="overflow-hidden bg-card/80 backdrop-blur-sm"
                >
                  <CardContent className="p-4">
                    <h3 className="text-lg font-medium mb-2 flex items-center gap-3">
                      <span className="inline-flex w-8 h-8 bg-primary/90 text-primary-foreground rounded-full items-center justify-center shrink-0">
                        {index + 1}
                      </span>
                      <span>{t(`goals.items.${goal}.title`)}</span>
                    </h3>
                    <p className="text-muted-foreground rtl:pr-11 ltr:pl-11">
                      {t(`goals.items.${goal}.description`)}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Form examples section - רקע שקוף חלקית */}
        <section className="py-10 px-4 md:px-6">
          <div className="max-w-6xl mx-auto bg-background/70 backdrop-blur-sm rounded-lg p-6 border">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              {t("examples.title")}
            </h2>

            <Tabs dir={direction} defaultValue="basic" className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="basic">{t("categories.basic")}</TabsTrigger>
                <TabsTrigger value="advanced">
                  {t("categories.advanced")}
                </TabsTrigger>
                <TabsTrigger value="complex">
                  {t("categories.complex")}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="basic">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Basic form examples will go here */}
                  {["login", "contact", "subscribe"].map((form) => (
                    <Card key={form} className="overflow-hidden bg-card/80">
                      <CardHeader className="p-4">
                        <CardTitle className="text-md">
                          {t(`examples.basic.${form}.title`)}
                        </CardTitle>
                        <CardDescription>
                          {t(`examples.basic.${form}.description`)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <Button size="sm" className="w-full" asChild>
                          <Link href={`/examples/${form}`}>
                            {t("viewExample")}
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="advanced">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Advanced form examples will go here */}
                  {["multistep", "fileupload", "dynamic"].map((form) => (
                    <Card key={form} className="overflow-hidden bg-card/80">
                      <CardHeader className="p-4">
                        <CardTitle className="text-md">
                          {t(`examples.advanced.${form}.title`)}
                        </CardTitle>
                        <CardDescription>
                          {t(`examples.advanced.${form}.description`)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <Button size="sm" className="w-full" asChild>
                          <Link href={`/examples/${form}`}>
                            {t("viewExample")}
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="complex">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Complex form examples will go here */}
                  {["nested", "conditional", "wizard"].map((form) => (
                    <Card key={form} className="overflow-hidden bg-card/80">
                      <CardHeader className="p-4">
                        <CardTitle className="text-md">
                          {t(`examples.complex.${form}.title`)}
                        </CardTitle>
                        <CardDescription>
                          {t(`examples.complex.${form}.description`)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <Button size="sm" className="w-full" asChild>
                          <Link href={`/examples/${form}`}>
                            {t("viewExample")}
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Live Demo Section */}
        <section className="py-12 px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold mb-6">{t("liveDemo")}</h3>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="px-8">
                  {t("viewUserFormExample")}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>{t("userFormWithTanStack")}</DialogTitle>
                </DialogHeader>
                <SimpleUserForm />
              </DialogContent>
            </Dialog>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t py-6 bg-background/60 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row justify-between items-center px-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {t("footer.copyright")}
          </p>
          <div className="flex gap-6 mt-3 md:mt-0">
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("footer.documentation")}
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("footer.contribute")}
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("footer.license")}
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
