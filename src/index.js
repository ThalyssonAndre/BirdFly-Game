console.log("A engrenagem está girando!")

const sprites = new Image ()
sprites.src = "./src/sprites.png"

const soundGameOver = new Audio()
soundGameOver.src = "./src/effects/gameover.wav"

const canvas = document.querySelector("canvas")
const context = canvas.getContext("2d")

let frames = 0

function colision (birdPerson, ground) {
    const birdY = birdPerson.localCanvasY + birdPerson.heightBird
    const groundY = ground.localCanvasY

    if (birdY >= groundY) {
        return true
    }

    return false
}

function createBird() {
    const birdPerson = {
        spriteX: 0,
        spriteY: 0,
        widthBird: 33,
        heightBird: 24,
        localCanvasX: 10,
        localCanvasY: 50,
        birdJump: 2.5,
        velocity: 0,
        gravity: 0.05,
    
        jump() {
            birdPerson.velocity = - birdPerson.birdJump
        },
        
        refresh(){
            if(colision(birdPerson, global.ground)) {
                soundGameOver.play()

                setTimeout (() => {
                    changeWindow(windows.start)
                }, 500)
    
                return
            }
    
            birdPerson.velocity += birdPerson.gravity
            birdPerson.localCanvasY += birdPerson.velocity
        },
        animationBird: [
            {spriteX: 0, spriteY: 0},
            {spriteX: 0, spriteY: 26},
            {spriteX: 0, spriteY: 52},
        ],
        
        actualFrame: 0,
        refreshFrame() {
            const intervalFrames = 20
            const changeInterval = frames % intervalFrames === 0
            if (changeInterval) {
                const baseAdd = 1
                const add = baseAdd + birdPerson.actualFrame
                const baseRep = birdPerson.animationBird.length
                birdPerson.actualFrame = add % baseRep
            }
        },
        drawBird () {
            birdPerson.refreshFrame()
            const {spriteX, spriteY} = birdPerson.animationBird[birdPerson.actualFrame]
            context.drawImage(
                sprites,
                spriteX, spriteY, // sx, sy
                birdPerson.widthBird, birdPerson.heightBird, // corte da imagem
                birdPerson.localCanvasX, birdPerson.localCanvasY, // local no canvas
                birdPerson.widthBird, birdPerson.heightBird, // tamanho no canvas
            )
        }
    }
    return birdPerson
}

function createGround() {
    const ground = {
        spriteX: 0,
        spriteY: 610,
        widthGround: 224,
        heightGround: 112,
        localCanvasX: 0,
        localCanvasY: canvas.height - 112,
        refresh() {
            const moveGround = 0.5
            const repeat = ground.widthGround / 2
            const moviment = ground.localCanvasX - moveGround
    
            ground.localCanvasX = moviment % repeat
        },
        drawGround () {
            context.drawImage(
                sprites,
                ground.spriteX, ground.spriteY, // sx, sy
                ground.widthGround, ground.heightGround, // corte da imagem
                ground.localCanvasX, ground.localCanvasY, // local no canvas
                ground.widthGround, ground.heightGround, // tamanho no canvas
            )
    
            context.drawImage(
                sprites,
                ground.spriteX, ground.spriteY, // sx, sy
                ground.widthGround, ground.heightGround, // corte da imagem
                (ground.localCanvasX + ground.widthGround), ground.localCanvasY, // local no canvas
                ground.widthGround, ground.heightGround, // tamanho no canvas
            )
        }
    }
    return ground
}


const backGround = {
    spriteX: 390,
    spriteY: 0,
    widthBackGround: 275,
    heightBackGround: 204,
    localCanvasX: 0,
    localCanvasY: canvas.height - 204,

    drawBackGround () {
        context.fillStyle = "#70c5ce"
        context.fillRect(0,0, canvas.width, canvas.height)

        context.drawImage(
            sprites,
            backGround.spriteX, backGround.spriteY, // sx, sy
            backGround.widthBackGround, backGround.heightBackGround, // corte da imagem
            backGround.localCanvasX, backGround.localCanvasY, // local no canvas
            backGround.widthBackGround, backGround.heightBackGround, // tamanho no canvas
        )

        context.drawImage(
            sprites,
            backGround.spriteX, backGround.spriteY, // sx, sy
            backGround.widthBackGround, backGround.heightBackGround, // corte da imagem
            (backGround.localCanvasX + backGround.widthBackGround), backGround.localCanvasY, // local no canvas
            backGround.widthBackGround, backGround.heightBackGround, // tamanho no canvas
        )
    }
}

const initialWindow = {
    spriteX: 134,
    spriteY: 0,
    widthInitialWindow: 174,
    heightInitialWindow: 152,
    localCanvasX: (canvas.width / 2) - 174 / 2,
    localCanvasY: 50,

    drawInitialWindow () {
        context.drawImage(
            sprites,
            initialWindow.spriteX, initialWindow.spriteY, // sx, sy
            initialWindow.widthInitialWindow, initialWindow.heightInitialWindow, // corte da imagem
            initialWindow.localCanvasX, initialWindow.localCanvasY, // local no canvas
            initialWindow.widthInitialWindow, initialWindow.heightInitialWindow, // tamanho no canvas
        )
    }
}

const global = {}
let activeWindow = {}

function changeWindow(newWindow) {
    activeWindow = newWindow

    if(activeWindow.inicialization()) {
        inicialization()
    }
}

const windows = {
    start: {
        inicialization() {
            global.birdPerson = createBird()
            global.ground = createGround()
        },
        draw() {
            backGround.drawBackGround()
            global.ground.drawGround()
            global.birdPerson.drawBird()
            initialWindow.drawInitialWindow()
        },
        click() {
        changeWindow(windows.game)
        },
        refresh() {
            global.ground.refresh()
        },
    },
    game: {
        draw() {
            backGround.drawBackGround()
            global.ground.drawGround()
            global.birdPerson.drawBird()
        },
        click() {
            global.birdPerson.jump()
        },
        refresh() {
            global.birdPerson.refresh()
            global.ground.refresh()
        },
    }
}

function loop() {
    activeWindow.draw()
    activeWindow.refresh()

    frames += 1
    requestAnimationFrame(loop)
}

window.addEventListener("click", ()=>{
    if(activeWindow.click){
        activeWindow.click()
    }
})

changeWindow(windows.start)

loop()