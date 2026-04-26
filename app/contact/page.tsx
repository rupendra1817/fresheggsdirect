import Link from "next/link";

const faqs = [
  { q: "How do I place an order?", a: "Click Place Order in the menu, fill in your details and submit. We will confirm via call or WhatsApp." },
  { q: "What is the minimum order?", a: "Minimum 1 tray (30 eggs). No maximum — bulk orders welcome!" },
  { q: "Do you deliver on Sundays?", a: "Yes, we are open on Sundays! Place your order before 10 AM for same-day delivery." },
  { q: "How do I pay?", a: "Cash on Delivery (COD). Pay when your eggs arrive at your door." },
];

const hours = [
  { day: "Monday – Friday", time: "7:00 AM – 7:00 PM" },
  { day: "Saturday",        time: "7:00 AM – 5:00 PM" },
  { day: "Sunday",          time: "7:00 AM – 5:00 PM" },
];

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-10">

      {/* Header */}
      <div className="text-center space-y-2">
        <div className="text-6xl">📞</div>
        <h1 className="text-4xl font-extrabold text-yellow-700">Contact &amp; Support</h1>
        <p className="text-gray-500">We&apos;re always happy to help — reach us any way you like</p>
      </div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <a href="tel:+919599031817"
          className="bg-white rounded-2xl shadow p-6 border border-yellow-100 flex items-center gap-4 hover:border-yellow-400 transition-colors">
          <span className="text-4xl">📞</span>
          <div>
            <p className="font-bold text-gray-800">Call Us</p>
            <p className="text-yellow-600 font-semibold text-lg">+91 95990 31817</p>
            <p className="text-xs text-gray-400">Mon–Sun, 7 AM – 7 PM</p>
          </div>
        </a>

        <a href="https://wa.me/919599031817" target="_blank" rel="noopener noreferrer"
          className="bg-white rounded-2xl shadow p-6 border border-yellow-100 flex items-center gap-4 hover:border-yellow-400 transition-colors">
          <span className="text-4xl">💬</span>
          <div>
            <p className="font-bold text-gray-800">WhatsApp</p>
            <p className="text-yellow-600 font-semibold text-lg">+91 95990 31817</p>
            <p className="text-xs text-gray-400">Quick replies during business hours</p>
          </div>
        </a>

        <a href="mailto:care@fresheggsdirect.in"
          className="bg-white rounded-2xl shadow p-6 border border-yellow-100 flex items-center gap-4 hover:border-yellow-400 transition-colors">
          <span className="text-4xl">✉️</span>
          <div>
            <p className="font-bold text-gray-800">Email</p>
            <p className="text-yellow-600 font-semibold">care@fresheggsdirect.in</p>
            <p className="text-xs text-gray-400">We reply within 24 hours</p>
          </div>
        </a>

        <div className="bg-white rounded-2xl shadow p-6 border border-yellow-100 flex items-center gap-4">
          <span className="text-4xl">📍</span>
          <div>
            <p className="font-bold text-gray-800">Farm Address</p>
            <p className="text-gray-600 text-sm">Ghaziabad – 201001, Uttar Pradesh</p>
          </div>
        </div>

      </div>

      {/* Support Hours */}
      <div className="bg-white rounded-2xl shadow p-8 border border-yellow-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Support Hours</h2>
        <table className="w-full text-sm text-gray-700">
          <tbody className="divide-y divide-yellow-100">
            {hours.map(({ day, time }) => (
              <tr key={day}>
                <td className="py-2 font-medium">{day}</td>
                <td className="py-2 text-right text-yellow-700 font-semibold">{time}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-xs text-gray-400 mt-4">* Orders placed before 10 AM are delivered the same day.</p>
      </div>

      {/* FAQ */}
      <div className="bg-white rounded-2xl shadow p-8 border border-yellow-100 space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Common Questions</h2>
        {faqs.map(({ q, a }) => (
          <div key={q}>
            <p className="font-semibold text-gray-800">Q: {q}</p>
            <p className="text-gray-600 text-sm mt-1">A: {a}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link
          href="/order"
          className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-3 rounded-full transition-colors"
        >
          Place an Order →
        </Link>
      </div>

    </div>
  );
}
