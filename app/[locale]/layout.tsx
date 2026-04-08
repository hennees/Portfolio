import type { Metadata } from "next";
import { Archivo, Space_Grotesk } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Patrick Hennes — UI/UX Designer & Freelancer",
  description:
    "Austrian freelance UI/UX designer and developer based in Vienna. Crafting interfaces that feel as good as they look.",
  keywords: ["UI/UX Designer", "Freelancer", "Web Development", "Mobile Apps", "Vienna", "Austria"],
  authors: [{ name: "Patrick Hennes" }],
  openGraph: {
    title: "Patrick Hennes — UI/UX Designer & Freelancer",
    description:
      "Austrian freelance UI/UX designer and developer. Crafting interfaces that feel as good as they look.",
    type: "website",
  },
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "de" | "es")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${archivo.variable} ${spaceGrotesk.variable}`}>
      <body className="font-body antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
