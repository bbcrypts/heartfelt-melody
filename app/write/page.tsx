"use client";

import { useMemo, useState } from "react";
import "./write.css";

const steps = ["Recipient", "Occasion", "Music", "Story", "Review", "Checkout"];

const BASE_PRICE = 79;
const SPECIFIC_LYRICS_PRICE = 15;
const PDF_LYRICS_PRICE = 8;
const COMMERCIAL_LICENSE_PRICE = 60;
const ANNUAL_PRICE = 300;

export default function WritePage() {
  const [step, setStep] = useState(0);

  const [form, setForm] = useState({
    customerEmail: "",
    confirmEmail: "",
    recipientName: "",
    relationship: "",
    occasion: "",
    genre: "",
    mood: "",
    voice: "",
    favoriteSongs: "",
    story: "",
    specificLyrics: false,
    specificLyricsText: "",
    pdfLyrics: false,
    commercialLicense: false,
    annualSubscription: false,
    tipAmount: "",
  });

  const total = useMemo(() => {
    let price = form.annualSubscription ? ANNUAL_PRICE : BASE_PRICE;

    if (form.specificLyrics) price += SPECIFIC_LYRICS_PRICE;
    if (form.pdfLyrics) price += PDF_LYRICS_PRICE;
    if (form.commercialLicense) price += COMMERCIAL_LICENSE_PRICE;
    price += Number(form.tipAmount || 0);

    return price;
  }, [form]);

  function update(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function next() {
    setStep((s) => Math.min(s + 1, steps.length - 1));
  }

  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  async function handleCheckout() {
    const email = form.customerEmail.trim().toLowerCase();
    const confirmEmail = form.confirmEmail.trim().toLowerCase();

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address before checkout.");
      return;
    }

    if (email !== confirmEmail) {
      alert("Please make sure both email fields match.");
      return;
    }

    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        customerEmail: email,
        confirmEmail,
      }),
    });

    const text = await res.text();

    if (!res.ok) {
      console.error("Checkout error:", text);
      alert("Checkout failed. Check the browser console or terminal.");
      return;
    }

    if (!text) {
      alert("Checkout failed: the server returned an empty response.");
      return;
    }

    const data = JSON.parse(text);

    if (data.url) {
      window.location.href = data.url;
    } else {
      console.error("Checkout response missing URL:", data);
      alert("Checkout failed: no Stripe URL was returned.");
    }
  }

  return (
    <main className="writePage">
      <section className="wizard">
        <h1>Create Your Custom Song</h1>
        <p className="intro">
          Tell us the story. We’ll turn it into a song they’ll never forget.
        </p>

        <div className="progress">
          {steps.map((label, index) => (
            <div
              key={label}
              className={`progressStep ${index <= step ? "active" : ""}`}
            >
              <span>{index + 1}</span>
              <p>{label}</p>
            </div>
          ))}
        </div>

        {step === 0 && (
          <StepCard title="Who is this song for?">
            <label>
              Recipient’s Name
              <input
                value={form.recipientName}
                onChange={(e) => update("recipientName", e.target.value)}
                placeholder="Ex: Sarah"
              />
            </label>

            <ButtonGrid
              label="Relationship"
              options={[
                "Spouse / Partner",
                "Parent",
                "Child",
                "Sibling",
                "Friend",
                "Coworker",
                "Grandparent",
                "Other",
              ]}
              selected={form.relationship}
              onSelect={(v) => update("relationship", v)}
            />
          </StepCard>
        )}

        {step === 1 && (
          <StepCard title="What is the occasion?">
            <ButtonGrid
              options={[
                "Birthday",
                "Anniversary",
                "Wedding",
                "Memorial",
                "Retirement",
                "Graduation",
                "Proposal",
                "Just Because",
                "Other",
              ]}
              selected={form.occasion}
              onSelect={(v) => update("occasion", v)}
            />
          </StepCard>
        )}

        {step === 2 && (
          <StepCard title="Choose the sound">
            <ButtonGrid
              label="Genre"
              options={[
                "Pop",
                "Country",
                "Rock",
                "Folk",
                "Singer-Songwriter",
                "R&B",
                "Hip-Hop",
                "Surprise Me",
              ]}
              selected={form.genre}
              onSelect={(v) => update("genre", v)}
            />

            <ButtonGrid
              label="Mood"
              options={[
                "Heartfelt",
                "Funny",
                "Romantic",
                "Nostalgic",
                "Inspirational",
                "Celebratory",
                "Emotional",
                "Upbeat",
              ]}
              selected={form.mood}
              onSelect={(v) => update("mood", v)}
            />

            <ButtonGrid
              label="Singing Voice"
              options={["Male", "Female", "No Preference"]}
              selected={form.voice}
              onSelect={(v) => update("voice", v)}
            />

            <label>
              Favorite Songs or Artists
              <textarea
                value={form.favoriteSongs}
                onChange={(e) => update("favoriteSongs", e.target.value)}
                placeholder="Tell us about songs, artists, or styles they love."
              />
            </label>
          </StepCard>
        )}

        {step === 3 && (
          <StepCard title="Tell us their story">
            <label>
              Stories, memories, inside jokes, or special moments
              <textarea
                value={form.story}
                onChange={(e) => update("story", e.target.value)}
                placeholder="Share anything you'd like us to know about them."
                className="largeText"
              />
            </label>

            <label className="checkboxRow">
              <input
                type="checkbox"
                checked={form.specificLyrics}
                onChange={(e) => update("specificLyrics", e.target.checked)}
              />
              Include specific lyrics or phrases (+${SPECIFIC_LYRICS_PRICE})
            </label>

            {form.specificLyrics && (
              <label>
                Specific lyrics or phrases
                <textarea
                  maxLength={300}
                  value={form.specificLyricsText}
                  onChange={(e) =>
                    update("specificLyricsText", e.target.value)
                  }
                  placeholder="Max 300 characters"
                />
                <small>{form.specificLyricsText.length}/300</small>
              </label>
            )}

            <label className="checkboxRow">
              <input
                type="checkbox"
                checked={form.pdfLyrics}
                onChange={(e) => update("pdfLyrics", e.target.checked)}
              />
              Add a PDF lyric sheet (+${PDF_LYRICS_PRICE})
            </label>
          </StepCard>
        )}

        {step === 4 && (
          <StepCard title="Review your selections">
            <div className="summary">
              <p><strong>Recipient:</strong> {form.recipientName || "—"}</p>
              <p><strong>Relationship:</strong> {form.relationship || "—"}</p>
              <p><strong>Occasion:</strong> {form.occasion || "—"}</p>
              <p><strong>Genre:</strong> {form.genre || "—"}</p>
              <p><strong>Mood:</strong> {form.mood || "—"}</p>
              <p><strong>Voice:</strong> {form.voice || "—"}</p>
              <p><strong>PDF Lyric Sheet:</strong> {form.pdfLyrics ? "Yes" : "No"}</p>
              <p><strong>Specific Lyrics:</strong> {form.specificLyrics ? "Yes" : "No"}</p>

              {form.specificLyrics && (
                <p>
                  <strong>Requested Lyrics:</strong>{" "}
                  {form.specificLyricsText || "—"}
                </p>
              )}
            </div>

            <label className="checkboxRow">
              <input
                type="checkbox"
                checked={form.commercialLicense}
                onChange={(e) =>
                  update("commercialLicense", e.target.checked)
                }
              />
              Add commercial use license? (+${COMMERCIAL_LICENSE_PRICE})
            </label>

            <small>
              Required for business, advertising, promotional, podcast, YouTube,
              or other commercial use.
            </small>
          </StepCard>
        )}

        {step === 5 && (
          <StepCard title="Checkout">
            <label>
              Your Email Address
              <input
                type="email"
                value={form.customerEmail}
                onChange={(e) => update("customerEmail", e.target.value)}
                placeholder="you@example.com"
              />
            </label>

            <label>
              Confirm Email Address
              <input
                type="email"
                value={form.confirmEmail}
                onChange={(e) => update("confirmEmail", e.target.value)}
                placeholder="you@example.com"
              />
            </label>

            <p className="helperText">
              We’ll send order updates and your completed song to this email.
            </p>

            <div className="trustBox">
              <p>✓ Secure checkout powered by Stripe</p>
              <p>✓ Delivered by email</p>
              <p>
                ✓ Questions?{" "}
                <a href="mailto:hello@heartfeltmelody.com">
                  hello@heartfeltmelody.com
                </a>
              </p>
            </div>

            <div className="subscriptionBox">
              <p className="saleBadge">BEST VALUE</p>
              <p className="seasonalLine">See you at Thanksgiving?</p>

              <h3>Upgrade to Annual Song Package</h3>

              <p className="subscriptionLead">
                Get up to 25 custom songs over the next 12 months for a
                one-time payment of just ${ANNUAL_PRICE}.
              </p>

              <div className="savingsCallout">
                As low as $12 per song when fully utilized. Perfect for
                birthdays, anniversaries, holidays, graduations, retirements,
                and every meaningful moment in between.
              </div>

              <div className="songCards">
                <span>Birthdays</span>
                <span>Anniversaries</span>
                <span>Weddings</span>
                <span>Retirements</span>
                <span>Mother’s Day</span>
                <span>Father’s Day</span>
              </div>

              <label className="checkboxRow">
                <input
                  type="checkbox"
                  checked={form.annualSubscription}
                  onChange={(e) =>
                    update("annualSubscription", e.target.checked)
                  }
                />
                Add Annual Song Package (${ANNUAL_PRICE})
              </label>

              {form.annualSubscription && (
                <p className="subscriptionDisclosure">
                  This is a one-time purchase, not a recurring subscription.
                  Your package includes up to 25 custom songs submitted from the
                  purchasing email address within 12 months of purchase. To
                  redeem included songs, email{" "}
                  <a href="mailto:hello@heartfeltmelody.com">
                    hello@heartfeltmelody.com
                  </a>{" "}
                  from the same email address used at checkout.
                </p>
              )}
            </div>

            <div className="priceBox">
              <h3>Price Breakdown</h3>
              <p>
                {form.annualSubscription ? "Annual song package" : "Base song"}: $
                {form.annualSubscription ? ANNUAL_PRICE : BASE_PRICE}
              </p>
              {form.specificLyrics && (
                <p>Specific lyrics: +${SPECIFIC_LYRICS_PRICE}</p>
              )}
              {form.pdfLyrics && <p>PDF lyric sheet: +${PDF_LYRICS_PRICE}</p>}
              {form.commercialLicense && (
                <p>Commercial license: +${COMMERCIAL_LICENSE_PRICE}</p>
              )}
              {Number(form.tipAmount) > 0 && (
                <p>Musician tip: +${form.tipAmount}</p>
              )}
              <h2>Total: ${total}</h2>
            </div>

            <div className="tipBox">
              <label>
                Include a tip to our musicians?
                <div className="tipInputWrap">
                  <span>$</span>
                  <input
                    className="tipInput"
                    inputMode="numeric"
                    value={form.tipAmount}
                    onChange={(e) =>
                      update("tipAmount", e.target.value.replace(/\D/g, ""))
                    }
                    placeholder="0"
                  />
                </div>
              </label>
            </div>

            <button className="payButton" onClick={handleCheckout}>
              Complete Secure Checkout
            </button>
          </StepCard>
        )}

        <div className="navButtons">
          {step > 0 && <button onClick={back}>Back</button>}
          {step < steps.length - 1 && <button onClick={next}>Continue</button>}
        </div>
      </section>
    </main>
  );
}

function StepCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="stepCard">
      <h2>{title}</h2>
      {children}
    </div>
  );
}

function ButtonGrid({
  label,
  options,
  selected,
  onSelect,
}: {
  label?: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="buttonGroup">
      {label && <h3>{label}</h3>}
      <div className="buttonGrid">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className={selected === option ? "selected" : ""}
            onClick={() => onSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}