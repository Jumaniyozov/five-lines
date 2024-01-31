const TILE_SIZE = 30
const FPS = 30
const SLEEP = 1000 / FPS

enum RawTile {
    AIR = 0,
    FLUX = 1,
    UNBREAKABLE = 2,
    PLAYER = 3,
    STONE = 4,
    FALLING_STONE = 5,
    BOX = 6,
    FALLING_BOX = 7,
    KEY1 = 8,
    LOCK1 = 9,
    KEY2 = 10,
    LOCK2 = 11
}

interface Tile {
    isAir(): boolean

    isFlux(): boolean

    isUnbreakable(): boolean

    isPlayer(): boolean

    isStone(): boolean

    isFallingStone(): boolean

    isBox(): boolean

    isFallingBox(): boolean

    isKey1(): boolean

    isLock1(): boolean

    isKey2(): boolean

    isLock2(): boolean

    draw(y: number, x: number, g: CanvasRenderingContext2D): void

    isEdible(): boolean

    isPushable(): boolean

    moveHorizontal(dx: number): void
}

class Air implements Tile {
    isAir(): boolean {
        return true
    }

    isFlux(): boolean {
        return false
    }

    isUnbreakable(): boolean {
        return false
    }

    isPlayer(): boolean {
        return false
    }

    isStone(): boolean {
        return false
    }

    isFallingStone(): boolean {
        return false
    }

    isBox(): boolean {
        return false
    }

    isFallingBox(): boolean {
        return false
    }

    isKey1(): boolean {
        return false
    }

    isLock1(): boolean {
        return false
    }

    isKey2(): boolean {
        return false
    }

    isLock2(): boolean {
        return false
    }

    isEdible() {
        return true
    }

    isPushable() {
        return false
    }

    draw(y: number, x: number, g: CanvasRenderingContext2D) {}

    moveHorizontal(dx: number) {
        moveToTile(playerx + dx, playery)
    }
}

class Flux implements Tile {
    isAir(): boolean {
        return false
    }

    isFlux(): boolean {
        return true
    }

    isUnbreakable(): boolean {
        return false
    }

    isPlayer(): boolean {
        return false
    }

    isStone(): boolean {
        return false
    }

    isFallingStone(): boolean {
        return false
    }

    isBox(): boolean {
        return false
    }

    isFallingBox(): boolean {
        return false
    }

    isKey1(): boolean {
        return false
    }

    isLock1(): boolean {
        return false
    }

    isKey2(): boolean {
        return false
    }

    isLock2(): boolean {
        return false
    }

    draw(y: number, x: number, g: CanvasRenderingContext2D) {
        g.fillStyle = '#ccffcc'
        g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
    }

    moveHorizontal(dx: number) {
        moveToTile(playerx + dx, playery)
    }

    isEdible() {
        return true
    }

    isPushable() {
        return false
    }
}

class Unbreakable implements Tile {
    isAir(): boolean {
        return false
    }

    isFlux(): boolean {
        return false
    }

    isUnbreakable(): boolean {
        return true
    }

    isPlayer(): boolean {
        return false
    }

    isStone(): boolean {
        return false
    }

    isFallingStone(): boolean {
        return false
    }

    isBox(): boolean {
        return false
    }

    isFallingBox(): boolean {
        return false
    }

    isKey1(): boolean {
        return false
    }

    isLock1(): boolean {
        return false
    }

    isKey2(): boolean {
        return false
    }

    isLock2(): boolean {
        return false
    }

    draw(y: number, x: number, g: CanvasRenderingContext2D): void {
        g.fillStyle = '#999999'
        g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
    }

    moveHorizontal(dx: number) {}

    isEdible() {
        return false
    }

    isPushable() {
        return false
    }
}

class Player implements Tile {
    isAir(): boolean {
        return false
    }

    isPlayer(): boolean {
        return true
    }

    isFlux() {
        return false
    }

    isUnbreakable() {
        return false
    }

    isStone() {
        return false
    }

    isFallingStone() {
        return false
    }

    isBox() {
        return false
    }

    isFallingBox() {
        return false
    }

    isKey1() {
        return false
    }

    isLock1() {
        return false
    }

    isKey2() {
        return false
    }

    isLock2() {
        return false
    }

