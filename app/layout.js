
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import { Outfit } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout"; // ✅ ensure this path is correct

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata = {
  title: "Quality Paint Palace",
  description: "Premium Paints and Supplies",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      appearance={{
        layout: { socialButtonsVariant: "iconButton" },
        variables: { colorPrimary: "#c2b89b" },
      }}
    >
      <html lang="en">
        <body
          className={`${outfit.className} antialiased text-gray-700 flex flex-col min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100`}
        >
          <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
          <ClientLayout>{children}</ClientLayout>
        </body>
      </html>
    </ClerkProvider>
  );
}
