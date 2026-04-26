import { NextResponse } from "next/server";
import { PRICE_DATA, FLASH_SALE } from "@/lib/priceData";

export async function GET() {
  return NextResponse.json({ ...PRICE_DATA, flashSale: FLASH_SALE });
}