    draw(y: number, x: number, g: CanvasRenderingContext2D): void {
        g.fillStyle = '#ff0000'
        g.fillRect(playerx * TILE_SIZE, playery * TILE_SIZE, TILE_SIZE, TILE_SIZE)
    }

    moveHorizontal(dx: number) {}

    isEdible() {
        return false
    }

    isPushable() {
        return false
    }
}

class Stone implements Tile {
    isAir(): boolean {
        return false
    }

    isPlayer(): boolean {
        return false
    }

    isFlux() {
        return false
    }

    isUnbreakable() {
        return false
    }

    isStone() {
        return true
    }

    isFallingStone() {
        return false
    }

    isBox() {
        return false
    }

    isFallingBox() {
        return false
    }

    isKey1() {
        return false
    }

    isLock1() {
        return false
    }

    isKey2() {
        return false
    }

    isLock2() {
        return false
    }

    draw(y: number, x: number, g: CanvasRenderingContext2D): void {
        g.fillStyle = '#0000cc'
        g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
    }

    moveHorizontal(dx: number) {
        if (map[playery][playerx + dx + dx].isAir() && !map[playery + 1][playerx + dx].isAir()) {
            map[playery][playerx + dx + dx] = this
            moveToTile(playerx + dx, playery)
        }
    }

    isEdible() {
        return false
    }

    isPushable() {
        return true
    }
}

class FallingStone implements Tile {
    isAir(): boolean {
        return false
    }

    isPlayer(): boolean {
        return false
    }

    isFlux() {
        return false
    }

    isUnbreakable() {
        return false
    }

    isStone() {
        return false
    }

    isFallingStone() {
        return true
    }

    isBox() {
        return false
    }

    isFallingBox() {
        return false
    }

    isKey1() {
        return false
    }

    isLock1() {
        return false
    }

    isKey2() {
        return false
    }

    isLock2() {
        return false
    }

    draw(y: number, x: number, g: CanvasRenderingContext2D): void {
        g.fillStyle = '#0000cc'
        g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
    }

    moveHorizontal(dx: number) {}

    isEdible() {
        return false
    }

    isPushable() {
        return false
    }
}

class Box implements Tile {
    isAir(): boolean {
        return false
    }

    isPlayer(): boolean {
        return false
    }

    isFlux() {
        return false
    }

    isUnbreakable() {
        return false
    }

    isStone() {
        return false
    }

    isFallingStone() {
        return false
    }

    isBox() {
        return true
    }

    isFallingBox() {
        return false
    }

    isKey1() {
        return false
    }

    isLock1() {
        return false
    }

    isKey2() {
        return false
    }

    isLock2() {
        return false
    }

    draw(y: number, x: number, g: CanvasRenderingContext2D): void {
        g.fillStyle = '#8b4513'
        g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
    }

    moveHorizontal(dx: number) {
        if (map[playery][playerx + dx + dx].isAir() && !map[playery + 1][playerx + dx].isAir()) {
            map[playery][playerx + dx + dx] = this
            moveToTile(playerx + dx, playery)
        }
    }

    isEdible() {
        return false
    }

    isPushable() {
        return true
    }
}

class FallingBox implements Tile {
    isAir(): boolean {
        return false
    }

    isPlayer(): boolean {
        return false
    }

    isFlux() {
        return false
    }

    isUnbreakable() {
        return false
    }

    isStone() {
        return false
    }

    isFallingStone() {
        return false
    }

    isBox() {
        return false
    }

    isFallingBox() {
        return true
    }

    isKey1() {
        return false
    }

    isLock1() {
        return false
    }

    isKey2() {
        return false
    }

    isLock2() {
        return false
    }

    isEdible() {
        return false
    }

    isPushable() {
        return false
    }

    moveHorizontal(dx: number) {}

    draw(y: number, x: number, g: CanvasRenderingContext2D): void {
        g.fillStyle = '#8b4513'
        g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
    }
}

class Key1 implements Tile {
    isAir(): boolean {
        return false
    }

    isPlayer(): boolean {
        return false
    }

    isFlux() {
        return false
    }

    isUnbreakable() {
        return false
    }

    isStone() {
        return false
    }

    isFallingStone() {
        return false
    }

    isBox() {
        return false
    }

