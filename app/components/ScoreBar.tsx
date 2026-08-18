const ScoreBar = ({ score }: { score: number }) => {
  // Determine gradient colors based on score thresholds
  let startColor = "";
  let endColor = "";

  if (score >= 70) {
    // High Score: Green gradient
    startColor = "#6ee7b7";
    endColor = "#10b981";
  } else if (score >= 60) {
    // Medium Score: Yellow/Amber gradient
    startColor = "#fcd34d";
    endColor = "#f59e0b";
  } else {
    // Low Score: Red/Rose gradient
    startColor = "#fda4af";
    endColor = "#e11d48";
  }

  return (
    <div className="w-full">
      <div className="w-24 flex gap-2 mb-2">
        <span className="text-sm font-semibold text-white">{score}/100</span>
      </div>

      <div className="h-3 bg-white/10 overflow-hidden rounded-full shadow-inner">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${score}%`,
            background: `linear-gradient(90deg, ${startColor} 0%, ${endColor} 100%)`,
          }}
        />
      </div>
    </div>
  );
};

export default ScoreBar;