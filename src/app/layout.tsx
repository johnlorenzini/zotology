import "server-only";

import "./globals.css";
import SupabaseListener from "@/lib/supabase/components/supabase-listener";
import SupabaseProvider from "@/lib/supabase/components/supabase-provider";
import { createClient } from "@/lib/supabase/utils/supabase-server";
import { Inter, Bitter } from "@next/font/google";
import cn from "classnames";
import Header from "./Header";
import Footer from "./Footer";
import { Suspense } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const bitter = Bitter({
  subsets: ["latin"],
  variable: "--font-title",
  display: "swap",
});

// do not cache this layout
export const revalidate = 0;

export default async function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {

  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();
  
  return (
    <html lang="en">
      {/*
      <head /> will contain the components returned by the nearest parent
      head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
    */}
      <head />
      <body className={cn(inter.variable, bitter.variable)}>
        <SupabaseProvider>         
          <Header />
          <SupabaseListener serverAccessToken={session?.access_token} />
          {children}
        </SupabaseProvider>
        <Footer/>
      </body>
    </html>
  );
}
