import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div className="text-center space-y-6 py-16">
      <div className="text-6xl">🥚✅</div>
      <h1 className="text-3xl font-bold text-yellow-700">Order Received!</h1>
      <p className="text-gray-600 max-w-md mx-auto">
        Thank you for your order. We will confirm it shortly via phone or email and arrange delivery.
      </p>
      <Link
        href="/"
        className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-8 py-3 rounded-full transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
