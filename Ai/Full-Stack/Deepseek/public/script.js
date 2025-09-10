const messagesEl = document.getElementById("messages");
const formEl = document.getElementById("chat-form");
const inputEl = document.getElementById("input");
const modelEl = document.getElementById("model");

function appendMessage(role, text) {
  const wrap = document.createElement("div");
  wrap.className = `msg msg--${role}`;
  const avatar = document.createElement("div");
  avatar.className = "msg__avatar";
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = text;
  wrap.appendChild(avatar);
  wrap.appendChild(bubble);
  messagesEl.appendChild(wrap);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

async function sendMessage(text) {
  appendMessage("user", text);
  appendMessage("bot", "Thinking...");
  const thinkingBubble = messagesEl.lastChild.querySelector(".bubble");
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text, model: modelEl.value }),
    });
    const data = await res.json();
    if (!res.ok || !data.ok) throw new Error(data.detail || "Request failed");
    thinkingBubble.textContent = data.text;
  } catch (err) {
    thinkingBubble.textContent = `Error: ${err.message}`;
  }
}

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = inputEl.value.trim();
  if (!text) return;
  inputEl.value = "";
  sendMessage(text);
});


