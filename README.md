Clunky Tetris

A browser-based Tetris implementation built with HTML, CSS, and vanilla JavaScript. This project explores the logic behind falling-block games, including piece movement, rotation, collision detection, line clearing, and piece generation.

Unlike implementations that render the game on a canvas, Clunky Tetris represents the board using individual HTML elements, making DOM manipulation a central part of the game engine.

Features

Piece Movement and Rotation: Move and rotate falling pieces while checking for collisions with occupied cells and board boundaries.

Line Clearing: Detect and clear completed rows when a piece locks into the board.

7-Bag Piece Generation: Generate randomized batches containing all seven standard Tetris pieces using a permutation-based encoding method.

Hold Mechanic: Store the current piece and swap it with a held piece, allowing players to manage their next moves.

Soft Drop and Hard Drop: Control how quickly a piece descends.

Landing and Gravity: Track falling pieces and their landing state, with support for changing gravity after specific line clears.

DOM-Based Rendering: Display the game board and pieces by updating HTML elements rather than drawing on a canvas.

Tech Stack

HTML — Game structure and board elements

CSS — Board layout and visual styling

JavaScript — Game logic, piece movement, collision detection, state tracking, and rendering

No frontend framework is required.

Getting Started

Prerequisites

A modern web browser.

Run Locally

Clone the repository:

git clone https://github.com/tddeptrai/clunky-tetris.git

Open the project directory:

cd clunky-tetris

Open index.html in your browser.

No package installation or build step is required for the current project structure.

Implementation Details

1. Board Representation and State Tracking

The game board is represented as a 10-column by 21-row grid. Each cell corresponds to an HTML element.

The implementation uses two complementary data structures:

gameCellTracker tracks the HTML cells on the board.

gameTracker stores the logical state of placed pieces, using values from 0 to 6 to represent piece types and 7 for empty cells.

The coordinate system uses (y, x), where y represents the row and x represents the column.

Separating the board's logical state from its DOM representation helps the game determine which positions are occupied and whether a proposed movement is valid.

2. Movement, Rotation, and Collision Detection

The currently controlled piece is tracked separately from pieces that have already been placed.

When a piece moves, the game temporarily clears its current visual representation, checks whether its next position is valid, and updates the board display if the movement is allowed.

This process supports movement, rotation, and collision checks without treating the falling piece as a permanently placed part of the board.

3. Seven-Bag Piece Generation

The game generates pieces in batches containing all seven standard tetromino types: I, O, T, S, Z, J, and L.

Instead of repeatedly shuffling an array, the implementation generates a random integer in the range 0 to 7! - 1 and decodes it into a permutation of the seven pieces.

At each step, the algorithm uses factorial-based indexing to select a piece from the remaining pieces, removes that piece from the available set, and continues decoding the remaining permutation.

This approach provides a way to map a random integer to one of the 7! = 5,040 possible piece orders.

4. Falling and Locking Logic

The game tracks falling-piece movement and piece placement using separate timing intervals.

As a piece descends, the game checks whether it can move farther down. When its landing condition is met, its occupied cells are saved to the board state, completed rows are checked, and the next piece becomes active.

The game also includes logic for changing gravity after specified line-clear conditions.

What I Learned

This project gave me practical experience with:

Implementing game logic and managing state in vanilla JavaScript.

Representing a two-dimensional grid using row and column coordinates.

Handling movement, rotation, and collision detection.

Keeping logical game state synchronized with DOM elements.

Using factorial-based indexing to encode and decode permutations.

Managing timing and state transitions in an interactive application.

Future Improvements

Potential improvements include:

Refactoring the game logic into smaller, more maintainable modules.

Adding automated tests for collision detection, rotation, line clearing, and piece generation.

Improving responsive layout and accessibility.

Adding clearer documentation for the gravity system and other game mechanics.

Repository

Source code: github.com/tddeptrai/clunky-tetris
