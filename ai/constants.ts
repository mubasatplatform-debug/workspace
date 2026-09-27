import { type GatewayModelId } from '@ai-sdk/gateway'

export enum Models {
  AnthropicClaudeOpus5 = 'anthropic/claude-opus-5',
  AnthropicClaudeSonnet5 = 'anthropic/claude-sonnet-5',
  OpenAIGPT53Codex = 'openai/gpt-5.3-codex',
  XaiGrok41Reasoning = 'xai/grok-4.1-fast-reasoning',
}

export const DEFAULT_MODEL = Models.AnthropicClaudeOpus5

export const SUPPORTED_MODELS: GatewayModelId[] = [
  Models.AnthropicClaudeOpus5,
  Models.AnthropicClaudeSonnet5,
  Models.OpenAIGPT53Codex,
  Models.XaiGrok41Reasoning,
]

export const MODEL_NAMES: Record<string, string> = {
  [Models.AnthropicClaudeOpus5]: 'Claude Opus 5',
  [Models.AnthropicClaudeSonnet5]: 'Claude Sonnet 5',
  [Models.OpenAIGPT53Codex]: 'GPT-5.3 Codex',
  [Models.XaiGrok41Reasoning]: 'Grok 4.1 Reasoning',
}

export const TEST_PROMPTS = [
  'صفحة هبوط لمتجر عبايات فيها المنتجات بالأسعار بالريال وزر طلب عبر واتساب',
  'صفحة حجز مواعيد لصالون فيها الخدمات والأسعار ونموذج حجز',
  'قائمة طعام رقمية لمطعم مع تصنيفات وصور وأسعار شاملة الضريبة',
]
