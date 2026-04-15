const admin = require("firebase-admin");
const { uploadImage } = require("./uploadImages");

const db = admin.firestore();

const ADD_IMAGE_STEPS = [
  { key: "title", question: "Введите название изображения:" },
  { key: "link", question: "Загрузите изображение:" },
];

const DELETE_IMAGE_STEP = [
  {
    key: "id",
    question: "Какое изображение вы хотите удалить (введите id события)?",
  },
];

async function fetchImages() {
  const snapshot = await db.collection("images").get();

  return snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      title: data.title,
      link: data.link,
    };
  });
}

async function getImagesList(chatId, sendMessage) {
  try {
    const images = await fetchImages();

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

async function startAddImageFlow(userId, chatId, sendMessage) {
  await db.collection("imageDrafts").doc(String(userId)).set({
    flow: "add",
    currentStepIndex: 0,
    data: {},
  });

  await sendMessage(
    chatId,
    `${ADD_IMAGE_STEPS[0].question}\n(можно написать /skip, чтобы пропустить)`,
  );
}

async function handleAddFlow(draftRef, draft, chatId, text, sendMessage) {
  let { currentStepIndex, data } = draft;
  const step = ADD_IMAGE_STEPS[currentStepIndex];

  const isSkip = text.toLowerCase() === "/skip";

  if (!isSkip) {
    data[step.key] = text;
  }

  currentStepIndex++

  if(currentStepIndex >= ADD_IMAGE_STEPS.length) {
    const link = await uploadImage()
  }
}

module.exports = {
  getImagesList,
};
