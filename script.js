/* === Model === */
class GameOfLife {
  constructor(size = 40) {
    this.rows = size;
    this.cols = size;
    this.board = this.#emptyBoard();
  }
  #emptyBoard() { return Array.from({ length: this.rows }, () => Array(this.cols).fill(0)); }
  resize(n) { this.rows = this.cols = n; this.board = this.#emptyBoard(); }

  randomize() { this.board = this.board.map(r => r.map(() => Math.random() > 0.7 ? 1 : 0)); }

  step() {
    const next = this.#emptyBoard();
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const alive = this.board[r][c] === 1;
        const count = this.#neighbours(r, c);
        next[r][c] = (alive && (count === 2 || count === 3)) || (!alive && count === 3) ? 1 : 0;
      }
    }
    this.board = next;
  }
  #neighbours(r, c) {
    let sum = 0;
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        const nr = (r + dr + this.rows) % this.rows;
        const nc = (c + dc + this.cols) % this.cols;
        sum += this.board[nr][nc];
      }
    }
    return sum;
  }
}

/* === View + Controller === */
const boardEl = document.getElementById('board');
const sizeInput   = document.getElementById('size');
const speedInput  = document.getElementById('speed');
const speedLabel  = document.getElementById('speed-display');
const patternSel  = document.getElementById('pattern-select');

let game    = new GameOfLife(+sizeInput.value);
let running = false;
let timerId = null;
let speed   = +speedInput.value;

function render() {
  boardEl.style.gridTemplateColumns = `repeat(${game.cols}, var(--cell-size))`;
  boardEl.innerHTML = '';
  game.board.forEach((row, r) => {
    row.forEach((cell, c) => {
      const div = document.createElement('div');
      div.className = cell ? 'cell alive' : 'cell';
      div.onclick = () => {
        if (running) return;
        game.board[r][c] = game.board[r][c] ? 0 : 1;
        render(); // <-- fix: re-render whole board so all changes are visible
      };
      boardEl.appendChild(div);
    });
  });
}

function loop() {
  game.step();
  render();
}

function start() {
  running = true;
  timerId = setInterval(loop, speed);
  document.getElementById('btn-toggle').textContent = 'Stop';
}

function stop() {
  running = false;
  clearInterval(timerId);
  document.getElementById('btn-toggle').textContent = 'Start';
}

/* === Event wiring === */
document.getElementById('btn-toggle').onclick = () => running ? stop() : start();
document.getElementById('btn-random').onclick = () => { game.randomize(); render(); };
document.getElementById('btn-clear').onclick  = () => { game.board = game.board.map(r => r.map(() => 0)); render(); };

speedInput.oninput = e => {
  speed = +e.target.value;
  speedLabel.textContent = speed;
  if (running) { stop(); start(); }
};

sizeInput.onchange = e => { stop(); game.resize(+e.target.value); render(); };

document.getElementById('btn-apply-pattern').onclick = () => {
  stop();
  applyPattern(patternSel.value);
  render();
};

/* === Patterns === */
const PATTERNS = {
  glider: [[0,1],[1,2],[2,0],[2,1],[2,2]],
  blinker: [[0,1],[1,1],[2,1]],
  toad: [[1,0],[1,1],[1,2],[2,1],[2,2],[2,3]],
  beacon: [[0,0],[0,1],[1,0],[1,1],[2,2],[2,3],[3,2],[3,3]],
  pulsar: [
    /* large 13×13 pulsar, coordinates trimmed for brevity */
    [2,4],[2,5],[2,6],[4,2],[4,7],[5,2],[5,7],[6,2],[6,7],
    [4,9],[5,9],[6,9],[7,4],[7,5],[7,6],
    [9,4],[9,5],[9,6],[11,2],[11,7],[12,2],[12,7],[13,2],[13,7],
    [11,9],[12,9],[13,9],[7,9],[9,9]
  ],
  lwss: [
    [0,1],[0,4],[1,5],[2,0],[2,5],[3,0],[3,1],[3,2],[3,3],[4,2]
  ]
};

function applyPattern(name) {
  const coords = PATTERNS[name];
  if (!coords) return;
  game.board = game.board.map(r => r.map(() => 0));
  coords.forEach(([r,c]) => {
    if (r < game.rows && c < game.cols) game.board[r][c] = 1;
  });
}

/* === Save / Load (Bonus) === */
const SAVE_KEY = 'gol-board';
document.getElementById('btn-save').onclick = () => {
  const data = {
    size: game.rows,
    board: game.board
  };
  const blob = new Blob([JSON.stringify(data)], {type:'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'game_of_life.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
document.getElementById('btn-load').onclick = () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json,application/json';
  input.onchange = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = evt => {
      try {
        const data = JSON.parse(evt.target.result);
        let size = data.size || data.rows;
        let loadedBoard = data.board;
        if (!Array.isArray(loadedBoard) || !size) throw new Error();
        stop();
        game.resize(size);
        sizeInput.value = size;
        // Defensive: ensure all rows are arrays of correct length
        if (loadedBoard.length !== size || loadedBoard.some(row => !Array.isArray(row) || row.length !== size)) {
          throw new Error();
        }
        // Deep copy to avoid reference issues
        game.board = loadedBoard.map(row => row.slice());
        render();
      } catch {
        alert('Could not load file. Make sure it is a valid Game of Life save file.');
      }
    };
    reader.readAsText(file);
  };
  input.click();
};

/* === Init === */
applyPattern('glider');
render();
