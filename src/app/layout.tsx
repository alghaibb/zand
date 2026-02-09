import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Zand",
    absolute: "Zand | Digital Agency & Web Development",
  },
  description:
    "Zand is a full-service digital agency specializing in web development, digital marketing, graphic design, commercial photography, and videography. We help businesses build stunning websites, implement enterprise solutions, and grow their online presence.",
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
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: "Zand",
    title: "Zand | Digital Agency & Web Development",
    description:
      "Full-service digital agency specializing in web development, digital marketing, graphic design, commercial photography, and videography.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zand | Digital Agency & Web Development",
    description:
      "Full-service digital agency specializing in web development, digital marketing, graphic design, commercial photography, and videography.",
  },
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
          {children}
          <Toaster richColors closeButton theme="light" />
        </ThemeProvider>
      </body>
    </html>
  );
}
