const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function analyzeCode(codeContent) {
  // Use the latest available model
  const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });
  const prompt = `Review this code for readability, modularity, and potential bugs, then provide improvement suggestions. Code:\n\n${codeContent}`;
  
  const result = await model.generateContent(prompt);
  return result.response.text();
}

module.exports = { analyzeCode };