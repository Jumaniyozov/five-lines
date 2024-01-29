const TILE_SIZE = 30;
const FPS = 30;
const SLEEP = 1000 / FPS;

enum Tile {
    AIR,
    FLUX,
    UNBREAKABLE,
    PLAYER,
    STONE, FALLING_STONE,
    BOX, FALLING_BOX,
    KEY1, LOCK1,
    KEY2, LOCK2
}


interface Input {
    isRight(): boolean;

    isLeft(): boolean;

    isUp(): boolean;

    isDown(): boolean;
}

class Right implements Input {
    isRight() {
        return true;
    }

    isLeft() {
        return false;
    }

    isUp() {
        return false;
    }

    isDown() {
        return false;
    }
}

class Left implements Input {
    isRight() {
        return false;
    }

    isLeft() {
        return true;
    }

    isUp() {
        return false;
    }

    isDown() {
        return false;
    }
}

class Up implements Input {
    isRight() {
        return false;
    }

    isLeft() {
        return false;
    }

    isUp() {
        return true;
    }

    isDown() {
        return false;
    }
}

class Down implements Input {
    isRight() {
        return false;
    }

    isLeft() {
        return false;
    }

    isUp() {
        return false;
    }

    isDown() {
        return true;
    }
}

let playerx = 1;
let playery = 1;
let map: Tile[][] = [
    [2, 2, 2, 2, 2, 2, 2, 2],
    [2, 3, 0, 1, 1, 2, 0, 2],
    [2, 4, 2, 6, 1, 2, 0, 2],
    [2, 8, 4, 1, 1, 2, 0, 2],
    [2, 4, 1, 1, 1, 9, 0, 2],
    [2, 2, 2, 2, 2, 2, 2, 2],
];

let inputs: Input[] = [];

function remove(tile: Tile) {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] === tile) {
                map[y][x] = Tile.AIR;
            }
        }
    }
}

function moveToTile(newx: number, newy: number) {
    map[playery][playerx] = Tile.AIR;
    map[newy][newx] = Tile.PLAYER;
    playerx = newx;
    playery = newy;
}

function moveHorizontal(dx: number) {
    if (map[playery][playerx + dx] === Tile.FLUX
        || map[playery][playerx + dx] === Tile.AIR) {
        moveToTile(playerx + dx, playery);
    } else if ((map[playery][playerx + dx] === Tile.STONE
            || map[playery][playerx + dx] === Tile.BOX)
        && map[playery][playerx + dx + dx] === Tile.AIR
        && map[playery + 1][playerx + dx] !== Tile.AIR) {
        map[playery][playerx + dx + dx] = map[playery][playerx + dx];
        moveToTile(playerx + dx, playery);
    } else if (map[playery][playerx + dx] === Tile.KEY1) {
        remove(Tile.LOCK1);
        moveToTile(playerx + dx, playery);
    } else if (map[playery][playerx + dx] === Tile.KEY2) {
        remove(Tile.LOCK2);
        moveToTile(playerx + dx, playery);
    }
}

function moveVertical(dy: number) {
    if (map[playery + dy][playerx] === Tile.FLUX
        || map[playery + dy][playerx] === Tile.AIR) {
        moveToTile(playerx, playery + dy);
    } else if (map[playery + dy][playerx] === Tile.KEY1) {
        remove(Tile.LOCK1);
        moveToTile(playerx, playery + dy);
    } else if (map[playery + dy][playerx] === Tile.KEY2) {
        remove(Tile.LOCK2);
        moveToTile(playerx, playery + dy);
    }
}

function handleInput(input: Input) {
    if (input.isLeft())
        moveHorizontal(-1);
    else if (input.isRight())
        moveHorizontal(1);
    else if (input.isUp())
        moveVertical(-1);
    else if (input.isDown())
        moveVertical(1);
}

function handleInputs() {
    while (inputs.length > 0) {
        let current = inputs.pop();
        handleInput(current);
    }
}

function updateTile(y: number, x: number) {
    const tmp = map[y][x];
    let nextTmp = map[y + 1][x];
    if ((tmp === Tile.STONE || tmp === Tile.FALLING_STONE) && nextTmp === Tile.AIR) {
        map[y + 1][x] = Tile.FALLING_STONE;
        map[y][x] = Tile.AIR;
    } else if ((tmp === Tile.BOX || tmp === Tile.FALLING_BOX)
        && nextTmp === Tile.AIR) {
        map[y + 1][x] = Tile.FALLING_BOX;
        map[y][x] = Tile.AIR;
    } else if (tmp === Tile.FALLING_STONE) {
        map[y][x] = Tile.STONE;
    } else if (tmp === Tile.FALLING_BOX) {
        map[y][x] = Tile.BOX;
    }
}

function updateMap() {
    for (let y = map.length - 1; y >= 0; y--) {
        for (let x = 0; x < map[y].length; x++) {
            updateTile(y, x);
        }
    }
}

function update() {
    handleInputs();
    updateMap();
}

function drawMap(g: CanvasRenderingContext2D) {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            const tmp = map[y][x];
            if (tmp === Tile.FLUX)
                g.fillStyle = "#ccffcc";
            else if (tmp === Tile.UNBREAKABLE)
                g.fillStyle = "#999999";
            else if (tmp === Tile.STONE || tmp === Tile.FALLING_STONE)
                g.fillStyle = "#0000cc";
            else if (tmp === Tile.BOX || tmp === Tile.FALLING_BOX)
                g.fillStyle = "#8b4513";
            else if (tmp === Tile.KEY1 || tmp === Tile.LOCK1)
                g.fillStyle = "#ffcc00";
            else if (tmp === Tile.KEY2 || tmp === Tile.LOCK2)
                g.fillStyle = "#00ccff";

            if (tmp !== Tile.AIR && tmp !== Tile.PLAYER)
                g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }
    }
}

function drawPlayer(g: CanvasRenderingContext2D) {
    g.fillStyle = "#ff0000";
    g.fillRect(playerx * TILE_SIZE, playery * TILE_SIZE, TILE_SIZE, TILE_SIZE);
}

function createGraphics() {
    let canvas = document.getElementById("GameCanvas") as HTMLCanvasElement;
    let g = canvas.getContext("2d");
    g.clearRect(0, 0, canvas.width, canvas.height);
    return g
}

function draw() {
    let g = createGraphics();
    drawMap(g);
    drawPlayer(g);
}

function gameLoop() {
    let before = Date.now();
    update();
    draw();
    let after = Date.now();
    let frameTime = after - before;
    let sleep = SLEEP - frameTime;
    setTimeout(() => gameLoop(), sleep);
}

window.onload = () => {
    gameLoop();
}

const LEFT_KEY = "ArrowLeft";
const UP_KEY = "ArrowUp";
const RIGHT_KEY = "ArrowRight";
const DOWN_KEY = "ArrowDown";
window.addEventListener("keydown", e => {
    if (e.key === LEFT_KEY || e.key === "a") inputs.push(new Left());
    else if (e.key === UP_KEY || e.key === "w") inputs.push(new Up());
    else if (e.key === RIGHT_KEY || e.key === "d") inputs.push(new Right());
    else if (e.key === DOWN_KEY || e.key === "s") inputs.push(new Down());
});
