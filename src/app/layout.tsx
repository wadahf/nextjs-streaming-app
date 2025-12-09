import "@stream-io/video-react-sdk/dist/css/styles.css";
import { ClerkProvider } from "@clerk/nextjs";
import ClientProvider from "./ClientProvider";
// import Navbar from "@/components/Navbar";
import localFont from "next/font/local";
import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components";
import { dark } from "@clerk/themes";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Meeting App",
  description: "Video calling app build with Next.js & Stream.io",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" data-theme="night">
        <body
          className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}
        >
          <ClientProvider>
            {/* <Navbar /> */}
            <Navigation />
            {/* <main className="mx-auto max-w-5xl px-3 py-6">{children}</main> */}
            {/* <main>{children}</main> */}
            {/* <main className="mx-auto min-h-screen max-w-5xl bg-background"> */}
            <main className="mx-auto min-h-screen max-w-7xl bg-background">
              {children}
            </main>
          </ClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
