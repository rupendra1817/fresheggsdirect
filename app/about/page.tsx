import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-10">

      {/* Header */}
      <div className="text-center space-y-2">
        <div className="text-6xl">🐔</div>
        <h1 className="text-4xl font-extrabold text-yellow-700">About Us</h1>
        <p className="text-gray-500">A family-run poultry farm with a passion for fresh, honest food</p>
      </div>

      {/* Story */}
      <div className="bg-white rounded-2xl shadow p-8 border border-yellow-100 space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Our Story</h2>
        <p className="text-gray-600 leading-relaxed">
          We started Fresh Eggs Direct as a small family farm over 10 years ago with just 50 hens and a
          dream to provide our neighbours with the freshest eggs possible. Today we have over 500
          free-range hens roaming our open pastures, and we deliver to hundreds of happy families
          across the local area every week.
        </p>
        <p className="text-gray-600 leading-relaxed">
          We believe in keeping things simple — happy hens, natural feed, no hormones, no antibiotics,
          and eggs collected fresh every single morning. We sell only one product: a tray of 30 white
          eggs, because that&apos;s what we do best.
        </p>
      </div>

      {/* Owner */}
      <div className="bg-white rounded-2xl shadow p-8 border border-yellow-100 space-y-3">
        <h2 className="text-2xl font-bold text-gray-800">Meet the Owner</h2>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 relative">
            <Image src="/farm/manoj-yadav.jpeg" alt="Manoj Yadav" fill sizes="64px" className="object-cover object-top" />
          </div>
          <div>
            <p className="font-bold text-gray-800 text-lg">Manoj Yadav</p>
            <p className="text-gray-500 text-sm">Founder &amp; Farm Owner</p>
            <p className="text-gray-500 text-sm">📍 Ghaziabad, Uttar Pradesh</p>
          </div>
        </div>
        <p className="text-gray-600 leading-relaxed">
          Manoj has been farming since childhood, learning the trade from his father. His commitment to
          ethical, free-range farming and zero-compromise freshness is what sets Fresh Eggs Direct apart
          from commercial suppliers.
        </p>
      </div>

      {/* Values */}
      <div className="bg-white rounded-2xl shadow p-8 border border-yellow-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Values</h2>
        <ul className="space-y-3 text-gray-700">
          {[
            { icon: "🐔", text: "Free-range hens — no cages, ever" },
            { icon: "🌿", text: "100% natural grain feed, no hormones or antibiotics" },
            { icon: "📦", text: "Eggs collected fresh every morning" },
            { icon: "🤝", text: "Honest pricing, no hidden charges" },
            { icon: "🚚", text: "Same-day local delivery for orders before 10 AM" },
            { icon: "💬", text: "Always reachable — call or WhatsApp us anytime" },
          ].map(({ icon, text }) => (
            <li key={text} className="flex items-center gap-3">
              <span className="text-xl">{icon}</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link
          href="/order"
          className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-3 rounded-full transition-colors"
        >
          Order Fresh Eggs →
        </Link>
      </div>

    </div>
  );
}
