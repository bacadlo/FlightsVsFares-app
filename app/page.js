import { EyebrowLabel } from '../components/ui/EyebrowLabel';
import { Button } from '../components/ui/Button';
import { ChatPanel } from '../components/chat/ChatPanel';
import '../styles/home.css';

const STATS = [
  { number: '8',  label: 'Sites searched simultaneously' },
  { number: 'AI', label: 'Strategy advice before you book' },
  { number: '0',  label: 'Cost to use — always free' },
];

export default function Home() {
  return (
    <main className="home">
      <section className="hero">
        <div className="hero-left">
          <EyebrowLabel>AI-Powered Flight Search</EyebrowLabel>

          <h1 className="hero-headline">
            <span className="headline-line">FIND YOUR</span>
            <span className="headline-line">CHEAPEST</span>
            <span className="headline-line headline-ghost">FLIGHT.</span>
          </h1>

          <p className="hero-subhead">
            Describe your trip, get AI strategy advice, then open all 8 major
            booking sites simultaneously — in one click.
          </p>

          <div className="hero-cta">
            <Button href="/search">Search Flights →</Button>
            <Button href="/tips" variant="ghost">Flight Tips</Button>
          </div>
        </div>

        <ChatPanel preview />
      </section>

      <div className="stats-row" role="list">
        {STATS.map(({ number, label }) => (
          <div key={label} className="stats-cell" role="listitem">
            <span className="stats-number">{number}</span>
            <span className="stats-label">{label}</span>
          </div>
        ))}
      </div>

      <footer className="home-footer">
        <span className="home-footer-text">
          FlightsVsFares — No ads · No tracking
        </span>
        <span className="home-footer-text">Powered by Claude AI</span>
      </footer>
    </main>
  );
}
