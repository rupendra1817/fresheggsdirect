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
            <div className="text-gray-900 font-bold text-lg text-center whitespace-nowrap">🥚 Fresh Eggs Direct</div>
            <div className="flex flex-col items-center gap-1 text-sm text-gray-800">
              <span className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="#1f2937" width="16" height="16"><path d="M16 0C7.163 0 0 7.163 0 16c0 2.833.738 5.49 2.031 7.8L0 32l8.418-2.01A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm7.27 22.471c-.398-.199-2.354-1.162-2.719-1.294-.365-.133-.631-.199-.897.199-.265.398-1.029 1.294-1.261 1.56-.232.265-.465.298-.863.1-.398-.199-1.681-.62-3.202-1.977-1.183-1.056-1.982-2.36-2.214-2.758-.232-.398-.025-.613.174-.811.179-.178.398-.465.597-.697.199-.232.265-.398.398-.664.133-.265.066-.497-.033-.697-.1-.199-.897-2.162-1.229-2.96-.324-.777-.653-.672-.897-.684l-.764-.013c-.265 0-.697.1-1.062.497-.365.398-1.394 1.362-1.394 3.322s1.427 3.854 1.626 4.12c.199.265 2.808 4.287 6.803 6.013.951.41 1.693.655 2.271.839.954.304 1.823.261 2.51.158.765-.114 2.354-.962 2.686-1.891.332-.929.332-1.726.232-1.891-.099-.166-.365-.265-.763-.464z"/></svg>
                <a href="https://wa.me/918796322212" target="_blank" rel="noopener noreferrer" className="font-bold hover:underline">+91 87963 22212</a>
              </span>
              <span>🌐 <a href="https://fresheggsdirect.vercel.app" target="_blank" rel="noopener noreferrer" className="font-bold hover:underline">https://fresheggsdirect.vercel.app</a></span>
              <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-1 mt-1">
                <span className="whitespace-nowrap">🌅 Morning: 6 AM – 8 AM</span>
                <span className="text-gray-600">&bull;</span>
                <span className="whitespace-nowrap">🌆 Evening: 8 PM – 11 PM</span>
                <span className="text-gray-600">&bull;</span>
                <span className="whitespace-nowrap">Mon–Sun</span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-1 text-sm text-gray-700 text-center">
              <span className="font-bold text-gray-900">🚚 Free Home Delivery</span>
              <span className="whitespace-nowrap">© 2026 Fresh Eggs Direct. All rights reserved.</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
