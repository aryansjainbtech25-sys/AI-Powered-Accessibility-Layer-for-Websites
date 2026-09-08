import json
import os
import urllib.error
import urllib.request
from typing import List

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


GROQ_API_KEY = ""
 
GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"

HEADERS = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {GROQ_API_KEY}",
    "Accept": "application/json",
}

OUTPUT_SCHEMA = {
    "type": "object",
    "properties": {
        "intent": {
            "type": "string",
            "enum": ["explain", "summarize", "quiz", "ask_question", "navigate"],
        },
        "summary": {"type": "string"},
        "key_points": {"type": "array", "items": {"type": "string"}},
        "next_actions": {"type": "array", "items": {"type": "string"}},
    },
    "required": ["intent", "summary", "key_points", "next_actions"],
    "additionalProperties": False,
}


def analyze_page(page_content: str, user_query: str) -> dict:
    

    payload = {
        "model": "qwen/qwen3.8-27b",
        "messages": [
            {
                "role": "system",
                "content": (
                    "You are an AI assistant for web accessibility and learning. "
                    "Analyze user intent, simplify content, extract key points, and suggest next actions."
                ),
            },
            {
                "role": "user",
                "content": f"--- PAGE CONTENT ---\n{page_content}\n\n--- USER QUERY ---\n{user_query}",
            },
        ],
        "response_format": {
            "type": "json_schema",
            "json_schema": {
                "name": "webpage_analysis",
                "strict": True,
                "schema": OUTPUT_SCHEMA,
            },
        },
        "temperature": 0.2,
    }

    json_bytes = json.dumps(payload).encode("utf-8")
    request = urllib.request.Request(
        url=GROQ_URL, data=json_bytes, headers=HEADERS, method="POST"
    )

    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            raw_body = response.read().decode("utf-8")
    except urllib.error.HTTPError as err:
        raise RuntimeError(f"Groq error {err.code}: {err.read().decode('utf-8')}")
    except urllib.error.URLError as err:
        raise RuntimeError(f"Network error reaching Groq: {err.reason}")

    data = json.loads(raw_body)
    content_string = data["choices"][0]["message"]["content"]
    return json.loads(content_string)



app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["POST"],
    allow_headers=["*"],
)


class AnalyzeRequest(BaseModel):
    page_content: str
    user_query: str


class AnalyzeResponse(BaseModel):
    intent: str
    summary: str
    key_points: List[str]
    next_actions: List[str]


@app.post("/analyze", response_model=AnalyzeResponse)
def analyze(req: AnalyzeRequest):
    try:
        return analyze_page(req.page_content, req.user_query)
    except Exception as e:
        raise HTTPException(status_code=502, detail=str(e))


