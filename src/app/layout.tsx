import type { Metadata } from "next";
import { Quicksand  } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // Import Footer component
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
          <div className="w-full bg-slate-100 dark:bg-gray-900 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
            <Navbar />
          </div>
          <div className="w-full bg-slate-100 dark:bg-gray-800 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 text-slate-900 dark:text-white">
            {children}
          </div>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