    isFallingBox() {
        return false
    }

    isKey1() {
        return true
    }

    isLock1() {
        return false
    }

    isKey2() {
        return false
    }

    isLock2() {
        return false
    }

    isEdible() {
        return false
    }

    isPushable() {
        return false
    }

    draw(y: number, x: number, g: CanvasRenderingContext2D): void {
        g.fillStyle = '#ffcc00'
        g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
    }

    moveHorizontal(dx: number) {
        removeLock1()
        moveToTile(playerx + dx, playery)
    }
}

class Lock1 implements Tile {
    isAir(): boolean {
        return false
    }

    isPlayer(): boolean {
        return false
    }

    isFlux() {
        return false
    }

    isUnbreakable() {
        return false
    }

    isStone() {
        return false
    }

    isFallingStone() {
        return false
    }

    isBox() {
        return false
    }

    isFallingBox() {
        return false
    }

    isKey1() {
        return false
    }

    isLock1() {
        return true
    }

    isKey2() {
        return false
    }

    isLock2() {
        return false
    }

    draw(y: number, x: number, g: CanvasRenderingContext2D): void {
        g.fillStyle = '#ffcc00'
        g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
    }

    isEdible() {
        return false
    }

    isPushable() {
        return false
    }

    moveHorizontal(dx: number) {}
}

class Key2 implements Tile {
    isAir(): boolean {
        return false
    }

    isPlayer(): boolean {
        return false
    }

    isFlux() {
        return false
    }

    isUnbreakable() {
        return false
    }

    isStone() {
        return false
    }

    isFallingStone() {
        return false
    }

    isBox() {
        return false
    }

    isFallingBox() {
        return false
    }

    isKey1() {
        return false
    }

    isLock1() {
        return false
    }

    isKey2() {
        return true
    }

    isLock2() {
        return false
    }

    draw(y: number, x: number, g: CanvasRenderingContext2D): void {
        g.fillStyle = '#00ccff'
        g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
    }

    moveHorizontal(dx: number) {
        removeLock2()
        moveToTile(playerx + dx, playery)
    }

    isEdible() {
        return false
    }

    isPushable() {
        return false
    }
}

class Lock2 implements Tile {
    isAir(): boolean {
        return false
    }

    isPlayer(): boolean {
        return false
    }

    isFlux() {
        return false
    }

    isUnbreakable() {
        return false
    }

    isStone() {
        return false
    }

    isFallingStone() {
        return false
    }

    isBox() {
        return false
    }

    isFallingBox() {
        return false
    }

    isKey1() {
        return false
    }

    isLock1() {
        return false
    }

    isKey2() {
        return false
    }

    isLock2() {
        return true
    }

    draw(y: number, x: number, g: CanvasRenderingContext2D): void {
        g.fillStyle = '#00ccff'
        g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
    }

    moveHorizontal(dx: number) {}

    isEdible() {
        return false
    }

    isPushable() {
        return false
    }
}

interface Input {
    handle(): void
}

class Right implements Input {
    handle() {
        map[playery][playerx + 1].moveHorizontal(1)
    }
}

class Left implements Input {
    handle() {
        map[playery][playerx + -1].moveHorizontal(-1)
    }
}

class Up implements Input {
    handle() {
        moveVertical(-1)
    }
}

class Down implements Input {
    handle() {
        moveVertical(1)
    }
}

let playerx = 1
let playery = 1
const rawMap: RawTile[][] = [
    [2, 2, 2, 2, 2, 2, 2, 2],
    [2, 3, 0, 1, 1, 2, 0, 2],
    [2, 4, 2, 6, 1, 2, 0, 2],
    [2, 8, 4, 1, 1, 2, 0, 2],
    [2, 4, 1, 1, 1, 9, 0, 2],
    [2, 2, 2, 2, 2, 2, 2, 2]
]

let map: Tile[][]

function assertExhausted(x: never): never {
    throw new Error(`Unexpected object: ${x}`)
}

