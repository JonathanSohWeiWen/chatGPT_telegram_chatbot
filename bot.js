require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const { Configuration, OpenAIApi } = require("openai");

// Set up the ChatGPT API credentials
const configuration = new Configuration({
  apiKey: process.env.OPENAI_TOKEN,
});
const openai = new OpenAIApi(configuration);

// Create a new Telegram bot instance
const botToken = process.env.BOT_TOKEN;
const bot = new TelegramBot(botToken, { polling: true });

// Bot token and allowed user ID
const allowed_user_id = process.env.TELEGRAM_ID;

// Handle incoming messages
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const message = msg.text;
  const userId = msg.from.id;

  if (userId.toString() === allowed_user_id) {
    // Perform actions specific to the authorized user
    try {
      // Use the ChatGPT API to generate a response
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: message,
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      // Send the response back to the user
      bot.sendMessage(
        chatId,
        response.data.choices[0].text +
          "\n\nprompt tokens: " +
          response.data.usage.prompt_tokens +
          ", completion_tokens: " +
          response.data.usage.completion_tokens +
          ", total tokens: " +
          response.data.usage.total_tokens
      );
    } catch (error) {
      console.error("Error:", error);
      bot.sendMessage(chatId, "Oops! Something went wrong.");
    }
  } else {
    bot.sendMessage(chatId, "Sorry, you are not authorized to use this bot.");
  }
});
