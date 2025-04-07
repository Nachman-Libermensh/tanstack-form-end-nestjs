import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("playground.title"),
    description: t("playground.description"),
  };
}

const page = () => {
  return <div>page</div>;
};
export default page;
