const axios = require('axios');
require('dotenv').config();

// Enhanced UniWing System Prompt — multi-action agent
const UNIWING_SYSTEM_PROMPT = `
You are "UniWing-Assistant", the official AI helper inside the UniWing college community platform.
You are NOT limited to summarization — you are a multi-action assistant. When given user input, first DETECT the user's intent (unless explicit 'action' provided) and then perform that action. Always follow the "Rules" and "Response Modes" below.

RULES (always follow):
1. Do NOT hallucinate — if information is missing, say: "I don't have enough information to complete that. Please provide: <what's missing>".
2. Maintain a student-friendly, professional tone unless user asks for a different persona.
3. Never reveal secrets, API keys, database credentials, private environment info, or any sensitive internal configuration.
4. Do not produce illegal, unsafe, or disallowed content.
5. Prefer concise outputs for simple requests; expand only when user asks for details.
6. When asked for code or API examples, produce runnable, minimal examples and mention any assumptions.
7. Remember that this platform is for college students and student community.It server only the three major functionalities that is event management, donation drive and room vacancy.
IF the users is prompt is out of the project, provide that topics other the major core of the project which cannot be discussed here.


SUPPORTED ACTIONS (detect automatically unless user supplies 'action'):
- summarize: Produce a concise, factual summary of provided text or Editor.js JSON.
- explain: Explain a workflow or concept step-by-step (e.g., "How to post an event", "JWT auth flow", DB model design).
- brainstorm: Give multiple short suggestions/ideas (e.g., event promotion ideas).
- qa: Answer direct questions about platform features or usage.
- convert: Convert Editor.js JSON to plain text or to summary, or convert text to Editor.js compatible block JSON.

RESPONSE MODES (user may request 'outputFormat'):
- text: Natural language explanation.
- mixed: Human-readable explanation + structured JSON block.

INSTRUCTIONS FOR THE MODEL:
1. If the request is ambiguous, ask for the minimal missing info needed to proceed.
2. If the user passed an explicit "action" parameter, perform that action and ignore intent detection.
3. If the user requests structured output (json), follow this rule: respond with exactly one top-level JSON object and ensure it is parseable.
4. When producing example API responses, use realistic but fake placeholder values (e.g., "userId": "user_123") and indicate placeholders with angle brackets if needed.
5. For Editor.js inputs, detect block content and map them to human-friendly text or structured fields depending on action.
6. Limit the length: for summaries produce <= 6 bullet points + 1 short paragraph unless the user asks for longer.



EXAMPLES:
- Request: "Summarize the event description below" -> ACTION: summarize
- Request: "Show me an Express route to create an event" -> ACTION: api_example or code_snippet

ERROR HANDLING:
- If a requested action cannot be completed (missing fields, invalid JSON), respond with a short error message and list required fields.

CONFIDENTIALITY NOTE:
Treat any user-provided personal data as sensitive. Do not store or expose it beyond the immediate response.
MEMORY:
Keep the context of the conversation in mind and provide relevant information. Update your memory for every 30 minutes.
End system prompt.
`;

// System defaults for AI behavior
const SYSTEM_DEFAULTS = {
    accuracy: 'high',
    safety: 'strict',
    aiBehavior: 'professional',
    reasoningStyle: 'concise',
    restrictions: 'standard',
    persona: 'assistant'
};

// Build system prompt dynamically (user overrides)
const buildBehaviorPrompt = (options) => {
    const { accuracy, aiBehavior, reasoningStyle, persona } = options;

    let behaviorPrompt = '';

    // Persona
    if (persona === 'expert') behaviorPrompt += 'You are an expert analyst with deep knowledge. ';
    else if (persona === 'tutor') behaviorPrompt += 'You are a patient tutor who explains things clearly. ';
    else behaviorPrompt += 'You are a helpful assistant. ';

    // Behavior
    if (aiBehavior === 'casual') behaviorPrompt += 'Use a friendly and conversational tone. ';
    else if (aiBehavior === 'technical') behaviorPrompt += 'Use precise technical language. ';
    else behaviorPrompt += 'Maintain a professional tone. ';

    // Reasoning style
    if (reasoningStyle === 'detailed') behaviorPrompt += 'Provide detailed explanations. ';
    else if (reasoningStyle === 'analytical') behaviorPrompt += 'Break down concepts analytically. ';
    else behaviorPrompt += 'Be concise. ';

    // Accuracy level
    if (accuracy === 'high') behaviorPrompt += 'Ensure maximum accuracy. ';
    else if (accuracy === 'balanced') behaviorPrompt += 'Balance accuracy with clarity. ';
    else behaviorPrompt += 'Keep the explanation accurate yet simple. ';

    return behaviorPrompt;
};

// Utility to create an intent hint when action provided
const buildActionHint = (action, outputFormat) => {
    if (!action) return '';
    let hint = `User explicitly requested action: ${action}. `;
    if (outputFormat) hint += `Return outputFormat: ${outputFormat}. `;
    return hint;
};

exports.summarize = async (req, res) => {
    try {
        const {
            content,        // main user content or question (required)
            action,         // optional explicit action to perform (see SUPPORTED_ACTIONS)
            outputFormat,   // optional: text | json | code | mixed
            accuracy,
            aiBehavior,
            reasoningStyle,
            persona
        } = req.body;

        if (!content) {
            return res.status(400).json({ message: 'Content is required' });
        }

        const geminiApiKey = process.env.GEMINI_API_KEY;
        if (!geminiApiKey) {
            return res.status(500).json({ message: 'Gemini API key not configured' });
        }

        // Merge user options with system defaults
        const options = {
            accuracy: accuracy || SYSTEM_DEFAULTS.accuracy,
            aiBehavior: aiBehavior || SYSTEM_DEFAULTS.aiBehavior,
            reasoningStyle: reasoningStyle || SYSTEM_DEFAULTS.reasoningStyle,
            persona: persona || SYSTEM_DEFAULTS.persona
        };

        console.log("Mapped Options:", options);

        // Build dynamic behavior prompt
        const behaviorPrompt = buildBehaviorPrompt(options);

        // Action hint (if user explicitly provided action/outputFormat)
        const actionHint = buildActionHint(action, outputFormat);

        // Compose final prompt
        // We instruct the model to detect intent unless 'action' is explicitly provided.
        const fullPrompt = `
${UNIWING_SYSTEM_PROMPT}

${behaviorPrompt}
${actionHint}

User content / request:
---
${content}
---

Respond according to the system rules. If you perform structured output, ensure valid JSON (no extra commentary) when outputFormat=json. If you perform code, wrap it in proper code fences and include short comments about assumptions.
`;

        console.log("Sending request to Gemini...");

        // Call Gemini API
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`,
            {
                contents: [
                    {
                        parts: [
                            { text: fullPrompt }
                        ]
                    }
                ],
                // You may optionally set model parameters here (temperature, maxOutputTokens, etc.)
                // e.g., temperature: 0.2 for deterministic behavior
            },
            {
                headers: { "Content-Type": "application/json" }
            }
        );

        const candidateText = response.data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!candidateText) {
            return res.status(500).json({
                message: "No response returned from Gemini",
                details: response.data
            });
        }

        // Return the plain text result directly
        res.status(200).send(candidateText);

    } catch (error) {
        console.error("❌ Gemini Error:", error.response?.data || error.message);

        res.status(500).json({
            message: "Failed to generate response",
            details: error.response?.data || error.message
        });
    }
};
