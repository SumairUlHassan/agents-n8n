import { getAgentBySlug, AGENTS_LIST } from "@/config/agents";
import { AgentDemoLayout } from "@/components/agents/AgentDemoLayout";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return AGENTS_LIST.map((agent) => ({
    slug: agent.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const agent = getAgentBySlug(slug);

  if (!agent) {
    return {
      title: "Agent Not Found | Elixr Co.",
    };
  }

  return {
    title: `${agent.title} Demo | Elixr Co.`,
    description: agent.subtitle,
  };
}

export default async function AgentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const agent = getAgentBySlug(slug);

  if (!agent) {
    notFound();
  }

  return <AgentDemoLayout agent={agent} />;
}
