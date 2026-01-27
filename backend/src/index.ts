require("dotenv").config();
import express from "express";
import { BASE_PROMPT, getSystemPrompt } from "./prompts";
import { basePrompt as nodeBasePrompt } from "./defaults/node";
import { basePrompt as reactBasePrompt } from "./defaults/react";
import cors from "cors";
import { clerkAuth, protectedRoute } from "./authMiddleware";
import projectsRoutes from "./projectsRoutes";
import { getTemplateType, chat, getModelConfig } from "./llm";

const app = express();
app.use(cors());
app.use(express.json());

// Apply Clerk middleware globally
app.use(clerkAuth);

// Health check endpoint (public)
app.get("/health", (req, res) => {
    const models = getModelConfig();
    res.json({
        status: "ok",
        llm: {
            provider: "openai",
            models: models,
        }
    });
});

// Protected routes
app.post("/template", ...protectedRoute, async (req, res) => {
    try {
        const prompt = req.body.prompt;

        const templateType = await getTemplateType(prompt);

        if (templateType === "react") {
            res.json({
                prompts: [BASE_PROMPT, `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
                uiPrompts: [reactBasePrompt]
            });
            return;
        }

        if (templateType === "node") {
            res.json({
                prompts: [`Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
                uiPrompts: [nodeBasePrompt]
            });
            return;
        }

        res.status(403).json({ message: "You cant access this" });
    } catch (error) {
        console.error("Template error:", error);
        res.status(500).json({ message: "Failed to determine template type" });
    }
});

app.post("/chat", ...protectedRoute, async (req, res) => {
    try {
        const messages = req.body.messages;

        const response = await chat(messages, getSystemPrompt());

        console.log("Chat response received");

        res.json({
            response: response
        });
    } catch (error: any) {
        console.error("Chat error details:", {
            message: error.message,
            stack: error.stack,
            response: error.response?.data
        });
        res.status(500).json({
            message: "Failed to generate response",
            details: error.message
        });
    }
});

// Projects API routes (protected)
app.use("/api/projects", ...protectedRoute, projectsRoutes);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
    console.log("LLM Provider: OpenAI");
    console.log("Models:", getModelConfig());
});

