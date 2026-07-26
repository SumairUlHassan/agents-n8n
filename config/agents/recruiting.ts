import { AgentConfig } from "@/types/agents";

export const recruitingAgentConfig: AgentConfig = {
  slug: "recruiting",
  title: "AI Recruiting Agent",
  subtitle: "Screens candidates, scores resumes, conducts initial qualification, and schedules interviews.",
  statusText: "Live — connected to recruitment pipeline",
  inputType: "hybrid",
  placeholder: "Upload candidate resume or enter candidate summary...",
  submitLabel: "Evaluate Candidate",
  examplePrompts: [
    "Screen this AI engineer",
    "Compare three candidates",
    "Generate screening questions",
    "Schedule an interview",
  ],
  fields: [
    { id: "jobTitle", label: "Target Job Title", type: "text", placeholder: "e.g. Senior AI Systems Engineer", defaultValue: "Senior AI Systems Engineer" },
    { id: "jobDescription", label: "Job Description", type: "textarea", placeholder: "Enter core responsibilities...", defaultValue: "Looking for an engineer experienced in Next.js, Python, LangChain, vector DBs, and LLM fine-tuning." },
    { id: "requiredSkills", label: "Required Skills", type: "text", placeholder: "React, TypeScript, Python, LLMs, PyTorch", defaultValue: "TypeScript, Python, PyTorch, Next.js, LLM Agents" },
    { id: "minimumExperience", label: "Min Experience (Years)", type: "select", options: ["1+ years", "3+ years", "5+ years", "8+ years"], defaultValue: "5+ years" },
    { id: "resumeUpload", label: "Resume File", type: "file" },
    { id: "candidateNotes", label: "Candidate Notes", type: "text", placeholder: "Strong background in distributed systems", defaultValue: "Referred by CTO, candidate has 6 years experience at AI scaleups" },
  ],
  supportedFiles: ["PDF", "DOCX", "TXT"],
  workflowDescription: "Automated 19-node recruitment pipeline parsing resumes, assessing experience, safety bias checking, scoring candidate fit, generating interview prompts, and scheduling ATS interviews.",
  trustStatement: "Every candidate is evaluated against role-specific criteria with transparent scoring and recruiter review points.",
  metricsLabels: ["Skills Matched", "Candidate Score", "Experience Match", "Recommendation"],
  workflowNodes: [
    { id: "n1", label: "Candidate Submission", type: "trigger", kind: "trigger", description: "Receives resume upload and job requisition details", modelOrTool: "Form / File Upload", position: { x: 50, y: 150 }, targetIds: ["n2"] },
    { id: "n2", label: "Resume Parser", type: "action", kind: "code", description: "Parses PDF/DOCX into clean structured JSON", modelOrTool: "pdf-parse / Unstructured", position: { x: 220, y: 150 }, targetIds: ["n3"] },
    { id: "n3", label: "Contact Extraction", type: "action", kind: "code", description: "Extracts contact information, email, phone, and LinkedIn", modelOrTool: "Regex / NLP Parser", position: { x: 390, y: 150 }, targetIds: ["n4"] },
    { id: "n4", label: "Loop Over Work History", type: "agent", kind: "code", description: "Extracts technical & soft skills from work history items", modelOrTool: "LLM Extractor", position: { x: 560, y: 150 }, targetIds: ["n5"], targetLabels: { "n5": "experience item" } },
    { id: "n5", label: "Experience Analysis", type: "agent", kind: "code", description: "Quantifies relevant years of experience and domain tenure", modelOrTool: "Tenure Analyzer AI", position: { x: 730, y: 150 }, targetIds: ["n6"] },
    { id: "n6", label: "Job Requirement Parser", type: "action", kind: "code", description: "Breaks job description into mandatory vs nice-to-have criteria", modelOrTool: "Req Parser", position: { x: 900, y: 150 }, targetIds: ["n7"] },
    { id: "n7", label: "Candidate Matching", type: "agent", kind: "code", description: "Compares parsed candidate profile against job requirements", modelOrTool: "Embedding Matcher", position: { x: 1070, y: 150 }, targetIds: ["n8"] },
    { id: "n8", label: "Bias-Safety Check", type: "action", kind: "code", description: "Removes PII & ensures compliance with EEO guidelines", modelOrTool: "De-bias Guardrail", position: { x: 1240, y: 150 }, targetIds: ["n9"] },
    { id: "n9", label: "Candidate Score", type: "agent", kind: "code", description: "Calculates overall candidate suitability score (0-100)", modelOrTool: "Scoring Matrix", position: { x: 1410, y: 150 }, targetIds: ["n10"] },
    { id: "n10", label: "Switch: Score Router", type: "decision", kind: "if", description: "Branches: Strong Match (>= 80) vs Manual Review vs Reject", modelOrTool: "Switch Router", position: { x: 1580, y: 150 }, targetIds: ["n11"], targetLabels: { "n11": "match >= 80" } },
    { id: "n11", label: "Generate Screening Questions", type: "agent", kind: "code", description: "Generates 5 role-specific interview questions based on resume gaps", modelOrTool: "Gemini 1.5 Pro", position: { x: 1750, y: 150 }, targetIds: ["n12"] },
    { id: "n12", label: "Candidate Outreach", type: "action", kind: "http", description: "Sends candidate email invite for preliminary screening", modelOrTool: "Email Sender", position: { x: 1920, y: 150 }, targetIds: ["n13"] },
    { id: "n13", label: "Screening Response Analysis", type: "agent", kind: "code", description: "Analyzes screening response for availability & expectations", modelOrTool: "Response Analyzer", position: { x: 2090, y: 150 }, targetIds: ["n14"] },
    { id: "n14", label: "IF: Eligible for Interview?", type: "decision", kind: "if", description: "Verifies scheduling criteria before calendar lookup", modelOrTool: "Eligibility Gate", position: { x: 2260, y: 150 }, targetIds: ["n15"], targetLabels: { "n15": "eligible" } },
    { id: "n15", label: "Calendar Check", type: "action", kind: "http", description: "Finds engineering hiring manager calendar openings", modelOrTool: "Google Calendar API", position: { x: 2430, y: 150 }, targetIds: ["n16"] },
    { id: "n16", label: "Schedule Interview", type: "action", kind: "http", description: "Books 45-min technical interview & sends calendar invite", modelOrTool: "Cal.com API", position: { x: 2600, y: 150 }, targetIds: ["n17"] },
    { id: "n17", label: "ATS Update", type: "action", kind: "http", description: "Updates candidate stage to 'Technical Screen Scheduled'", modelOrTool: "Greenhouse / Lever ATS", position: { x: 2770, y: 150 }, targetIds: ["n18"] },
    { id: "n18", label: "Recruiter Notification", type: "action", kind: "http", description: "Sends evaluation summary to recruiter via Slack", modelOrTool: "Slack Webhook", position: { x: 2940, y: 150 }, targetIds: ["n19"] },
    { id: "n19", label: "Audit Log", type: "output", kind: "trigger", description: "Logs full evaluation scorecard to immutable record", modelOrTool: "Audit Store", position: { x: 3110, y: 150 }, targetIds: [] },
  ],
  demoScenarios: [
    {
      id: "recruiting-screen-ai-eng",
      triggerPrompt: "Screen this AI engineer",
      scenarioName: "AI Engineer Resume Screening & Interview Booking",
      outputPayload: {
        candidateSummary: "David Chen — Senior AI Engineer with 6.5 years experience in LLM pipelines, PyTorch, and Next.js.",
        skillsMatch: "Matched 14/15 required skills (TypeScript, Python, PyTorch, Next.js, Vector DBs, LangChain, RAG Architecture)",
        missingRequirements: "Minor gap: Limited production C++ experience (Nice-to-have)",
        experienceAssessment: "Exceeds 5-year requirement with proven track record scaling agentic workflows.",
        candidateScore: "92/100 (Strong Match)",
        recommendedQuestions: [
          "1. Describe how you optimized vector search latency in your previous RAG pipeline.",
          "2. How do you handle non-deterministic LLM output formatting in production?",
          "3. Tell us about a time you resolved a memory bottleneck in PyTorch multi-GPU training.",
        ],
        interviewRecommendation: "Strong Advance — Fast-track to 45-min Technical Interview",
        schedulingResult: "Interview booked for Friday at 10:00 AM PST with Engineering Manager",
      },
      metrics: [
        { label: "Skills Matched", value: "14/15" },
        { label: "Candidate Score", value: "92/100" },
        { label: "Experience Match", value: "6.5 Yrs" },
        { label: "Recommendation", value: "Fast Track" },
      ],
      executedNodeIds: ["n1", "n2", "n3", "n4", "n5", "n6", "n7", "n8", "n9", "n10", "n11", "n12", "n13", "n14", "n15", "n16", "n17", "n18", "n19"],
      logs: [
        { nodeId: "n1", nodeName: "Candidate Submission", event: "Received candidate resume: David_Chen_Resume.pdf", status: "success", durationMs: 90 },
        { nodeId: "n2", nodeName: "Resume Parser", event: "Extracted 4 pages of work history and education", status: "success", durationMs: 420 },
        { nodeId: "n4", nodeName: "Skills Extraction", event: "Identified 14 core technical skills matching req", status: "success", durationMs: 380 },
        { nodeId: "n9", nodeName: "Candidate Score", event: "Overall Score computed: 92/100 (Strong Match)", status: "success", durationMs: 290 },
        { nodeId: "n11", nodeName: "Generate Screening Questions", event: "Generated 3 targeted technical questions", status: "success", durationMs: 410 },
        { nodeId: "n16", nodeName: "Schedule Interview", event: "Calendar event created on Google Calendar API", status: "success", durationMs: 350 },
        { nodeId: "n17", nodeName: "ATS Update", event: "Greenhouse ATS updated to 'Interview Scheduled'", status: "success", durationMs: 180 },
      ],
      generatedArtifact: {
        type: "candidate",
        title: "Candidate Evaluation Report — David Chen",
        content: `CANDIDATE EVALUATION SCORECARD
Candidate: David Chen
Position: Senior AI Systems Engineer
Overall Fit Score: 92/100 (Strong Match)

EXECUTIVE SUMMARY:
David has 6.5 years of hands-on experience building multi-agent AI platforms, RAG pipelines, and full-stack web apps using Next.js and PyTorch.

SKILLS MATCH ANALYSIS:
✓ Python & TypeScript (Expert)
✓ PyTorch / HuggingFace (Advanced)
✓ Next.js & React Flow (Advanced)
✓ Vector Databases (Pinecone / Qdrant)
✗ Production C++ (Basic / Learning)

RECOMMENDED SCREENING QUESTIONS:
1. Describe how you optimized vector search latency in your previous RAG pipeline.
2. How do you handle non-deterministic LLM output formatting in production?
3. Tell us about a time you resolved a memory bottleneck in PyTorch.

ACTION TAKEN:
Interview booked for Friday at 10:00 AM PST. ATS updated.`,
        downloadableFormat: "txt",
      },
    },
  ],
};
