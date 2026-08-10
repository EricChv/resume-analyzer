import React from "react";
import ScoreGauge from "./ScoreGauge";
import ScoreBadge from "./ScoreBadge";

const Category = ({
  title,
  score,
}: {
  title: string;
  score: number;
}) => {
  const textColor =
    score > 69
      ? "text-green-600"
      : score > 49
      ? "text-yellow-600"
      : "text-red-600";

  return (
    <div className="flex items-center justify-between py-4 border-t border-gray-100 first:border-t-0">
      <div className="flex items-center gap-3">
        <p className="text-sm font-medium text-gray-900">{title}</p>
      </div>

      <p className="text-sm font-medium text-gray-500">
        <span className={textColor}>{score}</span>/100
      </p>
    </div>
  );
};

const Summary = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-6">
      <div className="flex items-center gap-5">
        <ScoreGauge score={feedback.overallScore} />

        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-900">
            Resume Score
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Overall evaluation based on tone, content, structure, and skills.
          </p>
        </div>

        <ScoreBadge score={feedback.overallScore} />
      </div>

      <div className="mt-6">
        <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
        <Category title="Content" score={feedback.content.score} />
        <Category title="Structure" score={feedback.structure.score} />
        <Category title="Skills" score={feedback.skills.score} />
      </div>
    </div>
  );
};

export default Summary;