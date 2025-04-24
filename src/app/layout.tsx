import type { Metadata } from "next";
import { Quicksand  } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";



const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], 
  variable: '--font-quicksand',
});

export const metadata: Metadata = {
  title: "SocialSphere",
  description: "Connect With SocialSphere",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={quicksand.className}>
          <div className="w-full bg-white px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
            <Navbar />
          </div>
          <div className="w-full bg-slate-100 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
