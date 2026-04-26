const fs = require("fs");
const path = require("path");

const images = [
  { file: "hen-eating.jpg",     emoji: "🐔", label: "Hens Eating",         bg: "#f5e6c8", text: "#7c4a00" },
  { file: "hen-feeding.jpg",    emoji: "🌾", label: "Feeding Time",         bg: "#e8f5e9", text: "#2e7d32" },
  { file: "hen-farm.jpg",       emoji: "🏡", label: "Our Poultry Farm",     bg: "#fff8e1", text: "#f57f17" },
  { file: "hen-closeup.jpg",    emoji: "🐓", label: "Happy Hen",            bg: "#fce4ec", text: "#880e4f" },
  { file: "egg-collection.jpg", emoji: "🧺", label: "Morning Egg Collection",bg: "#e3f2fd", text: "#0d47a1" },
  { file: "egg-tray.jpg",       emoji: "📦", label: "Packed in Trays of 30",bg: "#f3e5f5", text: "#4a148c" },
  { file: "egg-warehouse.jpg",  emoji: "🏭", label: "Storage & Dispatch",   bg: "#e0f2f1", text: "#004d40" },
  { file: "white-eggs.jpg",     emoji: "🥚", label: "Fresh White Eggs",     bg: "#fffde7", text: "#f9a825" },
];

const outDir = path.join(__dirname, "public", "farm");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

images.forEach(({ file, emoji, label, bg, text }) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
  <rect width="600" height="400" fill="${bg}"/>
  <rect x="20" y="20" width="560" height="360" rx="20" fill="none" stroke="${text}" stroke-width="3" stroke-dasharray="10,6" opacity="0.4"/>
  <text x="300" y="170" font-size="90" text-anchor="middle" dominant-baseline="middle">${emoji}</text>
  <text x="300" y="260" font-size="28" font-weight="bold" text-anchor="middle" fill="${text}" font-family="Arial,sans-serif">${label}</text>
  <text x="300" y="300" font-size="16" text-anchor="middle" fill="${text}" opacity="0.6" font-family="Arial,sans-serif">Fresh Eggs Direct · Poultry Farm</text>
</svg>`;
  // Save as .svg but name it .jpg so existing code works (browsers render SVG fine)
  fs.writeFileSync(path.join(outDir, file.replace(".jpg", ".svg")), svg);
  // Also write a minimal valid JPEG wrapper — actually just write SVG content to the .jpg file
  // Next.js Image with local files reads the actual bytes; use unoptimized or rename to .svg
  fs.writeFileSync(path.join(outDir, file), svg);
  console.log(`Created: ${file}`);
});
