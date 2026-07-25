import { AgentConfig } from "@/types/agents";
import { sdrAgentConfig } from "./sdr";
import { supportAgentConfig } from "./support";
import { recruitingAgentConfig } from "./recruiting";
import { executiveAssistantAgentConfig } from "./executiveAssistant";
import { financialAnalystAgentConfig } from "./financialAnalyst";
import { operationsAgentConfig } from "./operations";
import { proposalGeneratorAgentConfig } from "./proposalGenerator";
import { marketingAgentConfig } from "./marketing";
import { researchAgentConfig } from "./research";
import { dataAnalystAgentConfig } from "./dataAnalyst";

export const AGENTS_LIST: AgentConfig[] = [
  sdrAgentConfig,
  supportAgentConfig,
  recruitingAgentConfig,
  executiveAssistantAgentConfig,
  financialAnalystAgentConfig,
  operationsAgentConfig,
  proposalGeneratorAgentConfig,
  marketingAgentConfig,
  researchAgentConfig,
  dataAnalystAgentConfig,
];

export function getAgentBySlug(slug: string): AgentConfig | undefined {
  return AGENTS_LIST.find((agent) => agent.slug === slug);
}
