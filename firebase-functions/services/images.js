const admin = require("firebase-admin");

const db = admin.firestore();

async function fetchImages() {
  const snapshot = await db.collection("images").get();

  return snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: data.id,
      title: data.title,
      link: data.link,
    };
  });
}

async function getImagesList(chatId, sendMessage) {
  try {
    const images = fetchImages();

    if (images.length === 0) {
      await sendMessage(chatId, "Галлерея пуста");
    } else {
      const messageText = images
        .map((img) => {
          const id = img.id;
          const title = img.title;
          const link = img.link;

          return `• ${id} '\n' ${title || "Без названия"} '\n' ${link}`;
        })
        .join("\n\n");
      await sendMessage(chatId, messageText);
    }
  } catch (err) {
    console.log(err);

    sendMessage(chatId, `Ошибка получения галлереи: ${err.message}`);
  }
}

module.exports = {
  getImagesList,
};
