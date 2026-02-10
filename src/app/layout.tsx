import { Toaster } from "@/components/ui/sonner";
import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { SerwistProvider } from "./serwist";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const APP_NAME = "Zand";
const APP_DEFAULT_TITLE = "Zand | Digital Agency & Web Development";
const APP_TITLE_TEMPLATE = "%s | Zand";
const APP_DESCRIPTION =
  "Zand is a full-service digital agency specializing in web development, digital marketing, graphic design, commercial photography, and videography. We help businesses build stunning websites, implement enterprise solutions, and grow their online presence.";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    template: APP_TITLE_TEMPLATE,
    absolute: APP_DEFAULT_TITLE,
  },
  description: APP_DESCRIPTION,
  keywords: [
    "web development",
    "digital agency",
    "frontend development",
    "backend development",
    "fullstack development",
    "digital marketing",
    "graphic design",
    "commercial photography",
    "commercial videography",
    "API integration",
    "Microsoft implementation",
    "LMS",
    "ERP solutions",
    "project management",
    "website design",
    "custom web applications",
    "business solutions",
  ],
  authors: [{ name: "Zand" }],
  creator: "Zand",
  publisher: "Zand",
  robots: {
    index: true,
    follow: true,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: APP_NAME,
    title: APP_DEFAULT_TITLE,
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: APP_DEFAULT_TITLE,
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className={`${poppins.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SerwistProvider swUrl="/serwist/sw.js">
            {children}
          </SerwistProvider>
          <Toaster richColors closeButton theme="light" />
        </ThemeProvider>
      </body>
    </html>
  );
}
