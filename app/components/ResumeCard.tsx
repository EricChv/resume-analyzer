import React from 'react'
import { Link } from 'react-router'
import ScoreBar from './ScoreBar'

const ResumeCard = ( { resume : {id, companyName, jobTitle, feedback, imagePath} }: {resume : Resume}) => {
  return (
    <Link to={`/resume/${id}`} className='resume-card shadow-md animate-in fade-in duration-1000'>

      <div>
        <div className='flex flex-col'>
          <h2 className='text-black! font-semibold break-word'>
            {companyName}
          </h2>
          <h3 className='text-lg break-word text-gray-600'>
            {jobTitle}
          </h3>
        </div>

        <div className='mt-4 shrink-0'>
          <ScoreBar score={feedback.overallScore}/>
        </div>
      </div>

      <div className='border border-gray-300 rounded-lg  overflow-hidden
      animate-in fade-in duration-1000'>
        <div className='w-full h-full'>
          <img
            src={imagePath}
            alt="resume"
            className='w-full h-[350px] max-sm:h-[200px] object-cover object-top'
          />
        </div>
      </div>


    </Link>
  )
}

export default ResumeCard
