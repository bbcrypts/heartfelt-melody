import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY!);

const fromEmail =
  process.env.RESEND_FROM_EMAIL ||
  "Heartfelt Melody <orders@heartfeltmelody.com>";

const notifyEmail =
  process.env.ORDER_NOTIFY_EMAIL || "hello@heartfeltmelody.com";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return new NextResponse("Webhook signature verification failed", {
      status: 400,
    });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const m = session.metadata || {};

  const orderNumber = session.id;
  const totalPaid = ((session.amount_total || 0) / 100).toFixed(2);
  const customerEmail = session.customer_email || m.customerEmail || "";

  const ownerEmail = `
NEW HEARTFELT MELODY ORDER

Order Number:
${orderNumber}

Total Paid:
$${totalPaid}

Customer Email:
${customerEmail}

Recipient:
${m.recipientName || ""}

Relationship:
${m.relationship || ""}

Occasion:
${m.occasion || ""}

Genre:
${m.genre || ""}

Mood:
${m.mood || ""}

Singing Voice:
${m.voice || ""}

Favorite Songs / Artists:
${m.favoriteSongs || ""}

Story:
${m.story || ""}

Specific Lyrics:
${m.specificLyrics === "true" ? "Yes" : "No"}

Requested Lyrics:
${m.specificLyricsText || ""}

PDF Lyric Sheet:
${m.pdfLyrics === "true" ? "Yes" : "No"}

Commercial License:
${m.commercialLicense === "true" ? "Yes" : "No"}

Annual Subscription:
${m.annualSubscription === "true" ? "Yes" : "No"}

Tip:
$${m.tipAmount || "0"}

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
${m.recipientName || ""}

Occasion:
${m.occasion || ""}

Genre:
${m.genre || ""}

Mood:
${m.mood || ""}

Singing Voice:
${m.voice || ""}

Selected Add-ons:
${m.specificLyrics === "true" ? "- Specific lyrics\n" : ""}${
    m.pdfLyrics === "true" ? "- PDF lyric sheet\n" : ""
  }${m.commercialLicense === "true" ? "- Commercial license\n" : ""}${
    m.annualSubscription === "true" ? "- Annual subscription\n" : ""
  }

We’ll send updates to this email address.

Questions? Email hello@heartfeltmelody.com.

With care,
Heartfelt Melody
`;

  await resend.emails.send({
    from: fromEmail,
    to: notifyEmail,
    replyTo: "hello@heartfeltmelody.com",
    subject: `New Heartfelt Melody Order - ${orderNumber}`,
    text: ownerEmail,
  });

  if (customerEmail) {
    await resend.emails.send({
      from: fromEmail,
      to: customerEmail,
      replyTo: "hello@heartfeltmelody.com",
      subject: `Your Heartfelt Melody Order - ${orderNumber}`,
      text: customerEmailText,
    });
  }

  return NextResponse.json({ received: true });
}