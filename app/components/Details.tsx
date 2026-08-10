import { cn } from "~/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "./Accordion";

const ScoreBadge = ({ score }: { score: number }) => {
  const scoreColor =
    score > 69
      ? "bg-green-100 text-green-700"
      : score > 39
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
    <span
      className={cn(
        "rounded-full px-3 py-1 text-sm font-semibold",
        scoreColor
      )}
    >
      {score}/100
    </span>
  );
};

const CategoryHeader = ({
  title,
  categoryScore,
    }: {
      title: string;
      categoryScore: number;
  }) => {
  return (
      <div className="flex gap-4 items-center py-2">
        <p className="text-base font-semibold">{title}</p>
        <ScoreBadge score={categoryScore} />
      </div>
  );
};

const CategoryContent = ({
  tips,
}: {
  tips: { type: "good" | "improve"; tip: string; explanation: string }[];
}) => {
  return (
    <div className="space-y-4 pb-4">
      {tips.map((tip, index) => (
        <div
          key={index}
          className="flex gap-3 border-l-2 border-gray-200 pl-4"
        >
          <img
            src={
              tip.type === "good"
                ? "/icons/check.svg"
                : "/icons/warning.svg"
            }
            alt=""
            className="mt-1 h-4 w-4"
          />

          <div>
            <p className="text-sm font-medium text-gray-900">
              {tip.tip}
            </p>

            <p className="mt-1 text-sm leading-6 text-gray-500">
              {tip.explanation}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

const Details = ({ feedback }: { feedback: Feedback }) => {
  return (
      <div className="flex flex-col gap-4 w-full">
        <div className="w-full rounded-xl border border-gray-200 bg-white p-6">
          <Accordion>
          <AccordionItem id="tone-style" >
            <AccordionHeader itemId="tone-style">
              <CategoryHeader
                  title="Tone & Style"
                  categoryScore={feedback.toneAndStyle.score}
              />
            </AccordionHeader>
            <AccordionContent itemId="tone-style">
              <CategoryContent tips={feedback.toneAndStyle.tips} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem id="content">
            <AccordionHeader itemId="content">
              <CategoryHeader
                  title="Content"
                  categoryScore={feedback.content.score}
              />
            </AccordionHeader>
            <AccordionContent itemId="content">
              <CategoryContent tips={feedback.content.tips} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem id="structure">
            <AccordionHeader itemId="structure">
              <CategoryHeader
                  title="Structure"
                  categoryScore={feedback.structure.score}
              />
            </AccordionHeader>
            <AccordionContent itemId="structure">
              <CategoryContent tips={feedback.structure.tips} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem id="skills">
            <AccordionHeader itemId="skills">
              <CategoryHeader
                  title="Skills"
                  categoryScore={feedback.skills.score}
              />
            </AccordionHeader>
            <AccordionContent itemId="skills">
              <CategoryContent tips={feedback.skills.tips} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        </div>
        
      </div>
  );
};

export default Details;