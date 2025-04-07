/* eslint-disable @typescript-eslint/no-unused-vars */
import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
const namespaces = ['common', 'home', 'about', 'navigation'] as const;

const loadNamespaceMessages = async (locale: string, namespace: string) => {
  try {
    return (await import(`../../messages/${locale}/${namespace}.json`)).default;
  } catch (error) {
    console.error(`Failed to load namespace "${namespace}" for locale "${locale}"`, error);
    return {};
  }
};
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  // Load all namespace messages in parallel
  const namespacesMessages = await Promise.all(
    namespaces.map(async (namespace) => ({
      [namespace]: await loadNamespaceMessages(locale, namespace)
    }))
  );

  // Merge all namespace messages
  const messages = namespacesMessages.reduce((acc, curr) => ({
    ...acc,
    ...curr
  }), {});

  return {
    locale,
    messages,
  };
});

const loadMessagesFromDB = async (locale: string, namespace: string) => {
  try {
    // First try to load from static files
    const staticMessages = (await import(`../../messages/${locale}/${namespace}.json`)).default;
    
    // Then try to load from API
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/translations/${locale}/${namespace}`,
      { next: { revalidate: 3600 } }
    );
    
    if (!response.ok) {
      return staticMessages;
    }
    
    const { translations } = await response.json();
    
    // Merge static and dynamic translations
    return {
      ...staticMessages,
      ...translations
    };
    
  } catch (error) {
    console.error(`Failed to load namespace "${namespace}" for locale "${locale}"`, error);
    return {};
  }
};
