"use client";
import { useEffect, useState } from "react";

function getTimeUntilMidnight() {
  const now = new Date();
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0);
  const diff = Math.max(0, midnight.getTime() - now.getTime());
  const h = Math.floor(diff / 1000 / 60 / 60);
  const m = Math.floor((diff / 1000 / 60) % 60);
  const s = Math.floor((diff / 1000) % 60);
  return { h, m, s };
}

export default function FlashSaleCountdown() {
  const [time, setTime] = useState<{ h: number; m: number; s: number } | null>(null);

  useEffect(() => {
    setTime(getTimeUntilMidnight());
    const interval = setInterval(() => setTime(getTimeUntilMidnight()), 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  if (!time) return null;

  return (
    <div className="flex items-center gap-2 text-white">
      <span className="text-red-200 text-xs font-semibold uppercase tracking-widest">Ends in</span>
      {[{ label: "Hrs", val: time.h }, { label: "Min", val: time.m }, { label: "Sec", val: time.s }].map(({ label, val }, i) => (
        <div key={label} className="flex items-center gap-1">
          <div className="bg-white/20 rounded-lg px-2 py-1 text-center min-w-[40px]">
            <p className="font-extrabold text-lg leading-none">{pad(val)}</p>
            <p className="text-red-200 text-[10px]">{label}</p>
          </div>
          {i < 2 && <span className="font-extrabold text-lg">:</span>}
        </div>
      ))}
    </div>
  );
}
