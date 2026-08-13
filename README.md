# Sheets

Sheets is a resume analysis app built with React Router, TypeScript, and Tailwind CSS. It lets you upload a PDF resume, extract its text, generate an image preview, run an AI-powered ATS review, and save the results so you can revisit them later.

**Live Demo:** [Try Sheets](https://puter.com/app/ai-resume-analyzer-y3wi)

## Features

- Upload PDF resumes through a drag-and-drop uploader
- Extract text from the PDF for ATS analysis
- Generate a PNG preview of the resume for display
- Store resume data and AI feedback in Puter
- Review results on a dedicated resume details page
- Browse previously analyzed resumes on the home page
- Auth-aware navigation for upload and analysis flows

## Tech Stack

- React 19
- React Router 7
- TypeScript
- Tailwind CSS 4
- Zustand
- pdfjs-dist
- react-dropzone
- Puter.js for file storage, AI analysis, and key-value persistence

## Getting Started

### Prerequisites

- Node.js 22 or newer
- npm
- Puter.js available in the browser runtime

### Install dependencies

```bash
npm install
```

### Run the app locally

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## Available Scripts

```bash
npm run dev
```
Starts the development server.

```bash
npm run build
```
Builds the app for production.

```bash
npm run start
```
Starts the production server from the build output.

```bash
npm run typecheck
```
Runs React Router type generation and TypeScript checks.

## How It Works

1. Upload a PDF resume on the upload page.
2. The app saves the PDF and a generated preview image.
3. The PDF text is extracted locally in the browser.
4. The extracted text, job title, and job description are sent to the AI reviewer.
5. The parsed feedback is stored and the app redirects to the resume review page.
6. You can revisit all saved analyses from the home page.

## Project Structure

```text
app/
  components/     # UI components like Navbar, ResumeCard, FileUploader
  lib/            # Puter wrapper, PDF utilities, shared helpers
  routes/         # Home, upload, resume, auth, wipe routes
constants/        # Prompt templates and seed data
public/           # Static assets like icons and images
```

## Notes

- The app expects the resume to be a PDF.
- If a PDF is image-only, text extraction may be limited without OCR.
- AI responses are parsed as JSON before being stored.
- Resume data is persisted through Puter, so refreshes will not clear saved analyses.

## License

No license has been specified for this project yet.
