import Link from "next/link";
import Image from "next/image";
import FlashSaleCountdown from "@/components/FlashSaleCountdown";
import { PRICE_DATA, FLASH_SALE } from "@/lib/priceData";

const IMG = {
  heroTray:     "/farm/egg-in-tray.png",
  productTray:  "/farm/egg-in-tray.png",
  step1Hens:    "/farm/1.png",
  step2Collect: "/farm/2.png",
  step3Tray:    "/farm/3.png",
  step4Deliver: "/farm/4.png",
  ctaBanner:    "/farm/bottom-banner.jpg",
};

const gallery = [
  { src: "/farm/1.png",    alt: "Hens roaming",        label: "🐔 Hens Roaming Free" },
  { src: "/farm/happy-hen.jpg",   alt: "Hen feeding",          label: "🌾 Feeding Time" },
  { src: "/farm/hen-feeding.jpg",   alt: "Hen close up",         label: "🐓 Happy Hen" },
  { src: "/farm/morning-collection.png",alt: "Egg collection",       label: "🧺 Morning Collection" },
  { src: "/farm/packed-in-tray.png",      alt: "Eggs in tray",         label: "📦 Packed in Trays" },
  { src: "/farm/storage-and-dispatch.png", alt: "Egg warehouse",        label: "🏭 Storage & Dispatch" },
];

const process = [
  { step: "1", title: "Happy Free-Range Hens",   desc: "Our hens roam freely on open green pastures, fed on natural grain — no cages, no stress.", img: IMG.step1Hens,    alt: "Free range hens on farm" },
  { step: "2", title: "Daily Fresh Collection",  desc: "Eggs are hand-collected every morning, inspected for quality and graded before packing.",  img: IMG.step2Collect, alt: "Fresh white eggs collected" },
  { step: "3", title: "Packed in Trays of 30",   desc: "Every tray holds exactly 30 white eggs, carefully packed to reach you crack-free.",         img: IMG.step3Tray,    alt: "White eggs packed in tray" },
  { step: "4", title: "Delivered to Your Door",  desc: "Orders placed before 10 AM are delivered the same day within our local area.",              img: IMG.step4Deliver, alt: "Delivery of fresh produce" },
];

type PriceData = {
  pricePerTray: number;
  effectiveDate: string;
  trend: "up" | "down" | "stable";
  previousPrice: number;
  note: string;
};

const trendIcon = { up: "↑", down: "↓", stable: "" };
const trendColor = { up: "text-red-500", down: "text-green-600", stable: "text-gray-500" };

async function fetchPrice(): Promise<PriceData> {
  return PRICE_DATA;
}

