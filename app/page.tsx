"use client";

import Link from "next/link";
import "./home.css";

export default function HomePage() {
  return (
    <main className="homePage">
      <nav className="nav">
        <strong>Heartfelt Melody</strong>

        <div>
          <a href="#examples">Examples</a>
          <a href="#how">How It Works</a>
          <a href="#faq">FAQ</a>
          <Link className="navCta" href="/write">
            Create Your Song
          </Link>
        </div>
      </nav>
      <section className="promoBanner">
  🎵 Father's Day Special — Save $25 on any custom song with code{" "}
  <strong>DAD2026</strong> at checkout 🎵
</section>

      <section className="hero">
        <p className="scriptLine">A song made from their story</p>
        <h1>Turn Your Story Into A Song</h1>
        <p className="heroText">
          Custom songs written and recorded from your memories, stories, and
          special moments.
        </p>

        <div className="heroButtons">
          <Link className="primaryButton" href="/write">
            Create Your Song
          </Link>
          <a className="secondaryButton" href="#examples">
            See Examples
          </a>
        </div>
      </section>

      <section id="examples" className="section examples">
        <div className="sectionHeader">
          <p className="scriptLine">Real songs. Real stories. Real reactions.</p>
          <h2>Songs That Feel Personal</h2>
          <p>
            Hear examples, see reactions, and get inspired by the kinds of songs
            we can create.
          </p>
        </div>

        <div className="exampleGrid">
          <article className="exampleCard videoCard">
            <video
              className="reactionVideo"
              src="/videos/reaction-1.mp4"
              muted
              loop
              autoPlay
              playsInline
              preload="metadata"
              onClick={() => {
                const modal = document.querySelector(
                  ".videoModal"
                ) as HTMLDivElement;
                const modalVideo = document.querySelector(
                  ".modalVideo"
                ) as HTMLVideoElement;

                if (modal && modalVideo) {
                  modal.classList.add("isOpen");
                  modalVideo.currentTime = 0;
                  modalVideo.muted = false;
                  modalVideo.play();
                }
              }}
            />

            <p>Click to watch with sound.</p>

            <div
              className="videoModal"
              onClick={(e) => {
                const modal = e.currentTarget;
                const modalVideo = modal.querySelector("video");

                if (modalVideo) {
                  modalVideo.pause();
                  modalVideo.currentTime = 0;
                }

                modal.classList.remove("isOpen");
              }}
            >
              <button className="videoClose" type="button">
                ×
              </button>

              <video
                className="modalVideo"
                src="/videos/reaction-1.mp4"
                controls
                playsInline
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </article>

          <article className="exampleCard">
            <audio controls preload="none" className="audioPlayer">
              <source src="/audio/dad-rock-song.mp3" type="audio/mpeg" />
            </audio>
            <h3>A Song For Dad</h3>
            <p className="exampleTag">Rock</p>
            <p>
              A son wanted to thank his father for years of sacrifice, hard
              work, and always showing up when it mattered most.
            </p>
          </article>

          <article className="exampleCard">
            <audio controls preload="none" className="audioPlayer">
              <source
                src="/audio/brother-sister-country-song.mp3"
                type="audio/mpeg"
              />
            </audio>
            <h3>Brother & Sister</h3>
            <p className="exampleTag">Country</p>
            <p>
              A heartfelt country song about a brother who always protected his
              sister and stood by her through every chapter of life.
            </p>
          </article>

          <article className="exampleCard">
            <audio controls preload="none" className="audioPlayer">
              <source
                src="/audio/easy-love-pop-song.mp3"
                type="audio/mpeg"
              />
            </audio>
            <h3>The One Who Makes Life Easier</h3>
            <p className="exampleTag">Pop</p>
            <p>
              A modern love song celebrating the person who turns ordinary days
              into something brighter just by being there.
            </p>
          </article>

          <article className="exampleCard">
            <audio controls preload="none" className="audioPlayer">
              <source
                src="/audio/keep-the-faith-gospel-song.mp3"
                type="audio/mpeg"
              />
            </audio>
            <h3>Keep The Faith</h3>
            <p className="exampleTag">Gospel</p>
            <p>
              A gospel-inspired reminder that even during difficult seasons,
              hope, strength, and faith can carry us forward.
            </p>
          </article>
        </div>

        <Link className="textLink" href="/examples">
          See More Examples →
        </Link>
      </section>

      <section id="how" className="section how">
        <p className="scriptLine">Simple, heartfelt, unforgettable</p>
        <h2>How It Works</h2>

        <div className="howGrid">
          <div>
            <span>1</span>
            <h3>Tell Us Their Story</h3>
            <p>Share memories, moments, inside jokes, and meaningful details.</p>
          </div>

          <div>
            <span>2</span>
            <h3>We Write The Song</h3>
            <p>Our musicians turn your story into a custom recorded song.</p>
          </div>

          <div>
            <span>3</span>
            <h3>Receive & Share</h3>
            <p>Get a finished song ready to send, play, post, or keep forever.</p>
          </div>
        </div>

        <Link className="primaryButton" href="/write">
          Start Writing
        </Link>
      </section>

      <section className="section occasions">
        <div className="sectionHeader">
          <p className="scriptLine">For the people who matter most</p>
          <h2>Who Are You Writing For?</h2>
        </div>

        <div className="occasionGrid">
  <Link href="/write?recipient=wife">Wife</Link>
  <Link href="/write?recipient=husband">Husband</Link>
  <Link href="/write?recipient=son">Son</Link>
  <Link href="/write?recipient=daughter">Daughter</Link>
  <Link href="/write?recipient=brother">Brother</Link>
  <Link href="/write?recipient=sister">Sister</Link>
  <Link href="/write?recipient=mom">Mom</Link>
  <Link href="/write?recipient=dad">Dad</Link>
  <Link href="/write?recipient=friend">Friend</Link>
</div>
      </section>

      <section className="finalCta">
        <p className="scriptLine">One story. One song. Forever.</p>
        <h2>The Gift They’ll Never Forget</h2>
        <p>
          Start with a name, a story, and a few memories. We’ll handle the
          music.
        </p>

        <Link className="primaryButton" href="/write">
          Create Your Song
        </Link>
      </section>

      <section id="faq" className="section faq">
        <p className="scriptLine">A gift this personal should feel easy</p>
        <h2>FAQ</h2>

        <details>
          <summary>How does the process work?</summary>
          <p>
            You answer a few simple questions about the recipient, the occasion,
            the music style, and the story you want included. From there, we
            turn those details into a custom recorded song and deliver it to the
            email address you provide.
          </p>
        </details>

        <details>
          <summary>Who owns the rights to a song once it&apos;s created?</summary>
          <p>
            You own the rights to the song you create with us, it's included in our fee. Your lyrics and inspiration remain your intellectual property, and you may continue to use them for any other purpose. If
            you want to use the song commercially, please purchase the
            Commercial License add-on.
          </p>
        </details>

        <details>
          <summary>Do I need to know anything about music?</summary>
          <p>
            No. You can choose a genre and mood, but you do not need musical
            experience. If you are unsure, you can select “Surprise Me” or “No
            Preference,” and we will guide the song creatively.
          </p>
        </details>

        <details>
          <summary>Will the song actually feel personal?</summary>
          <p>
            Yes. The song is based on the names, memories, moments, inside
            jokes, and details you provide. The more meaningful details you
            share, the more personal the final song can feel.
          </p>
        </details>

        <details>
          <summary>Can I include specific lyrics or phrases?</summary>
          <p>
            Yes. During the story step, you can choose the specific lyrics
            add-on and provide exact words or phrases you would like included.
          </p>
        </details>

        <details>
          <summary>What if I am not sure what to write?</summary>
          <p>
            That is completely normal. You can write casually, like you are
            telling a friend about the person. Memories, personality traits,
            funny moments, and meaningful milestones are all helpful.
          </p>
        </details>

        <details>
          <summary>How much does a custom song cost?</summary>
          <p>
            Exact pricing is shown during the creation process after you choose
            your song options. Our goal is to offer professional custom songs at
            prices that beat many competitors while still supporting the
            musicians creating them.
          </p>
        </details>

        <details>
          <summary>How long does delivery take?</summary>
          <p>
            Standard delivery is 3–5 days. 24-hour expedited delivery is
            available as an add-on if you need the song ASAP. Perfect for
            last-minute gifts.
          </p>
        </details>

        <details>
          <summary>What if I don&apos;t approve of the song?</summary>
          <p>
            We offer up to 2 free revisions if you do not fall in love with the
            song at first listen.
          </p>
        </details>

        <details>
          <summary>Can I use the song for a business or public project?</summary>
          <p>
            Yes, but you will need to select the Commercial License add-on
            during the review step. This is required for advertising, business
            content, promotions, podcasts, YouTube channels, or other commercial
            uses.
          </p>
        </details>

        <details>
          <summary>Can I share the song online?</summary>
          <p>
            Yes. Personal sharing with friends and family is encouraged. After
            your song is delivered, you can share it with loved ones or post
            about your experience.
          </p>
        </details>
      </section>

      <footer className="footer">
        <div className="footerTop">
          <h3>Questions?</h3>
          <a href="mailto:hello@heartfeltmelody.com">
            hello@heartfeltmelody.com
          </a>
        </div>

        <div className="footerLinks">
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms-of-service">Terms of Service</Link>
          <Link href="/refund-policy">Refund Policy</Link>
        </div>

        <p className="copyright">
          © 2026 Heartfelt Melody. All rights reserved.
        </p>
      </footer>
    </main>
  );
}