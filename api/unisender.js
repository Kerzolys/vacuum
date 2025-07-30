export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  try {
    const { url, body } = req.body;

    // Создаем URLSearchParams заново, подставляя api_key из окружения:
    const params = new URLSearchParams(body);

    // Переписываем api_key на тот, что на сервере:
    params.set("api_key", process.env.UNISENDER_API_KEY);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const data = await response.text();
    res.status(response.status).send(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}