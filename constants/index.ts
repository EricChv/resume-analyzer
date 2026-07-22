// interface created within /types

export const resumes: Resume[] = [
  {
    id: "1",
    companyName: "Amazon",
    jobTitle: "DevOps Engineer",
    imagePath: "/images/resumes/imagePath/1.png",
    resumePath: "/resumes/resumes/resumePath/1.pdf",
    feedback: {
      overallScore: 85,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "2",
    companyName: "Salesforce",
    jobTitle: "Backend Developer",
    imagePath: "/images/resumes/imagePath/2.png",
    resumePath: "/resumes/resumes/resumePath/2.pdf",
    feedback: {
      overallScore: 55,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "3",
    companyName: "Cisco",
    jobTitle: "Network Engineer",
    imagePath: "/images/resumes/imagePath/3.png",
    resumePath: "/resumes/resumes/resumePath/3.pdf",
    feedback: {
      overallScore: 75,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "4",
    companyName: "Microsoft",
    jobTitle: "Data Analyst",
    imagePath: "/images/resumes/imagePath/4.png",
    resumePath: "/resumes/resumes/resumePath/4.pdf",
    feedback: {
      overallScore: 75,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
]

export const AIResponseFormat = `
Return ONLY valid JSON in this exact structure:

{
  "overallScore": 0,
  "ATS": {
    "score": 0,
    "tips": [
      {
        "type": "good | improve",
        "tip": "Short title"
        "explanation": "detailed explanation"
      }
    ]
  },
  "toneAndStyle": {
    "score": 0,
    "tips": [
      {
        "type": "good | improve",
        "tip": "short title",
        "explanation": "detailed explanation"
      }
    ]
  },
  "content": { ...same shape... },
  "structure": { ...same shape... },
  "skills": { ...same shape... }
}
`;

export const prepareInstructions = ({
  jobTitle,
  jobDescription,
  AIResponseFormat,
}: {
  jobTitle: string;
  jobDescription: string;
  AIResponseFormat: string;
}) =>
  `
You are an expert ATS resume reviewer.

Analyze the resume against the target role and return structured feedback.

Be honest and critical. Low scores are acceptable and expected if the resume is weak.

Use the job title and job description to evaluate relevance, ATS compatibility, skills alignment, and clarity.

Job Title:
${jobTitle}

Job Description:
${jobDescription}

Return ONLY valid JSON following this exact format:
${AIResponseFormat}

Rules:
- No markdown
- No backticks
- No extra commentary
- Output must be valid JSON
`;