import { Input, Scene } from 'phaser'
import { EventBus } from '../EventBus'

const GROUND_HEIGHT = 78
const BASIC_PIXEL = 50
const GRAVITY = 2000

export class Game extends Scene {
  background!: Phaser.GameObjects.TileSprite
  camera!: Phaser.Cameras.Scene2D.Camera
  player!: Phaser.Physics.Arcade.Image
  stage!: Obstacle[]

  cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  jumpButton!: Phaser.Input.Keyboard.Key
  jumpCount: number

  goalX!: number
  STAGE_WIDTH!: number

  constructor() {
    super('Game')
    this.jumpCount = 0
  }

  init(): void {
    process.env.NEXT_PUBLIC_DEBUG === 'true' && this.physics.world.createDebugGraphic()
    this.physics.world.setBounds(0, 0, this.scale.width, this.scale.height)
    this.camera = this.cameras.main

    // configure keyboard input
    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys()
      this.jumpButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }

    // Load stage data
    const { obstacles } = this.cache.json.get('obstacles-2')
    this.stage = obstacles
    this.STAGE_WIDTH = this.stage[this.stage.length - 1].x + 1000
    this.goalX = this.STAGE_WIDTH - 200
    this.camera.setBounds(0, 0, this.STAGE_WIDTH, this.scale.height)
    this.physics.world.setBounds(0, 0, this.STAGE_WIDTH, this.scale.height)
  }

  create(): void {
    this.setBg()

    this.generatePlayer()
    this.camera.startFollow(this.player, true)

    this.fillTiles()
    this.setupStage()

    EventBus.emit('current-scene-ready', this)
  }

  update(): void {
    this.setupGameLogic()
  }

  setBg(): void {
    // get screen size
    const { width, height } = this.scale
    const originalImage = this.textures.get('background').getSourceImage()

    this.background = this.add
      .tileSprite(this.scale.width / 2, this.scale.height / 2, width, height, 'background')
      .setScrollFactor(0)

    // Resized and centered
    this.background.setDisplaySize(width, height)
    this.background.setTileScale(width / originalImage.width, height / originalImage.height)

    // scroll background
    this.background.tilePositionX += 4
  }

  generatePlayer() {
    const initialPosX = 100
    const originalImage = this.textures.get('player').getSourceImage()

    this.player = this.physics.add
      .sprite(initialPosX, this.camera.height - GROUND_HEIGHT - 60, 'player')
      .setScale(BASIC_PIXEL / originalImage.width)
      .setCollideWorldBounds(true)
      .setGravityY(GRAVITY)
  }

  fillTiles() {
    for (let x = 0; x < this.STAGE_WIDTH; x += BASIC_PIXEL) {
      const tile = this.generateAsset(x, this.camera.height - BASIC_PIXEL / 2, 'tiles')
      this.physics.add.collider(this.player, tile)
    }
  }

  generateAsset(x: number, y: number, type: string) {
    const originalImage = this.textures.get(type).getSourceImage()
    return this.physics.add
      .sprite(x, y, type)
      .setScale(BASIC_PIXEL / originalImage.width) // resize to set sprite width to BASIC_PIXEL
      .setImmovable(true)
  }

  setupStage() {
    const bufferHeight = 70
    this.stage.forEach((ele) => {
      const asset = this.generateAsset(ele.x, this.scale.height - ele.y - bufferHeight, ele.type)
      if (ele.type === 'spike') {
        this.physics.add.collider(this.player, asset, () => this.gameOver())
      } else {
        this.physics.add.collider(this.player, asset)
      }
    })
  }

  setupGameLogic() {
    const speed = 340
    this.player.setVelocityX(speed)

    if (Input.Keyboard.JustDown(this.jumpButton) && this.jumpCount < 1) {
      this.player.setVelocityY(-700)
      this.jumpCount++
    }

    this.input.once('pointerdown', () => {
      if (this.jumpCount < 1) {
        this.player.setVelocityY(-700)
        this.jumpCount++
      }
    })

    // 地面に触れたときにジャンプカウントをリセット
    if (this.player.body?.touching.down) {
      this.jumpCount = 0
    }

    if (this.player.x > this.goalX) {
      this.scene.pause()
      EventBus.emit('game-clear')
    }
  }

  gameOver() {
    // ゲームオーバーの処理
    this.physics.pause() // 物理エンジンを停止
    this.player.setTint(0xff0000) // プレイヤーを赤く表示

    const timeout = setTimeout(() => {
      EventBus.emit('game-over')
      this.scene.pause() // シーンを一時停止
    }, 200)

    clearTimeout(timeout)
  }
}
