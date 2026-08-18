import React from "react"

interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  let badgeColor = "";
  let badgeText = "";
  
  if (score > 70) {
    badgeColor = "bg-[#DCFCE7] text-green-700";
    badgeText = "Strong";
  } else if (score > 49) {
    badgeColor = "bg-[#fceed8] text-yellow-600";
    badgeText = "Decent"
  } else {
    badgeColor = "bg-[#f9e3e2] text-red-600";
    badgeText = "Bad"
  }
  
  return (
    <div className={`px-3 py-1 rounded-full ${badgeColor}`}>
      <p className="text-sm font-medium">{badgeText}</p>
    </div>
  )
}

export default ScoreBadge;