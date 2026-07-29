// ─── JagFlix Root Layout ───────────────────────────────────────────────
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { QueryProvider } from "@/providers/query.provider";
import { ThemeProvider } from "@/providers/theme.provider";
import { AuthProvider } from "@/providers/auth.provider";
import { ToastProvider } from "@/providers/toast.provider";
import { ServiceWorkerRegister } from "@/components/features/service-worker-register";

export const metadata: Metadata = {
  title: {
    default: "JagFlix — Premium Streaming Experience",
    template: "%s | JagFlix",
  },
  description:
    "Discover, stream, and enjoy premium content curated just for you. JagFlix offers movies, series, football, and more.",
  keywords: [
    "streaming",
    "movies",
    "series",
    "tv shows",
    "football",
    "entertainment",
    "jagflix",
  ],
  authors: [{ name: "JagFlix" }],
  creator: "JagFlix",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    siteName: "JagFlix",
    title: "JagFlix — Premium Streaming Experience",
    description:
      "Discover, stream, and enjoy premium content curated just for you.",
  },
  twitter: {
    card: "summary_large_image",
    title: "JagFlix — Premium Streaming Experience",
    description:
      "Discover, stream, and enjoy premium content curated just for you.",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/icons/apple-icon.png",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="dark h-full antialiased"
      suppressHydrationWarning
    >
      <head>
        <meta name="color-scheme" content="dark" />
        <link rel="apple-touch-icon" href="/icons/apple-icon.png" />
      </head>
      <body className="min-h-full bg-zinc-950 text-zinc-100 font-sans">
        <QueryProvider>
          <ThemeProvider>
            <AuthProvider>
              <ToastProvider>
                {children}
                <ServiceWorkerRegister />
              </ToastProvider>
            </AuthProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
