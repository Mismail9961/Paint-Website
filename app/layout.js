import { Outfit } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap", // better performance
});

export const metadata = {
  title: "QuickCart - GreatStack",
  description: "E-Commerce with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${outfit.className} antialiased text-gray-700 flex flex-col min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100`}
        >
          <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

          <AppContextProvider>
            <TopBar/>
            {/* Navbar stays on top */}
            <Navbar />

            {/* Main content grows to fill space */}
            <main className="flex-1 w-full">{children}</main>

            {/* Footer sticks to bottom */}
            <Footer />
          </AppContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
