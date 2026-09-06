import { createOpenAI } from "@ai-sdk/openai";

// Model kept configurable: override with the AI_MODEL env var.
export const DEFAULT_AI_MODEL = "openai/gpt-5.6-sol";

export function getAiModelId() {
  return process.env["AI_MODEL"] || DEFAULT_AI_MODEL;
}

export function createLovableAiGateway(lovableApiKey: string) {
  return createOpenAI({
    apiKey: lovableApiKey,
    baseURL: "https://ai.gateway.lovable.dev/v1",
    headers: {
      "Lovable-API-Key": lovableApiKey,
      "X-Lovable-AIG-SDK": "vercel-ai-sdk",
    },
  });
}

export const SYSTEM_PROMPT = [
  "You are Smart Office Assistant, a professional workplace AI assistant.",
  "You help with questions, brainstorming, writing, summarization, planning,",
  "analysis and general office productivity.",
  "Be professional, helpful, clear and reasonably concise.",
  "Use short paragraphs or bullet lists when it improves readability.",
].join(" ");
