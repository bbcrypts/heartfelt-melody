import Link from "next/link";
import "./success.css";

export default function SuccessPage() {
  return (
    <main className="successPage">
      <section className="successCard">
        <p className="scriptLine">We’ve got your story.</p>

        <h1>Thank you for your order.</h1>

        <p>
          Your payment went through, and your custom song details have been
          received. We’ll begin turning everything you shared into something
          heartfelt and personal.
        </p>

        <p>
          Keep an eye on your email for updates. If you need anything, you can
          always reach us at{" "}
          <a href="mailto:hello@heartfeltmelody.com">
            hello@heartfeltmelody.com
          </a>.
        </p>

        <Link href="/" className="homeButton">
          Back to Home
        </Link>
      </section>
    </main>
  );
}