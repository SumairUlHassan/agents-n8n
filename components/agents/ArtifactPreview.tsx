"use client";

import { useState } from "react";
import { Download, Copy, Check, FileText, Sparkles } from "lucide-react";

interface ArtifactPreviewProps {
  artifact?: {
    type: string;
    title: string;
    content: string;
    downloadableFormat?: string;
  };
}

export function ArtifactPreview({ artifact }: ArtifactPreviewProps) {
  const [copied, setCopied] = useState(false);

  if (!artifact) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(artifact.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const format = artifact.downloadableFormat || "txt";
    const blob = new Blob([artifact.content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${artifact.title.toLowerCase().replace(/[^a-z0-9]/g, "_")}.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-2xl border border-indigo-500/30 bg-[#0F172A] p-5 shadow-2xl space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">{artifact.title}</h3>
            <span className="text-[10px] font-mono text-indigo-400">Generated Business Artifact</span>
          </div>
        </div>

        {/* Export Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center space-x-1 rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs text-slate-300 hover:border-slate-600 hover:text-white transition-colors"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? "Copied!" : "Copy"}</span>
          </button>

          <button
            onClick={handleDownload}
            className="inline-flex items-center space-x-1.5 rounded-lg border border-indigo-500/40 bg-indigo-600/30 px-3 py-1.5 text-xs font-semibold text-indigo-300 hover:bg-indigo-600/50 transition-colors shadow-sm"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download {artifact.downloadableFormat?.toUpperCase() || "DOC"}</span>
          </button>
        </div>
      </div>

      {/* Artifact Document Content */}
      <div className="rounded-xl border border-slate-800 bg-[#090D16] p-4 text-xs font-mono text-slate-300 leading-relaxed max-h-72 overflow-y-auto whitespace-pre-wrap">
        {artifact.content}
      </div>
    </div>
  );
}
