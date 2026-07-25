"use client";

import { useState } from "react";
import { AgentConfig } from "@/types/agents";
import { Send, Upload, FileText, CheckCircle2, RefreshCw, Layers } from "lucide-react";

interface AgentInputPanelProps {
  agent: AgentConfig;
  onSubmit: (prompt: string, formValues?: Record<string, string>) => void;
  isRunning: boolean;
  onReset: () => void;
  selectedPrompt?: string;
}

export function AgentInputPanel({
  agent,
  onSubmit,
  isRunning,
  onReset,
  selectedPrompt,
}: AgentInputPanelProps) {
  const [chatInput, setChatInput] = useState(selectedPrompt || "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileAttached, setFileAttached] = useState(false);

  // Initialize form state
  const initialFormValues: Record<string, string> = {};
  agent.fields?.forEach((f) => {
    initialFormValues[f.id] = f.defaultValue || "";
  });
  const [formValues, setFormValues] = useState<Record<string, string>>(initialFormValues);

  const handleFormChange = (fieldId: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleUseSampleFile = () => {
    setFileAttached(true);
    const mockFileName =
      agent.slug === "recruiting"
        ? "David_Chen_Senior_AI_Engineer_Resume.pdf"
        : agent.slug === "financial-analyst"
        ? "Q3_2026_Financial_Transactions_Audit.csv"
        : agent.slug === "data-analyst"
        ? "Q3_Customer_Sales_Analytics_Dataset.csv"
        : "Sample_Business_Document.pdf";

    setSelectedFile({
      name: mockFileName,
      size: 245000,
      type: "application/pdf",
    } as File);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRunning) return;

    const queryText =
      chatInput.trim() ||
      selectedPrompt ||
      agent.examplePrompts[0] ||
      "Run automated scenario";

    onSubmit(queryText, formValues);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0F172A]/90 p-5 sm:p-6 shadow-xl backdrop-blur-md space-y-5">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center space-x-2">
          <Layers className="h-4 w-4 text-indigo-400" />
          <h2 className="text-sm font-semibold text-white tracking-wide uppercase">
            Interaction Control Panel
          </h2>
        </div>
        <button
          onClick={onReset}
          disabled={isRunning}
          className="flex items-center space-x-1 text-xs text-slate-400 hover:text-white transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isRunning ? "animate-spin" : ""}`} />
          <span>Reset Demo</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Render Form Fields if inputType is form or hybrid */}
        {(agent.inputType === "form" || agent.inputType === "hybrid") && agent.fields && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {agent.fields.map((field) => (
              <div key={field.id} className={field.type === "textarea" ? "sm:col-span-2" : ""}>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {field.label}
                  {field.required && <span className="text-rose-400 ml-1">*</span>}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    rows={3}
                    value={formValues[field.id] || ""}
                    onChange={(e) => handleFormChange(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    disabled={isRunning}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900/90 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all disabled:opacity-50"
                  />
                ) : field.type === "select" ? (
                  <select
                    value={formValues[field.id] || ""}
                    onChange={(e) => handleFormChange(field.id, e.target.value)}
                    disabled={isRunning}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900/90 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all disabled:opacity-50"
                  >
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : field.type === "file" ? (
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={handleUseSampleFile}
                      disabled={isRunning}
                      className="rounded-lg border border-indigo-500/40 bg-indigo-950/40 px-3 py-2 text-xs font-medium text-indigo-300 hover:bg-indigo-900/50 transition-all"
                    >
                      Attach Sample File
                    </button>
                    {selectedFile && (
                      <span className="text-xs text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        {selectedFile.name}
                      </span>
                    )}
                  </div>
                ) : (
                  <input
                    type={field.type === "url" ? "url" : "text"}
                    value={formValues[field.id] || ""}
                    onChange={(e) => handleFormChange(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    disabled={isRunning}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900/90 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all disabled:opacity-50"
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* File Drag & Drop Upload Zone if inputType is upload */}
        {agent.inputType === "upload" && (
          <div className="space-y-3">
            <div className="rounded-xl border-2 border-dashed border-slate-700 bg-slate-900/60 p-6 text-center hover:border-indigo-500/50 transition-colors">
              <Upload className="mx-auto h-8 w-8 text-indigo-400 mb-2" />
              <p className="text-xs text-slate-300 font-medium">
                Drag and drop your file here, or click to browse
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                Supported formats: {agent.supportedFiles?.join(", ") || "CSV, XLSX, PDF"} (Max 25MB)
              </p>

              <div className="mt-4 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleUseSampleFile}
                  disabled={isRunning}
                  className="inline-flex items-center space-x-1.5 rounded-lg border border-emerald-500/40 bg-emerald-950/40 px-3 py-1.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-900/50 transition-all"
                >
                  <FileText className="h-3.5 w-3.5" />
                  <span>
                    Use Sample {agent.slug === "recruiting" ? "Resume" : "Dataset"}
                  </span>
                </button>
              </div>
            </div>

            {selectedFile && (
              <div className="flex items-center justify-between rounded-lg border border-emerald-500/30 bg-emerald-950/20 px-3 py-2 text-xs text-emerald-300">
                <span className="flex items-center space-x-2 truncate">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span className="font-mono truncate">{selectedFile.name}</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {(selectedFile.size / 1024).toFixed(1)} KB
                </span>
              </div>
            )}
          </div>
        )}

        {/* Natural Language Prompt / Chat Field */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder={agent.placeholder || "Enter execution instructions..."}
            disabled={isRunning}
            className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all disabled:opacity-50"
          />

          <button
            type="submit"
            disabled={isRunning}
            className="inline-flex items-center justify-center space-x-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
          >
            {isRunning ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin text-white" />
                <span>Running Workflow...</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>{agent.submitLabel}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
