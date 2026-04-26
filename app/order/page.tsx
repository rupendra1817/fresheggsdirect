"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const TRAY_QTY = 30;

const IMG = {
  hero:    "/farm/white-eggs.jpg",
  summary: "/farm/egg-in-tray.png",
  hen1:    "/farm/1.png",
  hen2:    "/farm/morning-collection.png",
};

type PriceData = {
  pricePerTray: number;
  effectiveDate: string;
  trend: "up" | "down" | "stable";
  note: string;
  flashSale: { enabled: boolean; discount: number; label: string; description: string };
};

export default function OrderPage() {
  const router = useRouter();
  const [price, setPrice] = useState<PriceData | null>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", quantity: 1, notes: "" });

  useEffect(() => {
    fetch("/api/price")
      .then((r) => r.json())
      .then(setPrice);
  }, []);

  const trayPrice = price?.pricePerTray ?? 0;
  const flashDiscount = price?.flashSale?.enabled ? price.flashSale.discount : 0;
  const discountedPrice = trayPrice - flashDiscount;
  const total = discountedPrice * Number(form.quantity);
  const totalEggs = TRAY_QTY * Number(form.quantity);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const message = `*NEW ORDER RECEIVED*

*Customer Details*
--------------------------------
Name: ${form.name}
Phone: ${form.phone}
Email: ${form.email || "Not provided"}
Address: ${form.address}

*Order Details*
--------------------------------
Trays: ${form.quantity}
Eggs: ${totalEggs} eggs
Original Price: Rs.${trayPrice} per tray
Flash Discount: - Rs.${flashDiscount} per tray
Discounted Price: Rs.${discountedPrice} per tray
Total: Rs.${total}
Payment: Cash on Delivery
${form.notes ? `Notes: ${form.notes}` : ""}
--------------------------------
Time: ${new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}`;

    const whatsappURL = `https://wa.me/919599031817?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");

    await new Promise((r) => setTimeout(r, 800));
    router.push("/thank-you");
  }

  return (
    <div className="space-y-8">

      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden h-44">
        <Image src={IMG.hero} alt="White egg tray" fill sizes="(max-width: 896px) 100vw, 896px" className="object-cover" priority />
        <div className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center text-center gap-1">
          <h1 className="text-3xl font-extrabold text-white">Place Your Order</h1>
          <p className="text-yellow-300 text-sm">
            White Egg Tray · 30 eggs ·{" "}
            {price ? <>₹{price.pricePerTray} today</> : "Loading price…"} · Cash on Delivery
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-8 space-y-5 border border-yellow-100">
          <Field label="Full Name">
            <input name="name" required value={form.name} onChange={handleChange} placeholder="e.g. Rahul Sharma" />
          </Field>
          <Field label="Phone Number">
            <input name="phone" required type="tel" value={form.phone} onChange={handleChange} placeholder="e.g. +91 98765 43210" />
          </Field>
          <Field label="Email Address">
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="e.g. rahul@gmail.com" />
          </Field>
          <Field label="Delivery Address">
            <input name="address" required value={form.address} onChange={handleChange} placeholder="Flat No-1557, Tower-C, 7th avenue, Gaur City" />
          </Field>
          <Field label="Number of Trays">
            <input name="quantity" required type="number" min={1} max={100} value={form.quantity} onChange={handleChange} />
          </Field>
          <Field label="Special Instructions (optional)">
            <textarea name="notes" rows={3} value={form.notes} onChange={handleChange} placeholder="e.g. Call before delivery, leave at gate…" />
          </Field>
          <button type="submit" disabled={loading || !price}
            className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:opacity-60 text-gray-900 font-bold py-3 rounded-full transition-colors text-lg">
            {loading ? "Placing Order…" : "Confirm Order →"}
          </button>
        </form>

        {/* Right column */}
        <div className="space-y-5">

          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow p-6 border border-yellow-200 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-lg text-gray-800">Order Summary</h2>
              {price && (
                <span className="text-xs bg-yellow-100 text-yellow-700 font-semibold px-2 py-1 rounded-full">
                  📅 {price.effectiveDate}
                </span>
              )}
            </div>

            <div className="relative h-36 rounded-xl overflow-hidden">
              <Image src={IMG.summary} alt="White egg tray" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
            </div>

            {price ? (
              <>
                <div className="flex justify-between text-gray-700">
                  <span>White Egg Tray (30 eggs)</span>
                  <span className="font-semibold line-through text-gray-400">₹{trayPrice}</span>
                </div>
                <div className="flex justify-between text-green-600 text-sm font-semibold">
                  <span>Flash Sale Discount</span>
                  <span>- ₹{flashDiscount}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Discounted Price</span>
                  <span className="font-semibold text-yellow-600">₹{discountedPrice}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Number of Trays</span>
                  <span>× {form.quantity}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Total Eggs</span>
                  <span>{totalEggs} eggs</span>
                </div>
                <hr className="border-yellow-200" />
                <div className="flex justify-between font-extrabold text-xl text-yellow-600">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
                <p className="text-xs text-gray-400">💵 COD · {price.note}</p>
              </>
            ) : (
              <div className="text-center text-gray-400 py-4 animate-pulse">Fetching today&apos;s price…</div>
            )}
          </div>

          {/* Farm images */}
          <div className="relative h-48 rounded-2xl overflow-hidden shadow">
            <Image src={IMG.hen1} alt="Our hens on the farm" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-black/45 text-white text-sm text-center py-2">
              🐔 Our hens — free-range &amp; naturally fed
            </div>
          </div>

          <div className="relative h-48 rounded-2xl overflow-hidden shadow">
            <Image src={IMG.hen2} alt="Hen close up" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-black/45 text-white text-sm text-center py-2">
              🥚 Fresh white eggs — collected this morning
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="[&>input]:w-full [&>input]:border [&>input]:border-gray-300 [&>input]:rounded-lg [&>input]:px-3 [&>input]:py-2 [&>input]:focus:outline-none [&>input]:focus:ring-2 [&>input]:focus:ring-yellow-400 [&>textarea]:w-full [&>textarea]:border [&>textarea]:border-gray-300 [&>textarea]:rounded-lg [&>textarea]:px-3 [&>textarea]:py-2 [&>textarea]:focus:outline-none [&>textarea]:focus:ring-2 [&>textarea]:focus:ring-yellow-400">
        {children}
      </div>
    </div>
  );
}
