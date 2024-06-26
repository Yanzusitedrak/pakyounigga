const axios = require('axios');

const GPT_API_URL = 'https://deku-rest-api.replit.app/gpt4';
const PREFIXES = ['ai','Ai','ask','zep'￼,'gpt'];
const horizontalLine = "━━━━━━━━━━━━━━━";

module.exports = {
  config: {
    name: "ai",
    version: 1.0,
    author: "OtinXSandip",
    longDescription: "AI",
    category: "ai",
    guide: {
      en: "{p} questions",
    },
  },
  onStart: async function () {
    // Initialization logic if needed
  },
  onChat: async function ({ api, event, args, message }) {
    try {
      const prefix = PREFIXES.find((p) => event.body && event.body.toLowerCase().startsWith(p));

      if (!prefix) {
        return; // Invalid prefix, ignore the command
      }

      const prompt = event.body.substring(prefix.length).trim();

      if (!prompt) {
        const defaultMessage = getCenteredHeader("𝗭𝗘𝗣𝗛𝗬𝗥𝗨𝗦 𝗕𝗢𝗧") + "\n" + horizontalLine + "\nHey! How can I assist you in your AI journey?\n" + horizontalLine;
        await message.reply(defaultMessage);
        return;
      }

      const answer = await getGPTResponse(prompt);

      // Adding header and horizontal lines to the answer
      const answerWithHeader = getCenteredHeader("𝗞𝗬𝗟𝗘 | 𝗔𝗜 𓃵") + "\n" + horizontalLine + "\n" + answer + "\n" + horizontalLine;

      await message.reply(answerWithHeader);
    } catch (error) {
      console.error("Error:", error.message);
      // Additional error handling if needed
    }
  }
};

function getCenteredHeader(header) {
  const totalWidth = 32; // Adjust the total width as needed
  const padding = Math.max(0, Math.floor((totalWidth - header.length) / 2));
  return " ".repeat(padding) + header;
}

async function getGPTResponse(prompt) {
  // Implement caching logic here

  const response = await axios.get(`${GPT_API_URL}?prompt=${encodeURIComponent(prompt)}`);
  return response.data.answer;
}
