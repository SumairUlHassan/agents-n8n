"use client";

import { useState } from "react";
import { Download, Copy, Check, Sparkles } from "lucide-react";

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
    <div className="rounded-2xl border border-[#dde3ea] bg-white p-5 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#dde3ea] pb-3">
        <div className="flex items-center space-x-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[rgba(31,122,224,0.1)] text-[#1f7ae0] border border-[rgba(31,122,224,0.3)]">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#1a2530]">{artifact.title}</h3>
            <span className="text-[10px] font-mono text-[#1f7ae0]">Generated Business Artifact</span>
          </div>
        </div>

        {/* Export Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center space-x-1 rounded-lg border border-[#dde3ea] bg-white px-3 py-1.5 text-xs text-[#1a2530] hover:border-[#1f7ae0] transition-colors"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-[#12946a]" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? "Copied!" : "Copy"}</span>
          </button>

          <button
            onClick={handleDownload}
            className="inline-flex items-center space-x-1.5 rounded-lg border border-[rgba(31,122,224,0.3)] bg-[rgba(31,122,224,0.1)] px-3 py-1.5 text-xs font-semibold text-[#1f7ae0] hover:bg-[rgba(31,122,224,0.2)] transition-colors shadow-sm"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download {artifact.downloadableFormat?.toUpperCase() || "DOC"}</span>
          </button>
        </div>
      </div>

      {/* Artifact Document Content */}
      <div className="rounded-xl border border-[#dde3ea] bg-[#f4f6f9] p-4 text-xs font-mono text-[#1a2530] leading-relaxed max-h-72 overflow-y-auto whitespace-pre-wrap">
        {artifact.content}
      </div>
    </div>
  );
}
