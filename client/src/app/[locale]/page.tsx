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
import { motion } from "framer-motion";
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
    },
  }),
};

export default function Home() {
  const t = useTranslations("home");
  const [open, setOpen] = useState(false);
  const direction = useDirection();

  return (
    <main className="flex-1 w-full">
      <section className="relative py-20 px-4 md:px-6 text-center overflow-hidden">
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          {t("title")}
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          {t("description")}
        </motion.p>
        <motion.p
          className="text-base max-w-xl mx-auto"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          {t("intro")}
        </motion.p>
      </section>

      <section className="py-16 px-4 md:px-6">
        <motion.div
          className="max-w-5xl mx-auto bg-background/60 backdrop-blur-sm rounded-xl p-6 border"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">
            {t("technologiesTitle")}
          </h2>
          <ul className="grid sm:grid-cols-2 gap-4">
            {["tanstack", "nestjs", "typescript", "zod"].map((tech, i) => (
              <motion.li
                key={tech}
                className="bg-card/80 p-4 rounded-lg border"
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                custom={i + 1}
              >
                <h3 className="font-medium text-lg mb-2">
                  {t(`technologies.${tech}.name`)}
                </h3>
                <p className="text-muted-foreground">
                  {t(`technologies.${tech}.description`)}
                </p>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </section>

      <section className="py-16 px-4 md:px-6 bg-secondary/10">
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
            ].map((goal, i) => (
              <motion.div
                key={goal}
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                custom={i + 1}
              >
                <Card className="overflow-hidden bg-card/80 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-medium mb-2 flex items-center gap-3">
                      <span className="inline-flex w-8 h-8 bg-primary/90 text-primary-foreground rounded-full items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      {t(`goals.items.${goal}.title`)}
                    </h3>
                    <p className="text-muted-foreground rtl:pr-11 ltr:pl-11">
                      {t(`goals.items.${goal}.description`)}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 md:px-6">
        <motion.div
          className="max-w-6xl mx-auto bg-background/70 backdrop-blur-sm rounded-lg p-6 border"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={1}
        >
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

            {[
              { key: "basic", forms: ["login", "contact", "subscribe"] },
              {
                key: "advanced",
                forms: ["multistep", "fileupload", "dynamic"],
              },
              { key: "complex", forms: ["nested", "conditional", "wizard"] },
            ].map(({ key, forms }) => (
              <TabsContent key={key} value={key}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {forms.map((form, i) => (
                    <motion.div
                      key={form}
                      variants={fadeIn}
                      initial="hidden"
                      animate="visible"
                      custom={i + 1}
                    >
                      <Card className="overflow-hidden bg-card/80">
                        <CardHeader className="p-4">
                          <CardTitle className="text-md">
                            {t(`examples.${key}.${form}.title`)}
                          </CardTitle>
                          <CardDescription>
                            {t(`examples.${key}.${form}.description`)}
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
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </section>

      <section className="py-20 px-4 md:px-6 text-center">
        <motion.div
          className="max-w-3xl mx-auto"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={1}
        >
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
        </motion.div>
      </section>
    </main>
  );
}
