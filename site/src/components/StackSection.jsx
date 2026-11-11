import StackGrid from "./StackGrid";

export default function StackSection() {
  return (
    <section className="stack" aria-labelledby="stack-title">
      <div className="container container--full">
        <div className="proof__header reveal">
          <div>
            <span className="eyebrow">My stack</span>
            <h2 className="proof__title" id="stack-title">Tools I actually use</h2>
            <p className="proof__subtitle">The platforms behind the case studies. Tap a card to see how I use each one.</p>
          </div>
        </div>
        <StackGrid />
      </div>
    </section>
  );
}
