import { useEffect, useRef, useState } from "react";

const ScoreGauge = ({ score = 75 }: { score: number }) => {
  const [pathLength, setPathLength] = useState(0);
  const pathRef = useRef<SVGPathElement>(null);

  const percentage = score / 100;

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

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
    <div className="flex flex-col items-center">
      <div className="relative w-40 h-20">
        <svg viewBox="0 0 100 50" className="w-full h-full">
          <defs>
            <linearGradient
              id="gaugeGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor={startColor} />
              <stop offset="100%" stopColor={endColor} />
            </linearGradient>
          </defs>

          {/* Background arc */}
          <path
            d="M10,50 A40,40 0 0,1 90,50"
            fill="none"
            stroke="#27272a"
            strokeWidth="10"
            strokeLinecap="round"
          />

          {/* Foreground arc with rounded ends */}
          <path
            ref={pathRef}
            d="M10,50 A40,40 0 0,1 90,50"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={pathLength}
            strokeDashoffset={pathLength * (1 - percentage)}
            // Adding a smooth transition so the bar animates nicely if the score updates
            style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
          <div className="text-xl font-semibold pt-4 text-white">
            {score}/100
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreGauge;