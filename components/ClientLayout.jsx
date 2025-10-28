"use client";

import AppContextProvider from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";

export default function ClientLayout({ children }) {
  return (
    <AppContextProvider>
      <TopBar />
      <Navbar />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
    </AppContextProvider>
  );
}
