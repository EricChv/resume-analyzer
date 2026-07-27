import { useEffect } from 'react';
import { usePuterStore } from '~/lib/puter'
import { useNavigate } from 'react-router'
import ResumeCard from "~/components/ResumeCard";
import { resumes } from "../../constants";
import type { Route } from "./+types/home";
import Navbar from "~/components/navbar"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sheets" },
    { name: "description", content: "Upload resumes, create job listings, and use AI to instantly analyze candidate fit." },
  ];
}

export default function Home() {

  const { auth } = usePuterStore();
  const navigate = useNavigate()


  // redirection if user is already logged in
  useEffect( () => {
    //redirect to next if logged in
    if(!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated]) 

  return (
    <main className="min-h-screen">
      <div className="bg-[#FF5948] text-black flex flex-col">
        <Navbar />

        <section className="main-section">
          <div className="heading-content">
            <h1>Resume Analysis & Application Tracker</h1>
            <h2>
              AI-powered resume evaluation and application tracking to optimize, find weaknesses, and improve outcomes.
            </h2>
          </div>
        </section>
      </div>
          {resumes.length > 0 && (
            <div className="resume-section">
              {resumes.map((resume) => (
                <ResumeCard key={resume.id} resume={resume} />
              ))}
            </div>
          )}

    </main>
  );
}