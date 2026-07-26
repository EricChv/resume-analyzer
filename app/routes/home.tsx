import ResumeCard from "~/components/ResumeCard";
import { resumes } from "../../constants";
import type { Route } from "./+types/home";
import Navbar from "~/components/navbar";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sheets" },
    { name: "description", content: "Upload resumes, create job listings, and use AI to instantly analyze candidate fit." },
  ];
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="bg-[#FF5948] text-black flex flex-col">
        <Navbar />

        <section className=" bg-[#FE5D4C]flex items-center justify-center px-6 py-6 md:py-12 ">
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