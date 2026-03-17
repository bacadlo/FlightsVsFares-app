import { EyebrowLabel } from '../../components/ui/EyebrowLabel';
import { Button } from '../../components/ui/Button';
import '../../styles/tips.css';

export const metadata = {
  title: 'Flight Search Tips — FlightsVsFares',
};

const TIPS = [
  {
    number: '01',
    title: 'Book 6–8 weeks out for long-haul',
    body: 'Pricing sweet spot for transatlantic and intercontinental routes. Too early and airlines haven\'t discounted. Too late and prices spike.',
    accent: '↗ Save up to 40%',
  },
  {
    number: '02',
    title: 'Tuesday & Wednesday departures win',
    body: 'Mid-week flights consistently undercut weekends. Shifting by one day can save $80–$200 on international routes.',
    accent: '↗ ~15% cheaper on average',
  },
  {
    number: '03',
    title: 'Try nearby hub airports',
    body: 'Flying into a major hub then connecting overland unlocks cheaper fares. Brussels, Amsterdam, Frankfurt regularly undercut Heathrow for African routes.',
    accent: '↗ $100–$250 savings possible',
  },
  {
    number: '04',
    title: 'Use incognito for price hunting',
    body: 'Flight sites track searches and raise prices dynamically. Always search in private mode and clear cookies between sessions.',
    accent: '↗ Avoid dynamic pricing traps',
  },
  {
    number: '05',
    title: 'Set fare alerts early',
    body: 'If travel is 3+ months out, set alerts on Google Flights and Kayak immediately to catch flash sales.',
    accent: '↗ Catch flash sales instantly',
  },
  {
    number: '06',
    title: 'Split tickets can be cheaper',
    body: 'Two separate one-ways — even on different airlines — sometimes beats a return fare. Kiwi.com specialises in these combinations.',
    accent: '↗ Kiwi.com is best for this',
  },
];

export default function TipsPage() {
  return (
    <main className="tips-page">
      <section className="page-header">
        <EyebrowLabel>Strategy Guide</EyebrowLabel>
        <h1 className="page-heading">FLIGHT TIPS</h1>
      </section>

      <div className="tips-grid">
        {TIPS.map((tip) => (
          <article key={tip.number} className="tip-card">
            <span className="tip-number" aria-hidden="true">{tip.number}</span>
            <h2 className="tip-title">{tip.title}</h2>
            <p className="tip-body">{tip.body}</p>
            <span className="tip-accent">{tip.accent}</span>
          </article>
        ))}
      </div>

      <footer className="tips-footer">
        <p className="tips-footer-text">Ready to put these tips to work?</p>
        <Button href="/search">Search Flights →</Button>
      </footer>
    </main>
  );
}
