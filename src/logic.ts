import { InfoResponse, GameState, MoveResponse, Game, Coord } from "./types"

export function info(): InfoResponse {
    console.log("INFO")
    const response: InfoResponse = {
        apiversion: "1",
        author: "",
        color: "#cc108b",
        head: "do-sammy",
        tail: "coffee"
    }
    return response
}

export function start(gameState: GameState): void {
    console.log(`${gameState.game.id} START`)
}

export function end(gameState: GameState): void {
    console.log(`${gameState.game.id} END\n`)
}

export function move(gameState: GameState): MoveResponse {
    let possibleMoves: { [key: string]: boolean } = {
        up: true,
        down: true,
        left: true,
        right: true
    }

    // Step 0: Don't let your Battlesnake move back on it's own neck
    const myHead = gameState.you.head
    const myNeck = gameState.you.body[1]
    const maxheight = gameState.board.height
    const minheigth = 0
    const minwidth = 0
    const maxwidth = gameState.board.width


    if (myNeck.x < myHead.x) {
        possibleMoves.left = false
    } else if (myNeck.x > myHead.x) {
        possibleMoves.right = false
    } else if (myNeck.y < myHead.y) {
        possibleMoves.down = false
    } else if (myNeck.y > myHead.y) {
        possibleMoves.up = false
    }
    
    // TODO: Step 1 - Don't hit walls.
    // Use information in gameState to prevent your Battlesnake from moving beyond the boundaries of the board.

    if (myHead.y === (maxheight -1) ) {
        possibleMoves.up = false
    } 

    if (myHead.y === minheigth ) {
        possibleMoves.down = false 
    }

    if (myHead.x === minwidth ) {
        possibleMoves.left = false 
    }

    if (myHead.x === (maxwidth -1)) {
        possibleMoves.right = false 
    }
        
    // TODO: Step 2 - Don't hit yourself.
    // Use information in gameState to prevent your Battlesnake from colliding with itself.
    const myBody = gameState.you.body
    const targetUp: Coord = {x: myHead.x , y: myHead.y +1 }
    const targetDown: Coord = {x: myHead.x , y: myHead.y -1}
    const targetLeft: Coord = {x: myHead.x -1 , y: myHead.y}
    const targetRight: Coord = {x: myHead.x +1 , y: myHead.y}

    if (myBody.some(coord => coord.x === targetUp.x && coord.y === targetUp.y)) {
        possibleMoves.up = false
    }

    if (myBody.some(coord => coord.x === targetDown.x && coord.y === targetDown.y)) {
        possibleMoves.down = false 
    }
    if (myBody.some(coord => coord.x === targetLeft.x && coord.y === targetLeft.y)) {
        possibleMoves.left = false 
    }
    if (myBody.some(coord => coord.x === targetRight.x && coord.y === targetRight.y)) {
        possibleMoves.right = false 
    }

    
    // TODO: Step 3 - Don't collide with others.
    // Use information in gameState to prevent your Battlesnake from colliding with others.

    // TODO: Step 4 - Find food.
    // Use information in gameState to seek out and find food.

    // Finally, choose a move from the available safe moves.
    // TODO: Step 5 - Select a move to make based on strategy, rather than random.
    const safeMoves = Object.keys(possibleMoves).filter(key => possibleMoves[key])
    const response: MoveResponse = {
        move: safeMoves[Math.floor(Math.random() * safeMoves.length)],
    }

    console.log(`${gameState.game.id} MOVE ${gameState.turn}: ${response.move}`)
    return response
}