export default async function HomePage() {
  const price = await fetchPrice();

  return (
    <div className="space-y-16">

      {/* Hero */}
      <section className="relative rounded-3xl overflow-hidden h-[420px]">
        <Image src={IMG.heroTray} alt="White egg tray hero" fill sizes="100vw" className="object-cover" priority />
        <div className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center text-center px-6 space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
            🥚 Farm-Fresh Eggs
          </h1>
          <p className="text-lg text-yellow-200 max-w-xl">
            Free-range hens · Collected daily · Sold in trays of 30 · Delivered locally
          </p>
          {/* Today's price from API */}
          <div className="bg-black/40 rounded-2xl px-6 py-3 flex flex-col items-center gap-1">
            <p className="text-xs text-yellow-300 uppercase tracking-widest">Today&apos;s Price</p>
            <p className="text-4xl font-extrabold text-yellow-400">₹{price.pricePerTray} / tray</p>
            <p className="text-xs text-white/70">{price.effectiveDate} · {price.note}</p>
          </div>
          <Link href="/order" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-3 rounded-full transition-colors text-lg">
            Order a Tray →
          </Link>
        </div>
      </section>

      {/* Flash Sale Banner */}
      {FLASH_SALE.enabled && (
      <section className="bg-red-600 rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3 text-white">
          <span className="text-3xl animate-bounce">🔥</span>
          <div>
            <p className="font-extrabold text-xl">{FLASH_SALE.label}</p>
            <p className="text-red-200 text-sm">Get ₹{FLASH_SALE.discount} OFF on every tray · {FLASH_SALE.description}</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <FlashSaleCountdown />
          <div className="bg-white/20 rounded-xl px-4 py-2 text-center">
            <p className="text-white font-extrabold text-2xl line-through opacity-70">₹{price.pricePerTray}</p>
            <p className="text-white font-extrabold text-2xl">₹{price.pricePerTray - FLASH_SALE.discount}</p>
            <p className="text-red-200 text-xs">Per Tray</p>
          </div>
          <Link href="/order" className="bg-white text-red-600 font-extrabold px-6 py-3 rounded-full hover:bg-red-50 transition-colors whitespace-nowrap">
            Grab the Deal →
          </Link>
        </div>
      </section>
      )}

      {/* Single Product */}
      <section className="flex justify-center">
        <div className="bg-white rounded-3xl shadow-lg border-2 border-yellow-400 p-8 flex flex-col md:flex-row items-center gap-8 max-w-2xl w-full">
          <div className="relative w-full md:w-64 h-56 md:h-52 rounded-2xl overflow-hidden flex-shrink-0 shadow">
            <Image src={IMG.productTray} alt="White egg tray 30 white eggs" fill sizes="(max-width: 768px) 100vw, 256px" className="object-cover object-center" />
          </div>
          <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
            <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">ONLY PRODUCT</span>
            <h2 className="text-2xl font-extrabold text-gray-800">White Egg Tray</h2>
            <p className="text-gray-500 text-sm">30 fresh white eggs per tray · Free-range · No hormones</p>

            {/* Today's price badge */}
            <div className="flex items-center gap-2">
              <p className="text-4xl font-extrabold text-yellow-600">₹{price.pricePerTray}</p>
              <span className={`text-sm font-semibold ${trendColor[price.trend]}`}>
                {price.trend === "up" ? `${trendIcon.up} was ₹${price.previousPrice}` : price.trend === "down" ? `${trendIcon.down} was ₹${price.previousPrice}` : "Stable"}
              </span>
            </div>
            <p className="text-xs text-gray-400">Today · {price.effectiveDate} · includes local delivery</p>

            <Link href="/order" className="mt-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-3 rounded-full transition-colors">
              Order Now →
            </Link>
          </div>
        </div>
      </section>

      {/* Process */}
      <section>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">From Our Farm to Your Table</h2>
        <p className="text-center text-gray-500 mb-10">Every egg has a story — here&apos;s ours</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {process.map(({ step, title, desc, img, alt }) => (
            <div key={step} className="bg-white rounded-2xl shadow overflow-hidden border border-yellow-100 flex flex-col">
              <div className="relative h-52 w-full">
                <Image src={img} alt={alt} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" />
                <span className="absolute top-3 left-3 bg-yellow-400 text-gray-900 font-bold text-sm w-8 h-8 rounded-full flex items-center justify-center shadow">
                  {step}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-gray-800 mb-1">{title}</h3>
                <p className="text-gray-600 text-sm">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Our Farm in Action</h2>
        <p className="text-center text-gray-500 mb-8">From hen to tray — every step on our farm</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {gallery.map(({ src, alt, label }) => (
            <div key={alt} className="relative h-52 rounded-2xl overflow-hidden shadow group">
              <Image src={src} alt={alt} fill sizes="(max-width: 640px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs font-semibold text-center py-2">
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative rounded-3xl overflow-hidden h-52">
        <Image src={IMG.ctaBanner} alt="Fresh white eggs" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-yellow-900/65 flex flex-col items-center justify-center text-center gap-3 px-6">
          <h3 className="text-2xl font-bold text-white">Ready to Order Fresh White Eggs?</h3>
          <p className="text-yellow-200 text-sm">Tray of 30 · Today ₹{price.pricePerTray} · Cash on Delivery</p>
          <Link href="/order" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-3 rounded-full transition-colors">
            Place Your Order →
          </Link>
        </div>
      </section>

    </div>
  );
}
