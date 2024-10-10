import { Inter } from "next/font/google";
import "./globals.css";
import Head from "@/componets/Head/head";
import Footer from "@/componets/Footer/footer";
import '../lib/fontawesome';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TERROTERRO",
  description: "A web app for your local commerce",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className={inter.className}>
      <Head/>
        {children}
      <Footer/>
      </body>
    </html>
  );
}
