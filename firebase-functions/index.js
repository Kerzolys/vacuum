import fetchEvents from "../src/services/fetcher";

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fetch = require("node-fetch");

admin.initializeApp();

const db = admin.firestore();

const TELEGRAM_TOKEN = "8261564214:AAHe_ZjfbgDQfdL-kOFutATVVwLO-bEAk6w";
const ADMIN_ID = 644120863;

exports.telegramWebhook = functions.https.onRequest(async (req, res) => {
  try {
    const message = req.body.message;

    if (!message) {
      res.sendStatus(200);
      return;
    }

    const chatId = message.chat.id;
    const userId = message.from.id;
    const text = message.text;

    if (userId !== ADMIN_ID) {
      await sendMessage(chatId, "Access denied");
      res.sendStatus(200);
      return;
    }

    if (text === "/start") {
      await sendMessage(chatId, "Firebase connected");
    }

    if (text === "/listevents") {
      try {
        const events = fetchEvents();
        if (events.length === 0) {
          await sendMessage(chatId, "Событий пока нет.");
        } else {
          const messageText = events
            .map((ev) => {
              const dateTime = `${ev.date || ""} ${ev.time || ev}`.trim();
              const location = ev.location ? `, место: ${ev.location}` : "";
              const link = ev.link ? `\nСсылка: ${ev.link}` : "";
              const program = ev.program?.length
                ? `\nПрограмма: ${ev.program.join(", ")}`
                : "";
              return `• ${ev.title || "Без названия"} (${dateTime}${location})${program}${link}`;
            })
            .join("\n\n");

          await sendMessage(chatId, messageText);
        }
      } catch (err) {
        console.log(err);

        sendMessage(chatId, `Ошибка получения событий: ${err.message}`);
      }
    }

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

async function sendMessage(chatId, text) {
  await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
}
