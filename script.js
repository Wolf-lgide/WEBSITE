async function submitApplication() {
  try {
 
      const ipResponse = await fetch("https://api64.ipify.org?format=json");
      const ipData = await ipResponse.json();
      const userIP = ipData.ip;

      const embed = {
          title: "📩 New Whitelist Application",
          color: 3421515,
          fields: [
              { name: "👤 Name IRL", value: document.getElementById("nameIRL").value.trim() || "N/A", inline: true },
              { name: "🎂 Age IRL", value: document.getElementById("ageIRL").value.trim() || "N/A", inline: true },
              { name: "👤 Name RP", value: document.getElementById("nameRP").value.trim() || "N/A", inline: true },
              { name: "🎭 Age RP", value: document.getElementById("ageRP").value.trim() || "N/A", inline: true },
              { name: "🚻 Gender", value: document.getElementById("gender").value.trim() || "N/A", inline: true },
              { name: "💬 Discord Username", value: document.getElementById("discordUsername").value.trim() || "N/A", inline: true },
              { name: "🆔 ID Number", value: document.getElementById("IdNumber").value.trim() || "N/A", inline: true },
              { name: "📜 Character Story", value: document.getElementById("characterStory").value.trim() || "N/A" },
              { name: "🤝 Reason to Join", value: document.getElementById("reasonJoin").value.trim() || "N/A" },
          ],
          footer: { text: `🖥️ Submitted from IP: ${userIP}` } 
      };

  
      const response = await fetch("https://wolf-lgide.github.io/WEBSITE/send-webhook", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ embed, ip: userIP }), 
      });

      const result = await response.json();
      if (result.success) {
          alert("✅ Application submitted successfully!");
      } else {
          throw new Error(result.error || "Unknown error occurred.");
      }
  } catch (error) {
      console.error("❌ Error submitting application:", error);
      alert("❌ Error submitting application: " + error.message);
  }
}
