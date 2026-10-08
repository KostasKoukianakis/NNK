import type { Metadata } from "next";
import { Fragment_Mono, Source_Sans_3 } from "next/font/google";
import { QueryProvider } from "@/components/providers/query-provider";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { HOSPITAL } from "@/lib/constants";
import "./globals.css";

const sans = Source_Sans_3({
  variable: "--font-source",
  subsets: ["greek", "latin"],
  weight: ["400", "500", "600", "700"],
});

const mono = Fragment_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: `${HOSPITAL.shortName} · ${HOSPITAL.name}`,
    template: `%s · ${HOSPITAL.shortName}`,
  },
  description:
    "Ναυτικό Νοσοκομείο Κρήτης στη Σούδα Χανίων. Κλινικές, ραντεβού εξωτερικών ιατρείων, οδηγίες ασθενών και portal δικαιούχων.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="el"
      className={`${sans.variable} ${mono.variable} h-full min-h-dvh antialiased`}
    >
      <body className="flex min-h-dvh flex-col bg-[var(--blue)] font-sans text-[var(--white)]">
        <div className="app-shell">
          <SmoothScroll />
          <QueryProvider>{children}</QueryProvider>
        </div>
      </body>
    </html>
  );
}
