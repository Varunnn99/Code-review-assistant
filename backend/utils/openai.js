const OpenAI = require('openai');
require('dotenv').config();

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function analyzeCode(codeContent) {
  const system = 'You are a senior code reviewer. Provide a concise, actionable review focused on readability, modularity, potential bugs, and improvement suggestions.';
  const user = `Review this code and provide improvements. Code:\n\n${codeContent}`;

  // Use Responses API for consistency with current SDK
  const response = await client.responses.create({
    model: 'gpt-4o-mini',
    input: [
      { role: 'system', content: system },
      { role: 'user', content: user }
    ]
  });

  const text = response.output_text || response?.output?.[0]?.content?.[0]?.text || 'No review generated.';
  return text;
}

module.exports = { analyzeCode };


