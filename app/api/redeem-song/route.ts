import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

const fromEmail =
  process.env.RESEND_FROM_EMAIL ||
  "Heartfelt Melody <orders@heartfeltmelody.com>";

const notifyEmail =
  process.env.ORDER_NOTIFY_EMAIL || "hello@heartfeltmelody.com";

export async function POST(req: Request) {
  const form = await req.json();

  const requestNumber = `REDEEM-${Date.now()}`;

  const emailText = `
ANNUAL SONG PACKAGE REDEMPTION REQUEST

Request Number:
${requestNumber}

Package Email:
${form.customerEmail || ""}

Recipient:
${form.recipientName || ""}

Relationship:
${form.relationship || ""}

Occasion:
${form.occasion || ""}

Genre:
${form.genre || ""}

Mood:
${form.mood || ""}

Singing Voice:
${form.voice || ""}

Favorite Songs / Artists:
${form.favoriteSongs || ""}

Story:
${form.story || ""}

Specific Lyrics / Phrases:
${form.specificLyricsText || ""}

IMPORTANT:
Verify this email has an active Annual Song Package and remaining song credits before fulfillment.
`;

  await resend.emails.send({
    from: fromEmail,
    to: notifyEmail,
    replyTo: "hello@heartfeltmelody.com",
    subject: `Annual Song Package Request - ${requestNumber}`,
    text: emailText,
  });

  return NextResponse.json({ ok: true, requestNumber });
}