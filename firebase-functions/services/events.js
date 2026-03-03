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
    currentStepIndex: 0,
    data: {},
  });

  const firstStep = ADD_EVENT_STEPS[0];
  await sendMessage(
    chatId,
    `${firstStep.question}\n(можно написать /skip, чтобы пропустить)`,
  );
}

async function handleAddEventStep({ userId, chatId, text, sendMessage }) {
  const draftRef = db.collection("eventDrafts").doc(String(userId));
  const draftSnap = await draftRef.get();

  if (!draftSnap.exists) {
    return false;
  }

  if (text.startsWith("/")) {
    await sendMessage(chatId, "Введите id события.");
    return true;
  }

  const draft = draftSnap.data();
  let { currentStepIndex, data } = draft;
  const step = ADD_EVENT_STEPS[currentStepIndex];

  const lower = text.toLowerCase();
  const isSkip = lower === "/skip" || lower === "пропустить";

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

  currentStepIndex += 1;

  if (currentStepIndex >= ADD_EVENT_STEPS.length) {
    const newEvent = {
      ...data,
      archived: false,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await db.collection("events").add(newEvent);
    await draftRef.delete();

    await sendMessage(
      chatId,
      `Событие создано:\n${newEvent.title || "Без названия"}`,
    );
  } else {
    await draftRef.set({ currentStepIndex, data });
    const nextStep = ADD_EVENT_STEPS[currentStepIndex];
    await sendMessage(
      chatId,
      `${nextStep.question}\n(можно написать /skip, чтобы пропустить)`,
    );
  }

  return true;
}

async function startArchieveEventFlow(userId, chatId, sendMessage) {
  await db.collection("archievDrafts").doc(String(userId)).set({
    currentStepIndex: 0,
    data: {},
  });

  const firstStep = ARCHIEVE_EVENT_STEP[0];
  await sendMessage(chatId, firstStep.question);
}

async function handleArcheveEventStep({ userId, chatId, text, sendMessage }) {
  const draftRef = db.collection("archievDrafts").doc(String(userId));
  const draftSnap = await draftRef.get();

  if (!draftSnap.exists) {
    return false;
  }

  const draft = draftSnap.data();
  let { currentStepIndex, data } = draft;
  const step = ARCHIEVE_EVENT_STEP[currentStepIndex];
  data[step.key] = text;

  currentStepIndex += 1;

  if (currentStepIndex >= ARCHIEVE_EVENT_STEP.length) {
    const eventId = text.trim();
    const eventRef = db.collection("events").doc(eventId);
    const snap = await eventRef.get();

    if (!snap.exists) {
      await sendMessage(
        chatId,
        `События с id ${eventId} не существует. Проверьте id`,
      );
      return;
    }

    await eventRef.update({ archived: true });
    await draftRef.delete();

    await sendMessage(chatId, `Событие ${eventId} заархивировано.`);
  }

  return true;
}

module.exports = {
  startAddEventFlow,
  handleAddEventStep,
  getEventsList,
  startArchieveEventFlow,
  handleArcheveEventStep,
};
