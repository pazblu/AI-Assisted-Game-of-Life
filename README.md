# Conway's Game of Life — AI-Assisted Implementation

## How to Run

1. Download or clone this folder to your computer.
2. Open `index.html` in any modern web browser (Chrome, Edge, Firefox, etc).
   - No installation or server is required.
3. To save your board, click the **💾 Save** button. The file will be downloaded to your **Downloads** directory (e.g., `game_of_life.json`).
4. To load a saved board, click **📂 Load** and select your previously saved file from the Downloads folder.

## Features
- **40×40 grid by default** (can be resized 10–100)
- **Start/Stop** simulation
- **Randomize** or **Clear** the grid
- **Toggle cells** by clicking (when stopped)
- **Control simulation speed** (50–1000 ms)
- **Pattern library** (Glider, Blinker, Toad, Beacon, Pulsar, Lightweight Spaceship)
- **Save/Load** board state (JSON file in Downloads)

## Design & How It Works
- **MVC Structure:**
  - **Model:** `GameOfLife` class manages the board and rules.
  - **View:** The grid is rendered as a CSS grid of clickable divs.
  - **Controller:** UI controls and event listeners manage user actions.
- **Responsive UI:**
  - Controls are grouped at the top for easy access.
  - The board resizes automatically based on the chosen grid size.
  - Patterns are inserted centered on the board.
- **Persistence:**
  - When you save, a `.json` file is created in your Downloads folder.
  - When you load, select a compatible `.json` file from Downloads.

## Notes
- The simulation uses a toroidal (wrapping) grid.
- The UI is styled for clarity and ease of use.
- All logic and UI are implemented in vanilla JavaScript, HTML, and CSS.

---

Enjoy experimenting with Conway's Game of Life!