function transformTile(tile: RawTile) {
    switch (tile) {
        case RawTile.AIR:
            return new Air()
        case RawTile.PLAYER:
            return new Player()
        case RawTile.UNBREAKABLE:
            return new Unbreakable()
        case RawTile.STONE:
            return new Stone()
        case RawTile.FALLING_STONE:
            return new FallingStone()
        case RawTile.BOX:
            return new Box()
        case RawTile.FALLING_BOX:
            return new FallingBox()
        case RawTile.FLUX:
            return new Flux()
        case RawTile.KEY1:
            return new Key1()
        case RawTile.LOCK1:
            return new Lock1()
        case RawTile.KEY2:
            return new Key2()
        case RawTile.LOCK2:
            return new Lock2()
        default:
            assertExhausted(tile)
    }
}

function transformMap() {
    map = new Array(rawMap.length)
    for (let y = 0; y < rawMap.length; y++) {
        map[y] = new Array(rawMap[y].length)
        for (let x = 0; x < rawMap[y].length; x++) {
            map[y][x] = transformTile(rawMap[y][x])
        }
    }
}

const inputs: Input[] = []

function removeLock1() {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x].isLock1()) {
                map[y][x] = new Air()
            }
        }
    }
}

function removeLock2() {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x].isLock2()) {
                map[y][x] = new Air()
            }
        }
    }
}

function moveToTile(newx: number, newy: number) {
    map[playery][playerx] = new Air()
    map[newy][newx] = new Player()
    playerx = newx
    playery = newy
}

function moveVertical(dy: number) {
    if (map[playery + dy][playerx].isFlux() || map[playery + dy][playerx].isAir()) {
        moveToTile(playerx, playery + dy)
    } else if (map[playery + dy][playerx].isKey1()) {
        removeLock1()
        moveToTile(playerx, playery + dy)
    } else if (map[playery + dy][playerx].isKey2()) {
        removeLock2()
        moveToTile(playerx, playery + dy)
    }
}

function handleInputs() {
    while (inputs.length > 0) {
        const current = inputs.pop()
        current.handle()
    }
}

function updateTile(y: number, x: number) {
    if ((map[y][x].isStone() || map[y][x].isFallingStone()) && map[y + 1][x].isAir()) {
        map[y + 1][x] = new FallingStone()
        map[y][x] = new Air()
    } else if ((map[y][x].isBox() || map[y][x].isFallingBox()) && map[y + 1][x].isAir()) {
        map[y + 1][x] = new FallingBox()
        map[y][x] = new Air()
    } else if (map[y][x].isFallingStone()) {
        map[y][x] = new Stone()
    } else if (map[y][x].isFallingBox()) {
        map[y][x] = new Box()
    }
}

function updateMap() {
    for (let y = map.length - 1; y >= 0; y--) {
        for (let x = 0; x < map[y].length; x++) {
            updateTile(y, x)
        }
    }
}

function update() {
    handleInputs()
    updateMap()
}

function drawMap(g: CanvasRenderingContext2D) {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            map[y][x].draw(y, x, g)
        }
    }
}

function drawPlayer(g: CanvasRenderingContext2D) {
    g.fillStyle = '#ff0000'
    g.fillRect(playerx * TILE_SIZE, playery * TILE_SIZE, TILE_SIZE, TILE_SIZE)
}

function createGraphics() {
    const canvas = document.getElementById('GameCanvas') as HTMLCanvasElement
    const g = canvas.getContext('2d')
    g.clearRect(0, 0, canvas.width, canvas.height)
    return g
}

function draw() {
    const g = createGraphics()
    drawMap(g)
    drawPlayer(g)
}

function gameLoop() {
    const before = Date.now()
    update()
    draw()
    const after = Date.now()
    const frameTime = after - before
    const sleep = SLEEP - frameTime
    setTimeout(() => gameLoop(), sleep)
}

window.onload = () => {
    transformMap()
    gameLoop()
}

const LEFT_KEY = 'ArrowLeft'
const UP_KEY = 'ArrowUp'
const RIGHT_KEY = 'ArrowRight'
const DOWN_KEY = 'ArrowDown'
window.addEventListener('keydown', (e) => {
    if (e.key === LEFT_KEY || e.key === 'a') inputs.push(new Left())
    else if (e.key === UP_KEY || e.key === 'w') inputs.push(new Up())
    else if (e.key === RIGHT_KEY || e.key === 'd') inputs.push(new Right())
    else if (e.key === DOWN_KEY || e.key === 's') inputs.push(new Down())
})
