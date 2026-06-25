class tetris{
    constructor(){
        this.gameContainer = document.getElementById("gameContainer");
        this.gameCellDisplay = [];
        this.gameTracker = [];
        for (let i = 0 ; i<210 ; i++ ){
            let gameCell = document.createElement("div");
            gameCell.setAttribute("class","gameCell");
            this.gameContainer.appendChild(gameCell);

            if (i%10 === 0){
                this.gameCellDisplay.push([]);
                this.gameTracker.push([]);            
            }
            this.gameCellDisplay[this.gameCellDisplay.length -1].push(gameCell)
            this.gameTracker[this.gameTracker.length - 1].push(7);
        }   
        this.baseFallTime = 6000;
        this.gravity = 10;
        this.baseLandingTime = 12000;
        this.baseHoldMoveDelay = 10;
        this.basePressMoveDelay = 30;
        this.baseSlowDropDelay = 15;

        this.basePieces = [0,1,2,3,4,5,6];
        this.bag = [];
        this.referenceColor = [
            "purple",
            "yellow",
            "red",
            "green",
            "orange",
            "blue",
            "cyan",
            "black"
        ]
        this.referencePiece = [
            [[0,-1], [-1,0], [0,1]],
            [[0,-1], [-1,-1], [-1,0]],
            [[-1,-1], [-1,0],[0,1]],
            [[0,-1], [-1,0],[-1,1]],
            [[0,-1], [0,1],[-1,1]],
            [[-1,-1], [0,-1],[0,1]],
            [[0,-1], [0,1], [0,2]]
        ];
        this.clockwise = [[0,-1],[1,0]];
        this.counterclockwise = [[0,1],[-1,0]];
        // T O Z S L J I  or blank
        this.defaultRotation = [[1,0],[0,1]];
        this.defaultSpawn = [1,5];

        this.pieceCoordinate = [1,5];
        this.curPiece = 0;
        this.curRotation = [[1,0],[0,1]];
        this.curLandingTime = 0;
        this.curFallTime = 0;
        this.curMoveTime = 0;
        this.curPressMoveDelay = 0;
        this.curSlowDropTime =0;
        this.hasStop = false;  
        this.curHold = 7;
        this.isHoldingPiece = false;

        this.linesClear = 0;
        this.baseGravity = 10;
        
        this.moveLeftKey = "ArrowLeft";       
        this.moveRightKey = "ArrowRight";      
        this.rotateClockwiseKey = "ArrowUp"; 
        this.rotateCounterClockwiseKey = "KeyZ";  
        this.dropPieceKey = "Space";
        this.slowDropKey ="ArrowDown";
        this.holdPieceKey = "KeyC";


        this.moveRightPressEvent = false;
        this.moveLeftPressEvent = false;
        this.rotateClockwisePressEvent = false;
        this.rotateCounterClockwisePressEvent = false;
        this.dropPiecePressEvent = false;
        this.slowDropPressEvent = false;
        this.holdPiecePressEvent = false;

        this.moveRightHoldEvent = false;
        this.moveLeftHoldEvent = false;
        this.rotateClockwiseHoldEvent = false;
        this.rotateCounterClockwiseHoldEvent = false;
        this.dropPieceHoldEvent = false;
        this.slowDropHoldEvent = false;
        this.holdPieceHoldEvent = false;

        this.rowClearState = [];
        for (let i =0; i<21; i++){
            this.rowClearState.push(false);
        }

        this.controlKeyDown = addEventListener("keydown", (event) => {
            if (event.code === this.moveLeftKey){
                this.moveLeftPressEvent = true;
                }
            else if (event.code === this.moveRightKey){
                this.moveRightPressEvent = true;
                }
            else if (event.code === this.rotateClockwiseKey){
                this.rotateClockwisePressEvent = true;
                }
            else if (event.code === this.rotateCounterClockwiseKey){
                this.rotateCounterClockwisePressEvent = true;
                }
            else if (event.code === this.dropPieceKey){
                this.dropPiecePressEvent = true;
            }
            else if (event.code === this.slowDropKey){
                this.slowDropPressEvent = true;
            }
            else if (event.code === this.holdPieceKey){
                this.holdPiecePressEvent = true;
            }
                                                
            }
        );
        this.controlKeyUp = addEventListener("keyup", (event) => {
            if (event.code === this.moveLeftKey){
                this.moveLeftPressEvent = false;
                this.moveLeftHoldEvent = false;
                }
            else if (event.code === this.moveRightKey){
                this.moveRightPressEvent = false;
                this.moveRightHoldEvent = false;
                }
            else if (event.code === this.rotateClockwiseKey){
                this.rotateClockwisePressEvent = false;
                this.rotateClockwiseHoldEvent = false;
                }
            else if (event.code === this.rotateCounterClockwiseKey){
                this.rotateCounterClockwisePressEvent = false;
                this.rotateCounterClockwiseHoldEvent = false;
                }
            else if (event.code === this.dropPieceKey){
                this.dropPiecePressEvent = false;
                this.dropPieceHoldEvent = false;
            }
            else if (event.code === this.slowDropKey){
                this.slowDropPressEvent = false;
                this.slowDropHoldEvent = false;
            }    
            else if (event.code === this.holdPieceKey){
                this.holdPiecePressEvent = false;
                this.holdPieceHoldEvent = false;
            }                              
            }
        );
        
        this.nextPieceDisplay = document.getElementById("nextPieceDisplay");
        this.nextPieceDisplayCellTracker = []
        for (let i=0;i<24;i++){
            let displayCell = document.createElement("div");
            displayCell.setAttribute("class","displayCell");
            this.nextPieceDisplay.appendChild(displayCell);
            this.nextPieceDisplayCellTracker.push(displayCell);
        };  
        this.nextPieceDisplayPieceReference=[
            [8,13,14,15],
            [8,9,14,15],
            [7,8,14,15],
            [8,9,13,14],
            [9,13,14,15],
            [7,13,14,15],
            [7,8,9,10]
        ]
        this.holdPieceDisplay = document.getElementById("holdPieceDisplay");
        this.holdPieceDisplayCellTracker = [];

        for (let i=0;i<24;i++){
            let displayCell = document.createElement("div");
            displayCell.setAttribute("class","displayCell");
            this.holdPieceDisplay.appendChild(displayCell);
            this.holdPieceDisplayCellTracker.push(displayCell);
        };
        this.holdPieceDisplayPieceReference = this.nextPieceDisplayPieceReference;

        this.debug = false;

        this.curGameMode = 0;
        this.curGameInterval = 0;

        this.gravityDisplay = document.getElementById("gravity");
        this.linesClearedDisplay = document.getElementById("linesCleared");
    }

    generatePiece(){
        let cur_y = this.pieceCoordinate[0];
        let cur_x = this.pieceCoordinate[1];
        let color = this.referenceColor[this.curPiece];
        this.gameCellDisplay[this.pieceCoordinate[0]][this.pieceCoordinate[1]].style.backgroundColor =color;
        let r = this.curRotation;
        for (let i = 0; i<3; i++ ){
            let vector = this.referencePiece[this.curPiece][i];
            let y = vector[0] * r[0][0] + vector[1] * r[1][0] +cur_y;
            let x = vector[0] * r[0][1] + vector[1] * r[1][1] +cur_x;
            if (y>=0){
                this.gameCellDisplay[y][x].style.backgroundColor =color;
            }
        }
    }
    deactivatePiece(){
        let cur_y = this.pieceCoordinate[0];
        let cur_x = this.pieceCoordinate[1];
        this.gameCellDisplay[this.pieceCoordinate[0]][this.pieceCoordinate[1]].style.backgroundColor =this.referenceColor[this.gameTracker[cur_y][cur_x]];
        let r = this.curRotation;
        for (let i = 0; i<3; i++ ){
            let vector = this.referencePiece[this.curPiece][i];
            let y = cur_y + vector[0] * r[0][0] + vector[1] * r[1][0];
            let x = cur_x + vector[0] * r[0][1] + vector[1] * r[1][1];
            if (y>=0){
                this.gameCellDisplay[y][x].style.backgroundColor =this.referenceColor[this.gameTracker[y][x]];
            }
        }
    }
    isValidMove(cur_y,cur_x){
        if ((cur_y>= 21) || (cur_x<0) || (cur_x>9) || (this.gameTracker[cur_y][cur_x] != 7)){
            return false;
        } 
        let r = this.curRotation;

        for (let i = 0; i<3; i++ ){
            let vector = this.referencePiece[this.curPiece][i];
            let y = cur_y + vector[0] * r[0][0] + vector[1] * r[1][0];
            let x= cur_x + vector[0] * r[0][1] + vector[1] * r[1][1];
            if ((y>= 21) || (x<0) || (x>9) || (this.gameTracker[y][x] != 7)){
                return false;
            }  
        } 
        return true;        
    }
    movePieceLeft(){
        let y = this.pieceCoordinate[0];
        let x = this.pieceCoordinate[1];
        if (!this.isValidMove(y,x-1)){
            return ;
        }
        this.deactivatePiece();
        this.pieceCoordinate[1] -=1;
        this.generatePiece();
    }
    movePieceRight(){
        let y = this.pieceCoordinate[0];
        let x = this.pieceCoordinate[1];
        if (!this.isValidMove(y,x+1)){
            return ;
        }
        this.deactivatePiece();
        this.pieceCoordinate[1] +=1;
        this.generatePiece();
    }  
    movePieceDown(){
        let y = this.pieceCoordinate[0];
        let x = this.pieceCoordinate[1];
        if (!this.isValidMove(y+1,x)){
            return ;
        }
        this.deactivatePiece();
        this.pieceCoordinate[0] +=1;
        this.generatePiece();
    }      

    isValidRotate(){
        return this.isValidMove(this.pieceCoordinate[0], this.pieceCoordinate[1]);
    }
    rotateClockwise(){
        let rotateMatrix = this.clockwise;
        let curRotation = this.curRotation;

        let y_vector = curRotation[0];
        let y = y_vector[0] * rotateMatrix[0][0] + y_vector[1] * rotateMatrix[1][0];
        let x = y_vector[0] * rotateMatrix[0][1] + y_vector[1] * rotateMatrix[1][1];
        curRotation[0][0] = y;
        curRotation[0][1] = x;

        let x_vector = curRotation[1];
        y = x_vector[0] * rotateMatrix[0][0] + x_vector[1] * rotateMatrix[1][0];
        x = x_vector[0] * rotateMatrix[0][1] + x_vector[1] * rotateMatrix[1][1];
        curRotation[1][0] = y;
        curRotation[1][1] = x;
    }
    rotateCounterClockwise(){
        let rotateMatrix = this.counterclockwise;
        let curRotation = this.curRotation;

        let y_vector = curRotation[0];
        let y = y_vector[0] * rotateMatrix[0][0] + y_vector[1] * rotateMatrix[1][0];
        let x = y_vector[0] * rotateMatrix[0][1] + y_vector[1] * rotateMatrix[1][1];
        curRotation[0][0] = y;
        curRotation[0][1] = x;

        let x_vector = curRotation[1];
        y = x_vector[0] * rotateMatrix[0][0] + x_vector[1] * rotateMatrix[1][0];
        x = x_vector[0] * rotateMatrix[0][1] + x_vector[1] * rotateMatrix[1][1];
        curRotation[1][0] = y;
        curRotation[1][1] = x;
    }

    rotatePieceClockwise(){
        this.deactivatePiece();
        this.rotateClockwise();
        let ori_y = this.pieceCoordinate[0];
        let ori_x = this.pieceCoordinate[1];
        if(this.isValidMove(ori_y,ori_x)){
        }
        else if (this.isValidMove(ori_y+1,ori_x)){
            this.pieceCoordinate[0] = ori_y +1;
        }
        else if (this.isValidMove(ori_y,ori_x+2)){
            this.pieceCoordinate[1] = ori_x+2;
        }
        else if (this.isValidMove(ori_y,ori_x-1)){
            this.pieceCoordinate[1] = ori_x -1;
        }
        else if (this.isValidMove(ori_y,ori_x+1)){
            this.pieceCoordinate[1] = ori_x+1;
        }
        else if (this.isValidMove(ori_y-1,ori_x)){
            this.pieceCoordinate[0] = ori_y -1;
        }
        else if (!this.isValidMove(ori_y,ori_x)){
            this.rotateCounterClockwise();
        }
        this.generatePiece();
    }
    rotatePieceCounterClockwise(){
        this.deactivatePiece();
        this.rotateCounterClockwise();
        let ori_y = this.pieceCoordinate[0];
        let ori_x = this.pieceCoordinate[1];
        if(this.isValidMove(ori_y,ori_x)){
        }
        else if (this.isValidMove(ori_y+1,ori_x)){
            this.pieceCoordinate[0] = ori_y +1;
        }
        else if (this.isValidMove(ori_y,ori_x-1)){
            this.pieceCoordinate[1] = ori_x -1;
        }
        else if (this.isValidMove(ori_y,ori_x+1)){
            this.pieceCoordinate[1] = ori_x+1;
        }
        else if (this.isValidMove(ori_y-1,ori_x)){
            this.pieceCoordinate[0] = ori_y -1;
        }
        else if (!this.isValidMove(ori_y,ori_x)){
            this.rotateClockwise();
        }
        this.generatePiece();
    } 
    
    canSwap(){
        let cur_y = this.defaultSpawn[0];
        let cur_x = this.defaultSpawn[1];
        if ((cur_y>= 21) || (cur_x<0) || (cur_x>9) || (this.gameTracker[cur_y][cur_x] != 7)){
            return false;
        } 
        let r = this.defaultRotation;

        for (let i = 0; i<3; i++ ){
            let vector = this.referencePiece[this.bag[this.bag.length - 1]][i];
            let y = cur_y + vector[0] * r[0][0] + vector[1] * r[1][0];
            let x= cur_x + vector[0] * r[0][1] + vector[1] * r[1][1];
            if ((y>= 21) || (x<0) || (x>9) || (this.gameTracker[y][x] != 7)){
                return false;
            }  
        } 
        return true;         
    }
    swapPiece(){
        this.deactivatePiece();
        this.pieceCoordinate = [1,5];
        this.curPiece = this.bag.pop();
        for (let i =0; i<4;i++){
            this.curRotation[Math.floor(i/2)][i%2] = this.defaultRotation[Math.floor(i/2)][i%2]
        }
        this.generatePiece();  
    } 

    isLanding(){
        return (!this.isValidMove(this.pieceCoordinate[0]+1, this.pieceCoordinate[1]));
    }

    placePiece(){
        let cur_y = this.pieceCoordinate[0];
        let cur_x = this.pieceCoordinate[1];
        let r = this.curRotation;
        this.gameTracker[cur_y][cur_x] = this.curPiece;
        for (let i = 0; i<3; i++ ){
            let vector = this.referencePiece[this.curPiece][i];
            let y = cur_y + vector[0] * r[0][0] + vector[1] * r[1][0];
            let x= cur_x + vector[0] * r[0][1] + vector[1] * r[1][1];
            this.gameTracker[y][x] = this.curPiece;
        }         
    }

    holdPiece(){
        if (this.isHoldingPiece){
            return;
        }
        this.isHoldingPiece = true;
        console.log(this.isHoldingPiece);
        if (!(this.curHold===7)){
            this.bag.push(this.curHold);
        }
        this.undisplayHoldPiece();
        this.curHold = this.curPiece;
        this.displayHoldPiece();
    }

    displayHoldPiece(){
        if (this.curHold === 7){
            return;
        }
        let reference = this.holdPieceDisplayPieceReference[this.curHold];
        for (let i = 0;i<4;i++){
            this.holdPieceDisplayCellTracker[reference[i]].style.backgroundColor = this.referenceColor[this.curHold];
        }
    }
    undisplayHoldPiece(){
        if (this.curHold === 7){
            return;
        }
        let reference = this.holdPieceDisplayPieceReference[this.curHold];
        for (let i = 0;i<4;i++){
            this.holdPieceDisplayCellTracker[reference[i]].style.backgroundColor = this.referenceColor[7];
        }        
    }
    generateRandomBag(){
        if (this.bag.length >0 ){
            return;
        }   
        let selection = this.basePieces;
        let sampleSize = 5040;
        let rng = Number(Math.floor(Math.random()*sampleSize));
        for (let i = 7; i>0; i--){
            sampleSize = sampleSize/i;
            let selected = Number(Math.floor(rng/sampleSize));
            while (selection[selected] ==-1){
                selected +=1;
            }
            selection[selected] = -1;
            this.bag.push(selected);
            rng = rng % sampleSize;
        }
        //restore selection pieces or this.basePieces
        for (let i = 0;i<7;i++){
            selection[i] = i;
        }
    }

    isRowFull(y){
        for(let i =0; i<10; i++){
            if (this.gameTracker[y][i] ===7){
                return false;
            }
        }
        return true;
    }

    clearRowFullAfterPieceisPlaced(){
        let cur_y = this.pieceCoordinate[0];
        let r = this.curRotation;
        let furthestLineToClear = -1;
        if (cur_y>=0 && this.isRowFull(cur_y)){
            this.rowClearState[cur_y] = true;
            this.linesClear +=1;
            if (cur_y > furthestLineToClear){
                furthestLineToClear = cur_y;
            }            
        }
        for (let i = 0; i<3; i++ ){
            let vector = this.referencePiece[this.curPiece][i];
            let y = cur_y + vector[0] * r[0][0] + vector[1] * r[1][0];
            if (y>=0 && this.isRowFull(y)){
                if (!this.rowClearState[y]){
                    this.linesClear +=1;
                }
                this.rowClearState[y] = true;
                if (y > furthestLineToClear){
                    furthestLineToClear = y;
                }
            }
        }
        if (furthestLineToClear ===-1){
            return;
        }
        let lineCleared = 1;
        for (let i = furthestLineToClear; i>=0;i--){
            this.rowClearState[i] = false;
            while ((i-lineCleared >=0) && this.rowClearState[i - lineCleared]){
                lineCleared +=1;
            }
            if (i-lineCleared <0){
                for (let j = 0;j<10;j++){
                    this.gameTracker[i][j] = 7;
                    this.gameCellDisplay[i][j].style.backgroundColor = this.referenceColor[7];
                }
            }
            else{
                for (let j = 0;j<10;j++){
                    this.gameTracker[i][j] = this.gameTracker[i-lineCleared][j];
                    this.gameCellDisplay[i][j].style.backgroundColor = this.referenceColor[this.gameTracker[i-lineCleared][j]];
                }                
            }
        }
    }
    dropPiece(){
        let cur_y = this.pieceCoordinate[0];
        let cur_x = this.pieceCoordinate[1];
        this.deactivatePiece();

        while (this.isValidMove(cur_y+1,cur_x)){
            cur_y+=1;
        }
        this.pieceCoordinate[0] = cur_y;
        this.curLandingTime = this.baseLandingTime; //imediately lands
    }

    displayNextPiece(){
        let displayPiece = this.bag[this.bag.length-1];
        let reference = this.nextPieceDisplayPieceReference[displayPiece];
        let color = this.referenceColor[displayPiece];
        for (let i=0;i<4;i++){
            this.nextPieceDisplayCellTracker[reference[i]].style.backgroundColor = color;
        }
    }
    undisplayPiece(){
        let displayPiece = this.bag[this.bag.length-1];
        let reference = this.nextPieceDisplayPieceReference[displayPiece];
        let color = "black";
        for (let i=0;i<4;i++){
            this.nextPieceDisplayCellTracker[reference[i]].style.backgroundColor = color;
        }        
    }
    updateGravityDisplay(){
        this.gravityDisplay.innerHTML = Math.floor((this.gravity/6)*100)/100;
    }
    updateLineClearedDisplay(){
        this.linesClearedDisplay.innerHTML = this.linesClear;
    }

    actionPerGameTick(){
        if (this.hasStop){
            console.log('has stopped');
            return;
        }
        this.updateGravityDisplay();
        this.updateLineClearedDisplay();
        let isLanding = this.isLanding();

        if (isLanding){
            this.curLandingTime +=1;
        }
        else{
            this.curFallTime+=1;
        }

        if (this.dropPiecePressEvent &&(!this.dropPieceHoldEvent)){
            this.dropPieceHoldEvent = true;
            this.dropPiece();
        }

        if ((isLanding) && (this.curLandingTime >= this.baseLandingTime/this.gravity)){
            this.placePiece();
            this.clearRowFullAfterPieceisPlaced();
            if (!this.canSwap()){
                this.hasStop = true;
                this.placePiece();
                return;
            }
            this.undisplayPiece()
            this.swapPiece();
            this.generateRandomBag();
            this.displayNextPiece();
            this.curLandingTime = 0;
            this.curFallTime = 0;

            this.isHoldingPiece = false;
            return;
        }

        if ((!isLanding) && (this.holdPiecePressEvent) && (!this.holdPieceHoldEvent) && (!this.isHoldingPiece)){
            this.holdPieceHoldEvent = true;
            let prevHold = this.curHold;
            this.holdPiece();
            if (!this.canSwap()){
                this.hasStop = true;
                this.placePiece();
                return;
            }
            if (prevHold === 7){
                this.undisplayPiece()
                this.swapPiece();
                this.generateRandomBag();
                this.displayNextPiece();                
            } 
            else{
                this.swapPiece();
                this.generateRandomBag();  
            }  
            this.curLandingTime = 0;
            this.curFallTime = 0;
            return;       
        }


        if (!(isLanding) && (this.curFallTime >= this.baseFallTime/this.gravity)){
            this.movePieceDown();
            this.curFallTime = 0;
        }
        else if (!(isLanding) && (this.slowDropPressEvent) && (!this.slowDropHoldEvent)){
            this.movePieceDown();
            this.curFallTime = 0;
            this.curSlowDropTime = 0;    
            this.slowDropHoldEvent = true;        
        }
        else if (!(isLanding) && (this.slowDropPressEvent) && (this.slowDropHoldEvent) && (this.curSlowDropTime < this.baseSlowDropDelay)){
            this.curSlowDropTime +=1;
        }
        else if (!(isLanding) && (this.slowDropPressEvent) && (this.slowDropHoldEvent) && (this.curSlowDropTime >= this.baseSlowDropDelay)){
            this.movePieceDown();
            this.curFallTime = 0;
            this.curSlowDropTime =0;
        }

        if ((this.moveLeftPressEvent) && (!this.moveRightPressEvent) && (!this.moveLeftHoldEvent)){
            this.movePieceLeft();
            this.moveLeftHoldEvent = true;
            this.curMoveTime = 0;
            this.curPressMoveDelay = this.basePressMoveDelay;
        }
        else if ((this.moveLeftPressEvent) && (!this.moveRightPressEvent) && (this.moveLeftHoldEvent)){
            this.curMoveTime +=1;
            if (this.curMoveTime >= (this.baseHoldMoveDelay + this.curPressMoveDelay)){
                this.curMoveTime = 0;
                this.curPressMoveDelay = 0;
                this.movePieceLeft();
            }
        }
        if ((!this.moveLeftPressEvent) && (this.moveRightPressEvent) && (!this.moveRightHoldEvent)){
            this.movePieceRight();
            this.moveRightHoldEvent = true;
            this.curMoveTime = 0;
            this.curPressMoveDelay = this.basePressMoveDelay;
        }
        else if ((!this.moveLeftPressEvent) && (this.moveRightPressEvent) && (this.moveRightHoldEvent)){
            this.curMoveTime +=1;
            if (this.curMoveTime >= this.baseHoldMoveDelay + this.curPressMoveDelay){
                this.curMoveTime = 0
                this.movePieceRight();
                this.curPressMoveDelay = 0;
            }
        }
        if ((this.rotateClockwisePressEvent) && (!this.rotateCounterClockwisePressEvent) && (!this.rotateClockwiseHoldEvent)){
            this.rotatePieceClockwise();
            this.rotateClockwiseHoldEvent = true
        } 
        if ((!this.rotateClockwisePressEvent) && (this.rotateCounterClockwisePressEvent) && (!this.rotateCounterClockwiseHoldEvent)){
            this.rotatePieceCounterClockwise();
            this.rotateCounterClockwiseHoldEvent = true;
        }     

    }
    
    resetBoard(){
        for (let i =0;i<21;i++){
            for (let j = 0;j<10;j++){
                this.gameTracker[i][j] = 7;
                this.gameCellDisplay[i][j].style.backgroundColor = this.referenceColor[7];
            }
        }
        this.gravity = this.baseGravity;
    }
    setGameMode0(){
        this.curGameMode = 0;
    }    
    setGameMode1(){
        this.curGameMode = 1;
    }

    setUpGameMode0(){
        if (!(this.curGameInterval===0)){
            return;
        }
        this.hasStop = false;
        this.gravity = 120;
        this.generateRandomBag();
        this.curPiece = this.bag.pop();
        this.generatePiece();  
        this.displayNextPiece(); 

        this.curGameInterval = setInterval(()=>{
            if (this.hasStop){
                clearInterval(this.curGameInterval);
                this.curGameInterval === 0;
                this.undisplayPiece(); 
            }
            this.actionPerGameTick();
            this.gravity = Math.floor(this.linesClear/10)*10 +this.baseGravity},1);  
    }
    test(){
        this.curPiece = 4;
        this.generatePiece();
        window.setInterval(() => {
            this.rotatePieceClockwise();
            this.movePieceRight();
        },2000);
        this.gravity = 13;
        window.setInterval(()=>{
            this.movePieceDown();
        },this.baseFallTime / this.gravity);
        window.setInterval(()=>{
            this.generateRandomBag();
            this.placePiece();
            this.swapPiece();
            console.log(this.bag);
        },10000);
    }
    test2(){
        this.gravity = 120;
        this.generateRandomBag();
        this.curPiece = this.bag.pop();
        this.generatePiece();  
        this.displayNextPiece(); 

        let gameInterval = setInterval(()=>{
            if (this.hasStop){
                clearInterval(gameInterval);
            }
            this.actionPerGameTick();},1);          
    }   
}


//start game button/ restart button
//switch mode button + different game mod
//stats + changing gravity mid game
let a = new tetris();
a.setGameMode0();
a.setUpGameMode0();



