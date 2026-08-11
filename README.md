CLUNKY TETRIS OVERVIEW

Main features:
- Show piece falling and rotating, pieces on board and line clears by manipulating DOM elements (not canvas element, that's why its clunky)
- Allow player events such as move piece, soft drop and hard drop by event listener
- Generate random seed to decode into the order of the 7 pieces in the batch of next pieces
- Hold: Modern tetris feature that allows players to hold current piece and swap it for next piece if current piece is first hold else the previously held piece
- Changing gravity after specific line clears

Explain features
1. Showing pieces
   - uses (Oyx) coordinate system. Y is how many rows are above that row, and x is how many columns are to its left.
   - Piece are shown on a 10x21 black board (each cell is a div). Pieces are displayed differently depending whether the player is controlling the piece or not.
   - Pieces that are placed are saved in both gameCellTracker (which tracks each HTML cells) and gameTracker (saving placed piece as numbers from 0-6 to show colors or 7 (black) if blank)
   - Each time a piece is placed, the game will check if board has any line filled, and then it will perform a line clear. (Will be mentioned at game frames sections)
   - Pieces that are not placed are not tracked in gameCellTracker and gameTracker. Instead, it is tracked by tracking some of it attributes such as its core-position (default spawn at (1,5)), which piece it is (using vectors to track other parts of the piece) and its rotation (tracking current matrix transformation)
   - When displaying the piece movements, the board will undisplay the piece (each cell that contains the piece will turn black), then check if next position is valid (Checks whether the piece's next position is valid by checking whether any of the cells it would occupy are already occupied) and then make the changes. Finally, the piece will be redisplayed.
   - There are two intervals that tracks falling piece and placing a piece. The former is used to calculate gravity.
   - Before a piece is placed, the game will track if piece can drop below or not. It will track the pieces landing time. If landing time is over the interval, every cell of the piece is placed on the board (save the current cells pos onto gameTracker, reset the control piece attributes and change the piece to next piece)

2. Pieces / bag generation
  - Pieces are tracked by numbers from 0 to 6 corresponding to T O Z S L J I pieces.
  - The numbers is saved on gameTracker instead of 0,1 to tracked what color each cell should be
  - This also helps generate different 7-bag for next piece batch. The game will generating a "random seed" for a bag (from 0 -5039 or 7!-1), decode the bag into a pattern which each pieces is assigned to different spots.
  - I don't know what this method is called (since I came up with this on the spot) so here is the explantion: x is number of pieces not picked, y is the code after each pick, A is the default bag wihtout the pieces that are picked (retains the order of each piece), and B will be the bag used to store next pieces. The piece chosen is decide by this formula:
      index = y//((x-1)!)
    A[index] will be appended to B. A[index] will also be removed from A
      new_y = y%((x-1)!)
    the new_y will be used to generate a bag with (x-1) pieces, with the piece at index left out.

    * Why this works: for cases where x = 1, you can pick 1 piece from the bag, this is true.
      x=2 , assuming A is [0,1], then B will be [1,0] if y = 1, and [0,1] if y = 0, 2 distinct bags
      assuming you can generate all (x-1)! extinct bags for x-1 elements from this methods. We will prove that this is also true for x! cases.
      index will be chosen at random from x, new element will be remove from A and append into B
      new_y will be in range of [0,(x-1)!]
      because we can choose/decode (x-1)! distinct orders of elements to add after the first element, and the first element is randomized. This means that we can choose x! distinct bags from x elements by this method.

// P.s other parts will be documented soon
   
