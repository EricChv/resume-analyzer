import { useEffect, useState } from 'react';
import { usePuterStore } from '~/lib/puter'
import { Link, useNavigate } from 'react-router'
import ResumeCard from "~/components/ResumeCard";
import type { Route } from "./+types/home";
import Navbar from "~/components/navbar"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sheets" },
    { name: "description", content: "Upload resumes, create job listings, and use AI to instantly analyze candidate fit." },
  ];
}

export default function Home() {

  const { auth, kv } = usePuterStore();
  const navigate = useNavigate()
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false)

  // redirection if user is already logged in
  useEffect( () => {
    //redirect to next if logged in
    if(!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated]) 

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true)

      const resumes = (await kv.list("resume:*", true)) as KVItem[]

      const parsedResumes = resumes?.map((resume) => (
        JSON.parse(resume.value) as Resume
      ))

      console.log("parsedResumes", parsedResumes)
      setResumes(parsedResumes || []);
      setLoadingResumes(false)
    }
    loadResumes()
  }, [])

  return (
    <main className="min-h-screen">
      <div className="bg-[#FF5948] text-black flex flex-col">
        <Navbar />

        <section className="main-section">
          <div className="heading-content">
            <h1>Resume Analysis & Application Tracker</h1>
            {!loadingResumes && resumes?.length === 0 ? (
              <h2>No resumes yet. Upload your first resume to get started</h2>
            ): (
              <h2>AI-powered resume evaluation and application tracking to optimize, find weaknesses, and improve outcomes.</h2>
            )}
          </div>
        </section> 
      </div>


      {!loadingResumes && resumes.length > 0 && (
        <div className="resume-section">
          {resumes.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
      )}

      {!loadingResumes && resumes?.length === 0 && (
        <div className='flex flex-col items-center justify-center mt-10 gap-4'>
          <Link to="/upload" className="primary-button w-fit text-xl">
            Upload Resume
          </Link>
        </div>
      )}
    </main>
  );
}