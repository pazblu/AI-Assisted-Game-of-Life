# Reflection — AI-Assisted Game of Life

*Individual Exercise 3 – AI-Assisted Conway’s Game of Life*

---

## 1. Tool Used

- **ChatGPT (o3, June 2025):**
  - Enabled rapid, conversational scaffolding of a multi-file vanilla JS project.
  - Provided clear explanations and iterative improvements.
- **GitHub Copilot (VS Code extension, v1.174):**
  - Provided fast inline completions and small refactor suggestions directly in the editor.
  - Especially useful for boilerplate and documentation tweaks.

---

## 2. Prompting Strategy

**Prompts that Worked:**
- “Generate a vanilla-JS Game of Life with MVC separation, 40×40 grid, start/stop controls, pattern library, speed slider. Split into *index.html*, *style.css*, *script.js*.”
  - ChatGPT produced a clean, three-file scaffold that matched nearly all rubric requirements and was easy to extend.
- “Rewrite the styles with CSS variables, soft shadows, and a modern look.”
  - Resulted in readable, easily themeable CSS using `:root` variables.
- “Add save/load via file download/upload, no external libraries.”
  - ChatGPT added file-based persistence that worked cross-browser and fit the UI.

**Prompts that Mis-fired:**
- “Here’s the assignment file – just **solve** it for me.”
  - ChatGPT produced a rough outline that looked complete at first glance, but several core functions were only stubbed out (“TODO” comments) and some UI controls were missing. In other words, the tool left noticeable “holes” that I still had to fill manually.

---

## 3. Tool Evaluation

**ChatGPT:**
- Strengths:
  - Multi-file scaffolding
  - Architectural advice
  - Documentation generation
- Weaknesses:
  - Sometimes mixes paradigms (OO vs functional)
  - Can't run or debug code 
- Most helpful for:
  - Initial MVC structure (very good)
  - Pattern data
  - Drafting this reflection ;)
- Fell short when:
  loosing context over time
- Notable limitations:
  - No debugging
  - Can’t optimize for large file structre

**GitHub Copilot (agent mode):**
- Strengths:
  - Fast single-line completions
  - Quick tweaks and doc edits
- Weaknesses:
  - Not helpful for large refactors
- Most helpful for:
  - Polishing README
  - Adding comments
  - Minor code fixes
- Fell short when:
  - Couldn’t vibe coded
- Notable limitations:
  - loosing context fast

**Iterations:**
- 5 main loops (scaffold → styling → patterns → save/load → polish) plus many micro Copilot completions.

---

## 4. Code Quality & Manual Improvements

- **Refactoring:** Wrapped logic in a `GameOfLife` class, replacing initial standalone functions.
- **MVC Discipline:** Kept *script.js* organized into Model (class), View (DOM grid + CSS), Controller (event listeners).
- **Naming & Structure:** Used expressive function names (`applyPattern`, `#emptyBoard`), and extracted pattern data to a constant.
- **Logic Fixes:** Switched from `setTimeout` to `setInterval`, added deep-copy on load, and ensured patterns fit the grid.
- **Performance:** Full grid re-renders each tick (acceptable for ≤100×100); canvas would be faster but was not required.

---

## 5. Where the Tool Helped Most / Fell Short

- **Helped:** Rapidly generating the project scaffold, pattern data, and documentation.
- **Fell Short:** Fine-tuning DOM updates, catching toroidal edge bugs, and ensuring file-based save/load worked seamlessly in all browsers.

---

## 6. Summary

AI tools (ChatGPT + Copilot) accelerated development and documentation, but human review and manual refinement were essential for performance, usability, and rubric alignment. The result is a robust, user-friendly Game of Life that meets all assignment criteria, with a clear, maintainable codebase and this structured reflection.
