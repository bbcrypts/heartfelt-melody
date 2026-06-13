"use client";

import { useState } from "react";
import "./redeem.css";

const steps = ["Email", "Recipient", "Occasion", "Music", "Story", "Submit"];

export default function RedeemPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

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
    specificLyricsText: "",
  });

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function next() {
    setStep((s) => Math.min(s + 1, steps.length - 1));
  }

  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }

  async function handleSubmit() {
    const email = form.customerEmail.trim().toLowerCase();
    const confirmEmail = form.confirmEmail.trim().toLowerCase();

    if (!isValidEmail(email)) {
      alert("Please enter a valid package email address.");
      return;
    }

    if (email !== confirmEmail) {
      alert("Please make sure both email fields match.");
      return;
    }

    const res = await fetch("/api/redeem-song", {
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

    if (!res.ok) {
      alert("Something went wrong. Please email hello@heartfeltmelody.com.");
      return;
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main className="redeemPage">
        <section className="redeemCard success">
          <p className="scriptLine">We received your song request.</p>
          <h1>Thank you.</h1>
          <p>
            We’ll review your Annual Song Package request and follow up by
            email.
          </p>
          <a href="/">Back Home</a>
        </section>
      </main>
    );
  }

  return (
    <main className="redeemPage">
      <section className="redeemWizard">
        <p className="scriptLine">Annual Song Package</p>
        <h1>Redeem an Included Song</h1>
        <p className="intro">
          Use this page only if you already purchased the Annual Song Package.
          Please use the same email address from your original checkout.
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
          <StepCard title="Package Email">
            <label>
              Email Used To Purchase Package
              <input
                type="email"
                value={form.customerEmail}
                onChange={(e) => update("customerEmail", e.target.value)}
                placeholder="you@example.com"
              />
            </label>

            <label>
              Confirm Email
              <input
                type="email"
                value={form.confirmEmail}
                onChange={(e) => update("confirmEmail", e.target.value)}
                placeholder="you@example.com"
              />
            </label>
          </StepCard>
        )}

        {step === 1 && (
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

        {step === 2 && (
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

        {step === 3 && (
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
                "Gospel",
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

        {step === 4 && (
          <StepCard title="Tell us their story">
            <label>
              Stories, memories, inside jokes, or special moments
              <textarea
                className="largeText"
                value={form.story}
                onChange={(e) => update("story", e.target.value)}
                placeholder="Share anything you'd like us to know."
              />
            </label>

            <label>
              Specific lyrics or phrases, optional
              <textarea
                maxLength={300}
                value={form.specificLyricsText}
                onChange={(e) => update("specificLyricsText", e.target.value)}
                placeholder="Max 300 characters"
              />
              <small>{form.specificLyricsText.length}/300</small>
            </label>
          </StepCard>
        )}

        {step === 5 && (
          <StepCard title="Review & Submit">
            <div className="summary">
              <p><strong>Email:</strong> {form.customerEmail || "—"}</p>
              <p><strong>Recipient:</strong> {form.recipientName || "—"}</p>
              <p><strong>Relationship:</strong> {form.relationship || "—"}</p>
              <p><strong>Occasion:</strong> {form.occasion || "—"}</p>
              <p><strong>Genre:</strong> {form.genre || "—"}</p>
              <p><strong>Mood:</strong> {form.mood || "—"}</p>
              <p><strong>Voice:</strong> {form.voice || "—"}</p>
              <p><strong>Specific Lyrics:</strong> {form.specificLyricsText || "—"}</p>
            </div>

            <button className="submitButton" onClick={handleSubmit}>
              Submit Song Request
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
    <div className="redeemCard">
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