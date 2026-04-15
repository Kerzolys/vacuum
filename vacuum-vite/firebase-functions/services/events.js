const admin = require("firebase-admin");

const db = admin.firestore();

const ADD_EVENT_STEPS = [
  { key: "date", question: "Введите дату события (например, 2026-03-03):" },
  { key: "time", question: "Введите время события (например, 19:00):" },
  { key: "location", question: "Введите место события:" },
  { key: "title", question: "Введите название события:" },
  { key: "program", question: "Введите программу (через запятую):" },
  { key: "link", question: "Введите ссылку (или /skip):" },
];

const ARCHIEVE_EVENT_STEP = [
  {
    key: "id",
    question: "Какое событие вы хотите архивировать (введите id события)?",
  },
];

const DELETE_EVENT_STEP = [
  {
    key: "id",
    question: "Какое событие вы хотите удалить (введите id события)?",
  },
];

async function fetchEvents() {
  const snapshot = await db
    .collection("events")
    .orderBy("createdAt", "desc")
    .get();

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title,
      date: data.date,
      time: data.time,
      location: data.location,
      program: data.program,
      link: data.link,
      createdAt: data.createdAt,
      archived: data.archived,
    };
  });
}

async function getEventsList(chatId, sendMessage) {
  try {
    const events = await fetchEvents();
    if (events.length === 0) {
      await sendMessage(chatId, "Событий пока нет.");
    } else {
      const messageText = events
        .map((ev) => {
          const id = ev.id;
          const archived = ev.archived ? " (Archived)" : "";
          const dateTime = `${ev.date || ""} ${ev.time || ""}`.trim();
          const location = ev.location ? `, место: ${ev.location}` : "";
          const link = ev.link ? `\nСсылка: ${ev.link}` : "";
          const program = ev.program?.length
            ? `\nПрограмма: ${ev.program.join(", ")}`
            : "";
          return `• ${id} ${ev.title || "Без названия"} ${archived.toUpperCase()} (${dateTime}${location})${program}${link}`;
        })
        .join("\n\n");
      await sendMessage(chatId, messageText);
    }
  } catch (err) {
    console.log(err);

    sendMessage(chatId, `Ошибка получения событий: ${err.message}`);
  }
}

async function startAddEventFlow(userId, chatId, sendMessage) {
  await db.collection("eventDrafts").doc(String(userId)).set({
    flow: "add",
    currentStepIndex: 0,
    data: {},
  });

  await sendMessage(
    chatId,
    `${ADD_EVENT_STEPS[0].question}\n(можно написать /skip, чтобы пропустить)`,
  );
}

async function handleAddFlow(draftRef, draft, chatId, text, sendMessage) {
  let { currentStepIndex, data } = draft;
  const step = ADD_EVENT_STEPS[currentStepIndex];

  const isSkip = text.toLowerCase() === "/skip";

  if (!isSkip) {
    if (step.key === "program") {
      data.program = text
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean);
    } else {
      data[step.key] = text;
    }
  }

  currentStepIndex++;

  if (currentStepIndex >= ADD_EVENT_STEPS.length) {
    await db.collection("events").add({
      ...data,
      archived: false,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    await draftRef.delete();
    await sendMessage(chatId, "Событие создано.");
  } else {
    await draftRef.set({ flow: "add", currentStepIndex, data });
    await sendMessage(
      chatId,
      `${ADD_EVENT_STEPS[currentStepIndex].question}\n(можно написать /skip)`,
    );
  }

  return true;
}

async function startArchieveEventFlow(userId, chatId, sendMessage) {
  await db.collection("eventDrafts").doc(String(userId)).set({
    flow: "archive",
    currentStepIndex: 0,
    data: {},
  });

  await sendMessage(chatId, ARCHIEVE_EVENT_STEP[0].question);
}

async function handleArchiveFlow(draftRef, draft, chatId, text, sendMessage) {
  const eventId = text.trim();
  const eventRef = db.collection("events").doc(eventId);
  const snap = await eventRef.get();

  if (!snap.exists) {
    await sendMessage(chatId, "Событие не найдено.");
    await draftRef.delete();
    return true;
  }

  await eventRef.update({ archived: true });
  await draftRef.delete();

  await sendMessage(chatId, `Событие ${eventId} заархивировано.`);
  return true;
}

async function startDeleteEventFlow(userId, chatId, sendMessage) {
  await db.collection("eventDrafts").doc(String(userId)).set({
    flow: "delete",
    currentStepIndex: 0,
    data: {},
  });

  await sendMessage(chatId, DELETE_EVENT_STEP[0].question);
}

async function handleDeleteFlow(draftRef, draft, chatId, text, sendMessage) {
  const eventId = text.trim();
  const eventRef = db.collection("events").doc(eventId);
  const snap = await eventRef.get();

  if (!snap.exists) {
    await sendMessage(chatId, "Событие не найдено.");
    await draftRef.delete();
    return true;
  }

  await eventRef.delete();
  await draftRef.delete();

  await sendMessage(chatId, `Событие ${eventId} удалено.`);
  return true;
}

async function handleEventDraftStep({ userId, chatId, text, sendMessage }) {
  const draftRef = db.collection("eventDrafts").doc(String(userId));
  const draftSnap = await draftRef.get();

  if (!draftSnap.exists) return false;

  const draft = draftSnap.data();
  const { flow, currentStepIndex } = draft;

  if (flow === "add") {
    return handleAddFlow(draftRef, draft, chatId, text, sendMessage);
  }

  if (flow === "archive") {
    return handleArchiveFlow(draftRef, draft, chatId, text, sendMessage);
  }

  if (flow === "delete") {
    return handleDeleteFlow(draftRef, draft, chatId, text, sendMessage);
  }

  return false;
}

module.exports = {
  startAddEventFlow,
  getEventsList,
  startArchieveEventFlow,
  startDeleteEventFlow,
  handleEventDraftStep,
};
