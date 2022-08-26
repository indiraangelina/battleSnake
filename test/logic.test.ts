import { info, move, calculateNewHead, distanceToFood } from '../src/logic'
import { Battlesnake, Coord, GameState, MoveResponse } from '../src/types';

function createGameState(me: Battlesnake): GameState {
    return {
        game: {
            id: "",
            ruleset: {
                name: "",
                version: "",
                settings: {
                   foodSpawnChance: 0.1,
                   hazardDamagePerTurn: 1,
                   hazardMap: "", 
                   hazardMapAuthor: "",
                   minimumFood: 1,
                   royale: {
                    shrinkEveryNTurns: 0,
                   },
                   squad: {
                    allowBodyCollisions: false,
                    sharedElimination: false,
                    sharedHealth: false,
                    sharedLength: false,
                   },
                },
            },
            source: "",
            timeout: 0
        },
        turn: 0,
        board: {
            height: 0,
            width: 0,
            food: [],
            snakes: [me],
            hazards: []
        },
        you: me
    }
}

function createBattlesnake(id: string, body: Coord[]): Battlesnake {
    return {
        id: id,
        name: id,
        health: 0,
        body: body,
        latency: "",
        head: body[0],
        length: body.length,
        shout: "",
        squad: "",
        customizations: {
            color: "",
            head: "",
            tail: "",
        },
    }
}


describe('Battlesnake API Version', () => {
    it('should be api version 1', () => {
        const result = info()
        expect(result.apiversion).toBe("1")
    })
})

describe('Battlesnake Moves', () => {
    it('it can calculate the distance between snake and food', () => {
        let calculatedDistance = distanceToFood(
            {x: 7, y: 8},
            {x: 2, y: 1}
        );
        expect(calculatedDistance).toBe(12);

        calculatedDistance = distanceToFood(
            {x: 2, y: 1},
            {x: 7, y: 8}
        );
        expect(calculatedDistance).toBe(12);

    })
    it('it can calculate the new head position', () => {
        let calculatedResult = calculateNewHead(
            {x: 4, y: 5},
            "left"
        );
        expect(calculatedResult.y).toBe(5);
        expect(calculatedResult.x).toBe(3);

        calculatedResult = calculateNewHead(
            {x: 13, y: 7},
            "left"
        );
        expect(calculatedResult.y).toBe(7);
        expect(calculatedResult.x).toBe(12);

        calculatedResult = calculateNewHead(
            {x: 4, y: 5},
            "right"
        );
        expect(calculatedResult.y).toBe(5);
        expect(calculatedResult.x).toBe(5);

        calculatedResult = calculateNewHead(
            {x: 4, y: 5},
            "up"
        );
        expect(calculatedResult.y).toBe(6);
        expect(calculatedResult.x).toBe(4);

        calculatedResult = calculateNewHead(
            {x: 4, y: 5},
            "down"
        );
        expect(calculatedResult.y).toBe(4);
        expect(calculatedResult.x).toBe(4);
    })

    it('should never move into its own neck', () => {
        // Arrange
        const me = createBattlesnake("me", [{ x: 2, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 0 }])
        const gameState = createGameState(me)

        // Act 1,000x (this isn't a great way to test, but it's okay for starting out)
        for (let i = 0; i < 1000; i++) {
            const moveResponse: MoveResponse = move(gameState)
            // In this state, we should NEVER move left.
            const allowedMoves = ["up", "down", "right"]
            expect(allowedMoves).toContain(moveResponse.move)
        }
    })
})
