require('dotenv').config();
import { chat } from './llm';
import { getSystemPrompt } from './prompts';

async function test() {
    console.log("Testing with real system prompt...");
    try {
        // Test with real system prompt
        // Using a short message to avoid huge context, but getting system prompt to verify it compiles/runs strings correctly
        const sysPrompt = getSystemPrompt();
        console.log("System Prompt length:", sysPrompt.length);
        const response = await chat([{ role: 'user', content: 'hello' }], sysPrompt);
        console.log("Response with real prompt success.");
    } catch (e: any) {
        console.error("Error with real prompt:", e.message);
    }

    console.log("Testing with undefined messages...");
    try {
        await chat(undefined as any, "sys prompt");
    } catch (e: any) {
        console.log("Expected error caught:", e.message);
    }
}

test();
