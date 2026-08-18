import { cn } from "~/lib/utils";

const ATS = ({
  score,
  suggestions,
}: {
  score: number;
  suggestions: { type: "good" | "improve"; tip: string }[];
}) => {
  const scoreColor =
    score > 69
      ? "bg-green-100 text-green-700"
      : score > 49
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
    <div className="w-full rounded-xl border border-white/10 bg-neutral-950 p-6 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          

          <div>
            <h3 className="text-lg font-semibold text-white">
              ATS Score
            </h3>
            <p className="text-sm text-neutral-400">
              Applicant Tracking System compatibility
            </p>
          </div>
        </div>

        <span
          className={cn(
            "rounded-full px-3 py-1 text-sm font-semibold",
            scoreColor
          )}
        >
          {score}/100
        </span>
      </div>

      <div className="mt-6 space-y-3">
        {suggestions.map((suggestion, index) => (
          <div key={index} className="flex items-start gap-3">
            <img
              src={
                suggestion.type === "good"
                  ? "/icons/check.svg"
                  : "/icons/warning.svg"
              }
              alt=""
              className="mt-1 h-4 w-4"
            />

            <p className="text-sm leading-6 text-neutral-300">
              {suggestion.tip}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ATS;