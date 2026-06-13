import Link from "next/link";
import "./examples.css";

export default function ExamplesPage() {
  return (
    <main className="examplesPage">
      <div className="examplesWrap">
        <Link href="/" className="backLink">
          ← Back Home
        </Link>

        <section className="examplesHero">
          <h1>Song Examples</h1>
          <p>
            Every song begins with a real story. Listen to a few examples of the
            styles, occasions, and emotions we can create.
          </p>
        </section>

        <section className="examplesSection">
          <h2>Reaction Video</h2>

          <div className="examplesGrid">
            <article className="exampleCard videoCard">
              <video src="/videos/reaction-1.mp4" controls playsInline />
            </article>
          </div>
        </section>

        <section className="examplesSection">
          <h2>Song Examples</h2>

          <div className="examplesGrid songGrid">
            <article className="exampleCard">
              <audio controls preload="none" className="audioPlayer">
                <source src="/audio/dad-rock-song.mp3" type="audio/mpeg" />
              </audio>
              <h3>A Song For Dad</h3>
              <div className="exampleGenre">Rock</div>
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
              <div className="exampleGenre">Country</div>
              <p>
                A heartfelt country song about a brother who always protected
                his sister and stood by her through every chapter of life.
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
              <div className="exampleGenre">Pop</div>
              <p>
                A modern love song celebrating the person who turns ordinary
                days into something brighter just by being there.
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
              <div className="exampleGenre">Gospel</div>
              <p>
                A gospel-inspired reminder that even during difficult seasons,
                hope, strength, and faith can carry us forward.
              </p>
            </article>
          </div>
        </section>

        <div className="examplesCta">
          <Link href="/write" className="homeButton">
            Create Your Song
          </Link>
        </div>
      </div>
    </main>
  );
}