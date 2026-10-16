// Visual match-percentage bar with optional explanation reasons.
export default function MatchBar({ percentage, reasons }) {
  return (
    <div>
      <div className="match">
        <span className="chip chip--match">Career Match</span>
        <div className="match__bar">
          <div className="match__fill" style={{ width: `${percentage}%` }} />
        </div>
        <span className="match__pct">{percentage}%</span>
      </div>
      {reasons && reasons.length > 0 && (
        <ul className="reasons">
          {reasons.map((reason, i) => (
            <li key={i}>{reason}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
