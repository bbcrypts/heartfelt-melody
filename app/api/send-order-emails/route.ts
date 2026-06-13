import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const fromEmail =
  process.env.RESEND_FROM_EMAIL ||
  "Heartfelt Melody <orders@heartfeltmelody.com>";

const notifyEmail =
  process.env.ORDER_NOTIFY_EMAIL || "hello@heartfeltmelody.com";

export async function POST(req: Request) {
  const { session, metadata } = await req.json();

  const orderNumber = session.id;
  const totalPaid = ((session.amount_total || 0) / 100).toFixed(2);
  const customerEmail =
    session.customer_email || metadata.customerEmail || "";

  const ownerEmail = `
NEW HEARTFELT MELODY ORDER

Order Number:
${orderNumber}

Total Paid:
$${totalPaid}

Customer Email:
${customerEmail}

Recipient:
${metadata.recipientName || ""}

Relationship:
${metadata.relationship || ""}

Occasion:
${metadata.occasion || ""}

Genre:
${metadata.genre || ""}

Mood:
${metadata.mood || ""}

Singing Voice:
${metadata.voice || ""}

Favorite Songs / Artists:
${metadata.favoriteSongs || ""}

Story:
${metadata.story || ""}

Specific Lyrics:
${metadata.specificLyrics === "true" ? "Yes" : "No"}

Requested Lyrics:
${metadata.specificLyricsText || ""}

PDF Lyric Sheet:
${metadata.pdfLyrics === "true" ? "Yes" : "No"}

Commercial License:
${metadata.commercialLicense === "true" ? "Yes" : "No"}

Annual Subscription:
${metadata.annualSubscription === "true" ? "Yes" : "No"}

Tip:
$${metadata.tipAmount || "0"}

Stripe Session:
${orderNumber}
`;

  const customerEmailText = `
Hi,

Thank you for your Heartfelt Melody order. We received your payment and song details.

Order Number:
${orderNumber}

Total Paid:
$${totalPaid}

Recipient:
${metadata.recipientName || ""}

Occasion:
${metadata.occasion || ""}

Genre:
${metadata.genre || ""}

Mood:
${metadata.mood || ""}

Singing Voice:
${metadata.voice || ""}

We’ll send updates to this email address.

Questions? Email hello@heartfeltmelody.com.

With care,
Heartfelt Melody
`;

  await resend.emails.send({
    from: fromEmail,
    to: notifyEmail,
    subject: `New Heartfelt Melody Order - ${orderNumber}`,
    text: ownerEmail,
  });

  if (customerEmail) {
    await resend.emails.send({
      from: fromEmail,
      to: customerEmail,
      subject: `Your Heartfelt Melody Order - ${orderNumber}`,
      text: customerEmailText,
    });
  }

  return NextResponse.json({ ok: true });
}