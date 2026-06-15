interface TickerProps {
  items: string[];
}

export function Ticker({ items }: TickerProps) {
  const doubled = [...items, ...items];
  return (
    <div className="ticker-wrap">
      <div className="ticker" aria-live="off">
        {doubled.map((text, i) => (
          <span key={`${text}-${i}`} className="t-item">
            <span className="t-dot" aria-hidden="true" />
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
