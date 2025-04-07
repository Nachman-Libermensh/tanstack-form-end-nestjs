import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Props = {
  params: { locale: string; form: string };
};

export async function generateMetadata({
  params: { locale, form },
}: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });

  // מיפוי דינמי של סוג הטופס לקטגוריה שלו
  const category = ["login", "contact", "subscribe"].includes(form)
    ? "basic"
    : ["multistep", "fileupload", "dynamic"].includes(form)
    ? "advanced"
    : "complex";

  return {
    title: t(`examples.${category}.${form}.title`),
    description: t(`examples.${category}.${form}.description`),
  };
}

// יתר קוד הדף
const page = () => {
  return <div>page</div>;
};
export default page;
