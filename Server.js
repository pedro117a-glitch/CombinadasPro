const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "✅ Combinada Pro Proxy corriendo" });
});

app.post("/api/chat", async (req, res) => {
  if (!ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: "API Key no configurada" });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Proxy corriendo en puerto ${PORT}`);
});
