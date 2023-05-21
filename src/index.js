console.log("A engrenagem está girando!")

const sprites = new Image ()
sprites.src = "./src/sprites.png"

const canvas = document.querySelector("canvas")
const context = canvas.getContext("2d")

const birdPerson = {
    spriteX: 0,
    spriteY: 0,
    widthBird: 33,
    heightBird: 24,
    localCanvasX: 10,
    localCanvasY: 50,
    velocity: 0,
    gravity: 0.25,
    
    refresh(){
        birdPerson.velocity += birdPerson.gravity
        birdPerson.localCanvasY += birdPerson.velocity
    },

    drawBird () {
        context.drawImage(
            sprites,
            birdPerson.spriteX, birdPerson.spriteY, // sx, sy
            birdPerson.widthBird, birdPerson.heightBird, // corte da imagem
            birdPerson.localCanvasX, birdPerson.localCanvasY, // local no canvas
            birdPerson.widthBird, birdPerson.heightBird, // tamanho no canvas
        )
    }
}

const ground = {
    spriteX: 0,
    spriteY: 610,
    widthGround: 224,
    heightGround: 112,
    localCanvasX: 0,
    localCanvasY: canvas.height - 112,

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

function loop() {
    birdPerson.refresh()
    backGround.drawBackGround()
    ground.drawGround()
    birdPerson.drawBird()


    requestAnimationFrame(loop)
}

loop()