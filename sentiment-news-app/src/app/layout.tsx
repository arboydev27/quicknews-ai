import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/utils/ThemeProvider";
import ThemeSwitcher from "@/utils/ThemeSwitcher";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QuickNews.ai",
  description: "Get all your news in a click of a button",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} min-h-dvh bg-bg text-text antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* App shell */}
          <div className="min-h-dvh flex flex-col">
            {/* Header owns its space; switcher sits on the right */}
            <header className="w-full">
              <div className="mx-auto max-w-5xl px-4 py-3 flex justify-end">
                <ThemeSwitcher />
              </div>
            </header>

            {/* Page content below the header */}
            <main className="flex-1">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
