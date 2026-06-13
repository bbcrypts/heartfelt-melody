import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const form = await req.json();

  const BASE_PRICE = 79;
  const SPECIFIC_LYRICS_PRICE = 15;
  const PDF_LYRICS_PRICE = 8;
  const COMMERCIAL_LICENSE_PRICE = 60;
  const ANNUAL_PRICE = 300;

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
    {
      price_data: {
        currency: "usd",
        product_data: {
          name: form.annualSubscription
            ? "Heartfelt Melody Annual Subscription"
            : "Heartfelt Melody Custom Song",
        },
        unit_amount: (form.annualSubscription ? ANNUAL_PRICE : BASE_PRICE) * 100,
      },
      quantity: 1,
    },
  ];

  if (form.specificLyrics) {
    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: { name: "Specific Lyrics Add-On" },
        unit_amount: SPECIFIC_LYRICS_PRICE * 100,
      },
      quantity: 1,
    });
  }

  if (form.pdfLyrics) {
    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: { name: "PDF Lyric Sheet" },
        unit_amount: PDF_LYRICS_PRICE * 100,
      },
      quantity: 1,
    });
  }

  if (form.commercialLicense) {
    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: { name: "Commercial Use License" },
        unit_amount: COMMERCIAL_LICENSE_PRICE * 100,
      },
      quantity: 1,
    });
  }

  const tipAmount = Number(form.tipAmount || 0);

  if (tipAmount > 0) {
    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: { name: "Tip for Musicians" },
        unit_amount: tipAmount * 100,
      },
      quantity: 1,
    });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: form.customerEmail,
    line_items: lineItems,
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/write`,
    metadata: {
      customerEmail: form.customerEmail || "",
      recipientName: form.recipientName || "",
      relationship: form.relationship || "",
      occasion: form.occasion || "",
      genre: form.genre || "",
      mood: form.mood || "",
      voice: form.voice || "",
      favoriteSongs: form.favoriteSongs || "",
      story: form.story || "",
      specificLyrics: String(form.specificLyrics),
      specificLyricsText: form.specificLyricsText || "",
      pdfLyrics: String(form.pdfLyrics),
      commercialLicense: String(form.commercialLicense),
      annualSubscription: String(form.annualSubscription),
      tipAmount: form.tipAmount || "0",
    },
  });

  return NextResponse.json({ url: session.url });
}
export async function GET() {
  return Response.json({ message: "Checkout route is working" });
}