import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Fresh Eggs Direct",
  description: "Farm-fresh eggs delivered to your door",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-amber-50 text-gray-800 min-h-screen">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 py-10">{children}</main>
        <WhatsAppButton />
        <footer className="bg-yellow-400 mt-16">
          <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-900 font-bold text-lg">🥚 Fresh Eggs Direct</div>
            <div className="flex flex-col items-center gap-1 text-sm text-gray-800">
              <span>📞 Support: <a href="tel:+918796322212" className="font-bold hover:underline">+91 87963 22212</a></span>
              <span>🕗 Mon–Sun, 7 AM – 7 PM</span>
            </div>
            <div className="text-sm text-gray-700">© 2026 Fresh Eggs Direct. All rights reserved.</div>
          </div>
        </footer>
      </body>
    </html>
  );
}
