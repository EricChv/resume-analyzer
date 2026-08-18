import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import FileUploader from '~/components/FileUploader';
import Navbar from '~/components/navbar'
import { convertPdfToImage } from '~/lib/pdfToImage';
import { extractPdfText } from '~/lib/pdfToText';
import { usePuterStore } from '~/lib/puter';
import { generateUUID } from '~/lib/utils';
import { AIResponseFormat, prepareInstructions } from '../../constants';

const upload = () => {
  const { auth, isLoading, fs, ai, kv } = usePuterStore();
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState('')
  const [file, setFile] = useState<File | null>(null)

  const parseFeedbackJson = (text: string) => {
    const cleanedText = text
      .trim()
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "");

    const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
    const jsonText = jsonMatch ? jsonMatch[0] : cleanedText;

    return JSON.parse(jsonText);
  };

  const handleFileSelect = (file : File | null) => {
    setFile(file)
  } 

  const handleAnalyze = async ({ companyName, jobTitle, jobDescription, file} : {companyName: string, jobTitle: string, jobDescription: string, file: File}) => {
    setIsProcessing(true)
    
    setStatusText("Uploading the file... ")
    const uploadedFile = await fs.upload([file])
    if (!uploadedFile) return setStatusText("Error: Failed to upload file");

    setStatusText("Converting to image...")
    const imageFile = await convertPdfToImage(file);
    if (!imageFile.file) return setStatusText("Error: Failed to convert PDF to image")

    setStatusText("Extracting text from PDF...")
    const resumeText = await extractPdfText(file);
    if (!resumeText) return setStatusText("Error: Failed to extract text from PDF")

    setStatusText("Uploading the image...")
    const uploadedImage = await fs.upload([imageFile.file]);
    if (!uploadedImage) return setStatusText("Error: Failed to upload image")

    setStatusText("Preparing data...");

    const uuid = generateUUID();
    const data = {
      id: uuid,
      resumePath: uploadedFile.path,
      imagePath: uploadedImage.path,
      companyName, jobTitle, jobDescription,
      feedback: "",
    }
    await kv.set(`resume:${uuid}`, JSON.stringify(data));

    setStatusText("Analyzing...")

    const feedbackPrompt = `${prepareInstructions({ jobTitle, jobDescription, AIResponseFormat })}

Resume Text:
${resumeText}

Analyze the resume text above. Do not say the resume is missing.`;

    const feedback = await ai.chat(
      feedbackPrompt,
      { model: "gemini-2.5-flash" }
    )
    if (!feedback) return setStatusText("Error: Failed to analyze resume");

    const feedbackText = typeof feedback.message.content === "string" 
      ? feedback.message.content
      : feedback.message.content[0].text;

    try {
      data.feedback = parseFeedbackJson(feedbackText);
    } catch (error) {
      console.error("Failed to parse feedback JSON", error, feedbackText);
      return setStatusText("Error: AI returned invalid JSON");
    }
    await kv.set(`resume:${uuid}`, JSON.stringify(data));
    setStatusText("Analysis complete, redirecting...")
    console.log(data)
    navigate(`/resume/${uuid}`)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest('form');
    if(!form) return
    const formData = new FormData(form);

    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;

    // check if we have access to value
    if(!file) return;
    handleAnalyze({ companyName, jobTitle, jobDescription, file})
  }

  return (
    <main className="min-h-screen">
      <div className=" text-white flex flex-col">
        <Navbar />

        <section className="main-section">
          <div className="heading-content">
            <h1>AI-powered Resume Analysis</h1>
            {isProcessing ? (
              <>
                <h2>{statusText}</h2>
                <img src="/images/pdf-scan.gif" className="w-50" />
              </>
            // if processing
            ) :  (
              <h2>Upload your resume to begin the analysis and get personalized insights into your skills, experience, and areas for improvement.</h2>
            )}
          </div>
        </section>
      </div>
      
      {/* Section outside header */}
      {!isProcessing && (
        <section className="flex justify-center py-12 px-4">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-3xl rounded-2xl border border-white/10 bg-neutral-950 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
          >
            <div className="form-div">
              <label htmlFor="company-name">Company Name</label>
              <input
                type="text"
                id="company-name"
                name="company-name"
                placeholder='Company Name'
                className="w-full rounded-lg border border-white/10 bg-neutral-900 px-4 py-3 text-white placeholder:text-neutral-500"
              />
            </div>
            <div className="form-div">
              <label htmlFor="job-title">Job Title</label>
              <input
                type="text"
                id="job-title"
                name="job-title"
                placeholder='Job Title'
                className="w-full rounded-lg border border-white/10 bg-neutral-900 px-4 py-3 text-white placeholder:text-neutral-500"
              />
            </div>
            <div className="form-div">
              <label htmlFor="job-description">Job Description</label>
              <textarea
                rows={5}
                id="job-description"
                name="job-description"
                placeholder='Job Description'
                className="w-full rounded-lg border border-white/10 bg-neutral-900 px-4 py-3 text-white placeholder:text-neutral-500"
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