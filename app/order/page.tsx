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

  const [listeningField, setListeningField] = useState<string | null>(null);

  function startListening(field: string) {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Speech recognition not supported in this browser.");
    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.onstart = () => setListeningField(field);
    recognition.onend = () => setListeningField(null);
    recognition.onresult = (e: any) => {
      let transcript = e.results[0][0].transcript.trim();
      if (field === "quantity") {
        const wordToNum: Record<string, string> = { one: "1", two: "2", three: "3", four: "4", five: "5", six: "6", seven: "7", eight: "8", nine: "9", ten: "10" };
        transcript = wordToNum[transcript.toLowerCase()] ?? transcript.replace(/[^0-9]/g, "");
      }
      setForm((prev) => ({ ...prev, [field]: field === "quantity" ? transcript : ((prev as any)[field] ? (prev as any)[field] + " " + transcript : transcript) }));
    };
    recognition.start();
  }

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

    const whatsappURL = `https://wa.me/917011310521?text=${encodeURIComponent(message)}`;
    const a = document.createElement("a");
    a.href = whatsappURL;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.click();

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
            <SpeechInput name="name" required value={form.name} onChange={handleChange} placeholder="e.g. Rahul Sharma" onMic={() => startListening("name")} listening={listeningField === "name"} />
          </Field>
          <Field label="Phone Number">
            <SpeechInput name="phone" required type="tel" value={form.phone} onChange={handleChange} placeholder="e.g. +91 98765 43210" onMic={() => startListening("phone")} listening={listeningField === "phone"} />
          </Field>
          <Field label="Email Address">
            <SpeechInput name="email" type="email" value={form.email} onChange={handleChange} placeholder="e.g. rahul@gmail.com" onMic={() => startListening("email")} listening={listeningField === "email"} />
          </Field>
          <Field label="Delivery Address">
            <SpeechInput name="address" required value={form.address} onChange={handleChange} placeholder="Flat No-1557, Tower-C, 7th avenue, Gaur City" onMic={() => startListening("address")} listening={listeningField === "address"} />
          </Field>
          <Field label="Number of Trays">
            <SpeechInput name="quantity" required type="number" min={1} max={100} value={form.quantity} onChange={handleChange} placeholder="e.g. 2" onMic={() => startListening("quantity")} listening={listeningField === "quantity"} />
          </Field>
          <Field label="Special Instructions (optional)">
            <SpeechInput name="notes" textarea rows={3} value={form.notes} onChange={handleChange} placeholder="e.g. Call before delivery, leave at gate…" onMic={() => startListening("notes")} listening={listeningField === "notes"} />
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

function SpeechInput({ onMic, listening, textarea, rows, ...props }: any) {
  return (
    <div className="relative">
      {textarea
        ? <textarea rows={rows} {...props} className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none" />
        : <input {...props} className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-yellow-400" />}
      <button
        type="button"
        onClick={onMic}
        className={`absolute right-2 ${textarea ? "top-2" : "top-1/2 -translate-y-1/2"} p-1 transition-colors ${listening ? "text-red-500 animate-pulse" : "text-gray-400 hover:text-yellow-500"}`}
        title="Speak">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 1a4 4 0 0 1 4 4v6a4 4 0 0 1-8 0V5a4 4 0 0 1 4-4zm-1 17.93V21H9v2h6v-2h-2v-2.07A8 8 0 0 0 20 11h-2a6 6 0 0 1-12 0H4a8 8 0 0 0 7 7.93z"/>
        </svg>
      </button>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div>
        {children}
      </div>
    </div>
  );
}
