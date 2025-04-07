/* eslint-disable @typescript-eslint/no-unused-vars */
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
import Link from "next/link";
import UserForm from "@/components/form/examples/user-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDirection } from "@/hooks/use-direction";

export default function Home() {
  const t = useTranslations("home");
  const [open, setOpen] = useState(false);
  const direction = useDirection();
  return (
    <>
      {/* Main Content */}
      <main className="flex-1 w-full">
        <div className="w-full px-0">
          <Card className="rounded-none border-x-0">
            <CardHeader className="px-4 md:px-6">
              <CardTitle className="text-center text-2xl sm:text-3xl">
                {t("title")}
              </CardTitle>
              <CardDescription className="text-center text-base sm:text-lg">
                {t("description")}
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 md:px-6">
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-base">{t("intro")}</p>

                {/* List of technologies */}
                <ul className="my-6 list-disc pl-6 space-y-2">
                  {["tanstack", "nestjs", "typescript", "zod"].map((tech) => (
                    <li key={tech}>
                      <strong>{t(`technologies.${tech}.name`)}</strong> -{" "}
                      {t(`technologies.${tech}.description`)}
                    </li>
                  ))}
                </ul>

                <h3 className="text-xl font-semibold mt-8 mb-4">
                  {t("goals.title")}
                </h3>

                {/* Ordered list of goals */}
                <ol className="list-decimal pl-6 space-y-3">
                  {[
                    "unified_api",
                    "consistent_validation",
                    "generic_components",
                    "code_sharing",
                  ].map((goal, index) => (
                    <li key={goal}>
                      <strong>{t(`goals.items.${goal}.title`)}</strong> -{" "}
                      {t(`goals.items.${goal}.description`)}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Form examples section */}
              <div className="mt-10">
                <h2 className="text-2xl font-semibold mb-6 text-center">
                  {t("examples.title")}
                </h2>

                <Tabs dir={direction} defaultValue="basic" className="w-full">
                  <TabsList className="grid grid-cols-3 mb-6">
                    <TabsTrigger value="basic">
                      {t("categories.basic")}
                    </TabsTrigger>
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
                        <Card key={form} className="overflow-hidden">
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
                        <Card key={form} className="overflow-hidden">
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
                        <Card key={form} className="overflow-hidden">
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

              <div className="mt-10 pb-4 text-center">
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
                    <UserForm />
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t py-6 bg-muted/20">
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
