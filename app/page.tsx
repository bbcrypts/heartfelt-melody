import Link from "next/link";
import "./home.css";

export default function HomePage() {
  return (
    <main className="homePage">
      <nav className="nav">
        <strong>Custom Songs</strong>

        <div>
          <a href="#examples">Examples</a>
          <a href="#how">How It Works</a>
          <a href="#faq">FAQ</a>
          <Link className="navCta" href="/write">
            Create Your Song
          </Link>
        </div>
      </nav>

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
          <p className="scriptLine">Made to be remembered</p>
          <h2>Songs That Feel Personal</h2>
          <p>
            Hear examples, see reactions, and get inspired by the kinds of songs
            we can create.
          </p>
        </div>

        <div className="exampleGrid">
          <article className="exampleCard videoCard">
            <div className="mediaPlaceholder">Reaction Video</div>
            <p>“She cried before the first chorus.”</p>
          </article>

          <article className="exampleCard">
            <div className="audioPlaceholder">Audio Sample</div>
            <h3>Birthday Song For Daughter</h3>
            <p>“From the first steps to the dreams ahead…”</p>
          </article>

          <article className="exampleCard">
            <div className="audioPlaceholder">Audio Sample</div>
            <h3>Anniversary Song For Wife</h3>
            <p>“Every year, I’d choose you again…”</p>
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
          <Link href="/song-for-wife">Wife</Link>
          <Link href="/song-for-husband">Husband</Link>
          <Link href="/song-for-son">Son</Link>
          <Link href="/song-for-daughter">Daughter</Link>
          <Link href="/song-for-brother">Brother</Link>
          <Link href="/song-for-sister">Sister</Link>
          <Link href="/song-for-mom">Mom</Link>
          <Link href="/song-for-dad">Dad</Link>
          <Link href="/song-for-friend">Friend</Link>
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
            turn those details into a custom recorded song and deiliver to the email address you provide.
          </p>
        </details>
         <details>
          <summary>Who owns the rights to a song once it's created?</summary>
          <p>
            You retain 100% of the rights of any song you create with us. This is included in our fee. If you 
            want to use the song commercially, please be sure to purchase the "Commercial License" add-on. 
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
            prices that beat our competitors while still supporting the
            musicians creating them.
          </p>
        </details>

        <details>
          <summary>How long does delivery take?</summary>
          <p>
            Standard delivery in 3-5 days. 24hr expedited
            delivery is available as an add-on if you need the song ASAP. Perfect for last minute gifts!.
          </p>
        </details>

        <details>
          <summary>What if I don't approve of the song?</summary>
          <p>
            We offer up to 2 free revisions completely on the house in case you don't fall in love with the song at first listen.
          </p>
        </details>

        <details>
          <summary>Can I use the song for a business or public project?</summary>
          <p>
            Yes, but you will need to select the commercial use license during
            the review step for an extra charge. This is required for advertising, business content,
            promotions, podcasts, YouTube channels, or other commercial uses.
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
    © 2026 Your Brand Name. All rights reserved.
  </p>
</footer>
    </main>
  );
}