# ChatGPT Telegram Bot

A simple telegram bot that connects with OpenAI's ChatGPT API
This allows you to query with ChatGPT within telegram - as opposed to downloading the app

## Setup
The piece of code is a simple JavaScript script, that can be simply hosted on any python runtime environment

You would also need to setup a `.env` file with the following variables to ensure the application runs smoothly
- `OPENAI_TOKEN` - the ChatGPT token generated base. The token can be found at https://platform.openai.com/api-keys
- `BOT_TOKEN` - the token generated when creating your telegram bot. For more details, check out https://core.telegram.org/bots
- `TELEGRAM_ID` - as an added layer of protection, include your telegram ID so only you will be able to make queries to ChatGPT (you wouldn't want someone to spam queries using your ChatGPT tokens!). For more details on your telegram ID, follow the instructions in **userinfobot** in Telegram
