from openai import OpenAI
import os
from pathlib import Path

def load_key_from_env_file() -> str | None:
  """Attempt to load OPENROUTER_API_KEY from a .env file.

  Search order:
  1) Deepseek/.env (next to this file)
  2) Project root .env (two parents up from this file)
  """
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

completion = client.chat.completions.create(
  extra_headers={
    "HTTP-Referer": "<YOUR_SITE_URL>", # Optional. Site URL for rankings on openrouter.ai.
    "X-Title": "<YOUR_SITE_NAME>", # Optional. Site title for rankings on openrouter.ai.
  },
  extra_body={},
  model="deepseek/deepseek-chat-v3.1:free",
  messages=[
    {
      "role": "user",
      "content": "make a paragraph of a history , present and future of india in 1000 words"
    }
  ]
)
print(completion.choices[0].message.content)
# Set-Location E:\Node\Deepseek
uvicorn server:app --host 0.0.0.0 --port 8000 --reload
# http://127.0.0.1:8000/ui