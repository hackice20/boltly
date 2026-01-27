import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

// Message type for chat
export interface Message {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

/**
 * Fast model for template type detection (React vs Node)
 * Uses a lightweight model for quick responses
 */
export async function getTemplateType(prompt: string): Promise<'react' | 'node'> {
    const systemPrompt = "Return either node or react based on what do you think this project should be. Only return a single word either 'node' or 'react'. Do not return anything extra";

    try {
        const completion = await openai.chat.completions.create({
            model: process.env.LLM_MODEL_FAST || 'gpt-5-mini',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: prompt },
            ],
            max_completion_tokens: 200,
        });

        const content = completion.choices[0]?.message?.content;
        console.log("Template detection response:", content);

        if (!content) {
            console.log("No content received for template detection, defaulting to react");
            return 'react';
        }

        const answer = content.toLowerCase().trim();

        if (answer.includes('node')) {
            return 'node';
        }

        return 'react';
    } catch (error) {
        console.error("Template detection error:", error);
        return 'react';
    }
}

/**
 * Main model for code generation and chat
 * Uses a more capable model for complex tasks
 */
export async function chat(messages: Message[], systemPrompt: string): Promise<string> {
    // Convert messages to OpenAI format
    const formattedMessages: OpenAI.Chat.ChatCompletionMessageParam[] = [
        { role: 'system', content: systemPrompt },
        ...messages.map(msg => ({
            role: msg.role as 'user' | 'assistant' | 'system',
            content: msg.content,
        })),
    ];

    console.log("Sending chat request to OpenAI...");
    console.log("Number of messages:", formattedMessages.length);

    try {
        const completion = await openai.chat.completions.create({
            model: process.env.LLM_MODEL_MAIN || 'gpt-5.2',
            messages: formattedMessages,
            max_completion_tokens: 32000,
        });

        const content = completion.choices[0]?.message?.content;

        console.log("OpenAI response received");
        console.log("Content length:", content?.length || 0);
        console.log("Finish reason:", completion.choices[0]?.finish_reason);

        if (!content) {
            console.error("No content in OpenAI response!");
            console.error("Full response:", JSON.stringify(completion, null, 2));
            return '';
        }

        // Log first 500 chars for debugging
        console.log("Content preview:", content.substring(0, 500));

        return content;
    } catch (error: any) {
        console.error("OpenAI chat error:", error.message);
        throw error;
    }
}

/**
 * Get the current model configuration
 */
export function getModelConfig() {
    return {
        fast: process.env.LLM_MODEL_FAST || 'gpt-5-mini',
        main: process.env.LLM_MODEL_MAIN || 'gpt-5.2',
    };
}


