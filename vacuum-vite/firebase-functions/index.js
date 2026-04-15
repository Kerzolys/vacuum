const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const {
  getEventsList,
  startAddEventFlow,
  startArchieveEventFlow,
  startDeleteEventFlow,
  handleEventDraftStep,
} = require("./services/events.js");

const { getImagesList } = require("./services/images.js");

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const ADMIN_ID = Number(process.env.ADMIN_ID);

exports.telegramWebhook = functions.https.onRequest(async (req, res) => {
  try {
    const message = req.body.message;

    const emptyFlow = async () =>
      await admin
        .firestore()
        .collection("eventDrafts")
        .doc(String(userId))
        .delete()
        .catch(() => {});

    if (!message) {
      res.sendStatus(200);
      return;
    }

    const chatId = message.chat.id;
    const userId = message.from.id;
    const text = (message.text || "").trim();

    if (userId !== ADMIN_ID) {
      await sendMessage(chatId, "Access denied");
      res.sendStatus(200);
      return;
    }

    if (text === "/start") {
      await sendMessage(chatId, "Firebase connected");
      res.sendStatus(200);
      return;
    }

    if (text === "/listevents") {
      await getEventsList(chatId, sendMessage);
      res.sendStatus(200);
      return;
    }

    if (text === "/addevent") {
      emptyFlow();
      await startAddEventFlow(userId, chatId, sendMessage);
      res.sendStatus(200);
      return;
    }

    if (text === "/archieveevent") {
      emptyFlow();
      await startArchieveEventFlow(userId, chatId, sendMessage);
      res.sendStatus(200);
      return;
    }

    if (text === "/deleteevent") {
      emptyFlow();
      await startDeleteEventFlow(userId, chatId, sendMessage);
      res.sendStatus(200);
      return;
    }

    if (await handleEventDraftStep({ userId, chatId, text, sendMessage })) {
      return res.sendStatus(200);
    }

    if (text === "/listimages") {
      await getImagesList(chatId, sendMessage);
      res.sendStatus(200);
      return;
    }

    res.sendStatus(200);
    return;
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
