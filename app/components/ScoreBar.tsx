const ScoreBar = ({ score }: {score: number}) => {
  return (
    <div className="w-full">
      <div className="w-24 flex gap-2 mb-2">
        <span className="text-sm font-semibold">{score}/100</span>
      </div>

      <div className="h-3 bg-gray-200 overflow-hidden shadow-inner">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${score}%`,
            background: "linear-gradient(90deg, #ffbab3 0%, #FE5948 100%)",
          }}
        />
      </div>
    </div>
  )
}
export default ScoreBar