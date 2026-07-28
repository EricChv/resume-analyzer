import React, { useState, type FormEvent } from 'react'
import FileUploader from '~/components/FileUploader';
import Navbar from '~/components/navbar'

const upload = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState('')
  const [file, setFile] = useState(null)

  const handleFileSelect = (file : File | null) => {
    setFile(file)
  } 

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {

  }

  return (
    <main className="min-h-screen">
      <div className="bg-[#FF5948] text-black flex flex-col">
        <Navbar />

        <section className="main-section">
          <div className="heading-content">
            <h1>AI-powered Resume Analysis</h1>
            {isProcessing ? (
              <>
                <h2>{statusText}</h2>
                <img src="/images/resume-scan.gif" className="w-50" />
              </>
            // if processing
            ) :  (
              <h2>Upload Resume to improve your ATS score, find weaknesses, and improve outcomes</h2>
            )}
          </div>
        </section>
      </div>
      
      {/* Section outside header */}
      {!isProcessing && (
        <section className="flex justify-center py-12 px-4">
  <form
    onSubmit={handleSubmit}
    className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-4"
  >
    <div className="form-div">
      <label htmlFor="company-name">Company Name</label>
      <input
        type="text"
        id="company-name"
        placeholder='Company Name'
        className="w-full rounded-lg border border-gray-300 px-4 py-3"
      />
    </div>
    <div className="form-div">
      <label htmlFor="job-title">Job Title</label>
      <input
        type="text"
        id="job-title"
        placeholder='Job Title'
        className="w-full rounded-lg border border-gray-300 px-4 py-3"
      />
    </div>
    <div className="form-div">
      <label htmlFor="job-description">Job Description</label>
      <textarea
        rows={3}
        id="job-description"
        placeholder='Job Description'
        className="w-full rounded-lg border border-gray-300 px-4 py-3"
      />
    </div>
    <div className="form-div">
      <label htmlFor="uploader">Upload Resume</label>
      <FileUploader onFileSelect={handleFileSelect}/>
    </div>

    <button className='primary-button w-full cursor-pointer mt-4'  type="submit">Analyze</button>
  </form>
</section>
        
      )}

    </main>
  ) 
}

export default upload