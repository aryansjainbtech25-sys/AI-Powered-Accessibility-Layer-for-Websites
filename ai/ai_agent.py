import json
import urllib.error
import urllib.request

#pls make your api key at groq.com/keys
GROQ_API_KEY = ""
URL = "https://api.groq.com/openai/v1/chat/completions"

HEADERS = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {GROQ_API_KEY}",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    "Accept": "application/json",
}

OUTPUT_SCHEMA = {
    "type": "object",
    "properties": {
        "intent": {
            "type": "string",
            "enum": [
                "explain",
                "summarize",
                "quiz",
                "ask_question",
                "navigate",
            ],
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
        url=URL, data=json_bytes, headers=HEADERS, method="POST"
    )

    try:
        with urllib.request.urlopen(request) as response:
            raw_body = response.read().decode("utf-8")
            data = json.loads(raw_body)
            content_string = data["choices"][0]["message"]["content"]
            return json.loads(content_string)
    except urllib.error.HTTPError as err:
        print(f"Error {err.code}: {err.read().decode('utf-8')}")
        raise

#testing code for u guys to try it out
if __name__ == "__main__":
    sample_page = """
    NCERT Class 10 - Chapter 6: Life Processes.
    Maintenance of living organisms is necessary even when they are not doing anything particular.
    Nutrition is the process of intake of nutrients by an organism and its utilization.
    Autotrophic nutrition involves making food from inorganic substances.
    Heterotrophic nutrition involves depending on other organisms for food.
    """
    sample_query = "I want to understand this chapter."

    print("Analyzing page with Groq...\n")
    result = analyze_page(sample_page, sample_query)
    print(json.dumps(result, indent=2))