from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from openai import OpenAI
from pathlib import Path
import os


def load_key_from_env_file() -> str | None:
  def parse_env_file(file_path: Path) -> dict:
    values = {}
    if not file_path.exists():
      return values
    for line in file_path.read_text(encoding="utf-8").splitlines():
      stripped = line.strip()
      if not stripped or stripped.startswith("#"):
        continue
      if "=" in stripped:
        key, value = stripped.split("=", 1)
        values[key.strip()] = value.strip().strip('"').strip("'")
    return values

  here = Path(__file__).resolve().parent
  candidates = [
    here / ".env",
    here.parent / ".env",
  ]
  for candidate in candidates:
    values = parse_env_file(candidate)
    if "OPENROUTER_API_KEY" in values:
      return values["OPENROUTER_API_KEY"]
  return None


api_key = os.getenv("OPENROUTER_API_KEY") or load_key_from_env_file()
if not api_key:
  raise RuntimeError("Missing OPENROUTER_API_KEY environment variable")

client = OpenAI(
  base_url="https://openrouter.ai/api/v1",
  api_key=api_key,
)

app = FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)


class ChatRequest(BaseModel):
  message: str
  system: str | None = None
  model: str | None = "deepseek/deepseek-chat-v3.1:free"


@app.post("/api/chat")
def chat(req: ChatRequest):
  try:
    messages = []
    if req.system:
      messages.append({"role": "system", "content": req.system})
    messages.append({"role": "user", "content": req.message})

    completion = client.chat.completions.create(
      model=req.model or "deepseek/deepseek-chat-v3.1:free",
      messages=messages,
      extra_headers={
        "HTTP-Referer": "local",  # optional
        "X-Title": "Deepseek UI",  # optional
      },
    )
    return {"ok": True, "text": completion.choices[0].message.content}
  except Exception as exc:
    raise HTTPException(status_code=500, detail=str(exc))


@app.get("/")
def root():
  return {"status": "ok"}

# Serve the static UI from /ui
public_dir = Path(__file__).resolve().parent / "public"
if public_dir.exists():
  app.mount("/ui", StaticFiles(directory=str(public_dir), html=True), name="ui")


