// types/openrouter.ts

/**
 * OpenRouter API request message format
 */
export interface OpenRouterMessage {
  role: 'user' | 'assistant' | 'system';
  content: string | ContentPart[];
}

/**
 * Content part for multimodal messages
 */
export interface ContentPart {
  type: 'text' | 'image_url';
  text?: string;
  image_url?: {
    url: string;
  };
}

/**
 * OpenRouter API request
 */
export interface OpenRouterRequest {
  model: string;
  messages: OpenRouterMessage[];
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}

/**
 * OpenRouter API response
 */
export interface OpenRouterResponse {
  id: string;
  model: string;
  object: string;
  created: number;
  choices: OpenRouterChoice[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

/**
 * OpenRouter API response choice
 */
export interface OpenRouterChoice {
  index: number;
  message: {
    role: string;
    content: string;
  };
  finish_reason: string;
}

/**
 * OpenRouter API error
 */
export interface OpenRouterError {
  error: {
    message: string;
    type: string;
    param?: string;
    code?: string;
  };
}