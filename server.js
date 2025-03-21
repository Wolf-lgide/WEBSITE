require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fetch = require("node-fetch");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 2053;
const WEBHOOK_URL = process.env.WEBHOOK_URL;
const FILE_PATH = path.join(__dirname, "application.txt");

if (!WEBHOOK_URL) {
  console.error("❌ Webhook URL is missing! Set it in the .env file.");
  process.exit(1);
}

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/send-webhook", async (req, res) => {
  try {
    const { embed } = req.body;

    if (!embed) {
      return res.status(400).json({ success: false, error: "❌ Missing embed data" });
    }


    const applicationData = `
========== NEW APPLICATION ==========
📅 Date: ${new Date().toLocaleString()}
🌍 IP: ${req.ip}
👤 Name IRL: ${embed.fields[0].value}
🎂 Age IRL: ${embed.fields[1].value}
👤 Name RP: ${embed.fields[2].value}
🎭 Age RP: ${embed.fields[3].value}
🚻 Gender: ${embed.fields[4].value}
💬 Discord Username: ${embed.fields[5].value}
🆔 ID Number: ${embed.fields[6].value}
📜 Character Story:
${embed.fields[7].value}
🤝 Reason to Join:
${embed.fields[8].value}
=====================================\n`;


    fs.appendFileSync(FILE_PATH, applicationData, "utf8");

 
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ embeds: [embed] }),
    });

    if (!response.ok) {
      throw new Error(`Discord API error: ${response.status} - ${await response.text()}`);
    }

    res.json({ success: true, message: "✅ Application submitted successfully and saved!" });
  } catch (error) {
    console.error("❌ Error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => console.log(`✅ Server running on http://62.171.157.153:${PORT}/`));
