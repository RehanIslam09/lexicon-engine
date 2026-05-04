# **Project Name: Lexicon Engine**

_(Working Title: A "Bicycle for the Mind" for Narrative Architects)_

## **Overview**

Lexicon Engine is a high-performance, **local-first** narrative design suite built for novelists, screenwriters, and game designers. Unlike traditional word processors that treat stories as linear text, Lexicon Enginetreats stories as **relational databases**. It eliminates "AI slop" in favor of deterministic logic tools—offering a branching narrative canvas, an integrated "World Bible," and a zero-lag editor capable of handling million-word manuscripts. It is designed for professionals who need the structural power of a game-design tool with the distraction-free focus of a premium writing environment.

## **Goals**

1.  **Zero-Latency Performance:** Maintain a consistent 60fps UI and sub-10ms input latency, even with a 1,000,000-word manuscript loaded.
2.  **Deterministic Intelligence:** Provide structural insights (consistency checking, plot-hole detection, and character tracking) without the use of generative AI or LLMs.
3.  **Local-First Reliability:** Ensure 100% offline functionality with instant local persistence, using cloud sync only as a secondary background layer.
4.  **Relational Storytelling:** Bridge the gap between prose and lore, ensuring that every mention of a character or location is bidirectionally linked to the "World Bible."

## **Core User Flow**

1.  **Project Initialization:** User creates a project; the environment is initialized locally in the browser’s IndexedDB.
2.  **Narrative Mapping:** User drafts high-level plot nodes or branches in the **Spatial Canvas** (React Flow).
3.  **World Building:** User defines "Entities" (Characters, Locations, Items) in the **World Bible**.
4.  **Prose Drafting:** User writes in the **Smart Editor**; the system auto-detects Entities via Web Workers and highlights them.
5.  **Logic Verification:** User runs a "Consistency Check" to identify chronological errors or character contradictions.
6.  **Export:** User compiles the branching or linear narrative into professional formats (DOCX, PDF, or JSON for game engines).

## **Features**

### **The Smart Editor (Prose Layer)**

- **Fragmented Loading:** Only the active chapter is mounted to the DOM to ensure zero-lag typing.
- **Entity Overlays:** Real-time, non-intrusive highlighting of characters and world elements.
- **Focus Mode:** A minimalist interface that strips away everything but the current line of thought.

### **The Spatial Canvas (Logic Layer)**

- **Branching Story Trees:** A visual node-based editor for game designers to map choices and consequences.
- **The Loom (Timeline):** A multi-threaded visualizer to track character movements across time and space.
- **Bidirectional Sync:** Changing a chapter title on the map instantly updates the manuscript.

### **The World Bible (Relational Layer)**

- **Dynamic Wiki:** A structured database where entities have properties (age, status, inventory) and relationships.
- **Backlink Tracking:** Automatically see every scene where a specific character appears or is mentioned.

## **Scope**

### **In Scope**

- Next.js 16 Web Application with local-first architecture (Dexie/Yjs).
- Full offline-to-online synchronization pipeline via Supabase.
- Deterministic string-searching and consistency algorithms in Web Workers.
- Node-based narrative visualization for branching paths.

### **Out of Scope**

- Generative AI text completion or "AI Chat with your story."
- Social networking features or public story sharing (MVP is for solo/small team production).
- Mobile app (Initial focus is strictly Desktop-class web experience).

## **Success Criteria**

1.  **The "War and Peace" Test:** A user can paste 600k words into the editor and continue typing with zero perceptible delay.
2.  **Persistence Guarantee:** A user can write a paragraph, close the tab, turn off the internet, reopen the tab, and find their work intact.
3.  **Entity Integrity:** Creating a character "Arthur" in the Bible and typing "Arthur" in the editor creates a functional link within 500ms.
4.  **Logic Accuracy:** The "Consistency Checker" correctly identifies when a character marked as "Dead" in the database is given a dialogue line in a subsequent chapter.

---
