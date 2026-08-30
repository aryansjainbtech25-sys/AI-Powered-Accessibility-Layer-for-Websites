USER
  │
  ▼
BROWSER EXTENSION
  │
  ├── Accessibility UI
  ├── Voice
  └── DOM Extractor
          │
          ▼
       BACKEND
          │
          ▼
        AI/LLM
          │
          ▼
     AI RESPONSE
          │
          ▼
 ACCESSIBILITY LAYER
          │
          ├── Simple text
          ├── Translation
          ├── Voice
          └── Task guidance


| Component       | Responsibility                        |
| --------------- | ------------------------------------- |
| Extension       | User interface                        |
| DOM extractor   | Understand webpage structure          |
| Backend         | Connect extension to AI               |
| LLM             | Understand intent + generate guidance |
| Language module | Translation                           |
| Voice module    | Speech                                |
| Task engine     | Identify/highlight next action        |
