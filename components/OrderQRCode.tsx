"use client";
import { QRCodeSVG } from "qrcode.react";

export default function OrderQRCode() {
  const homeUrl = "https://fresheggsdirect.vercel.app";
  const orderUrl = "https://fresheggsdirect.vercel.app/order";

  return (
    <section className="bg-white rounded-3xl shadow-lg border-2 border-yellow-400 p-8 flex flex-col items-center gap-6 text-center">
      <h2 className="text-2xl font-extrabold text-gray-800">📱 Scan to Visit</h2>
      <p className="text-gray-500 text-sm">Scan the QR code with your phone to get started</p>
      <div className="flex flex-col sm:flex-row gap-8 items-center justify-center">

        <div className="flex flex-col items-center gap-3">
          <div className="bg-yellow-50 p-4 rounded-2xl border border-yellow-200">
            <QRCodeSVG value={homeUrl} size={160} bgColor="#fefce8" fgColor="#1f2937" level="H" />
          </div>
          <p className="font-semibold text-gray-700">🌐 Visit Website</p>
          <p className="text-xs text-gray-400">fresheggsdirect.vercel.app</p>
        </div>

      </div>
    </section>
  );
}
