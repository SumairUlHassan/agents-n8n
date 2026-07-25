import { supportAgentConfig } from "@/config/agents/support";
import { AgentDemoLayout } from "@/components/agents/AgentDemoLayout";

export const metadata = {
  title: "RAG Chat Demo | Omnichannel Customer Support Agent",
  description: "Interactive RAG Chat Demo with visual workflow automation pipeline.",
};

export default function RagChatDemoPage() {
  return <AgentDemoLayout agent={supportAgentConfig} />;
}
