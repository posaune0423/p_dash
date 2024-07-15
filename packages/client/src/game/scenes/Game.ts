import { Input, Scene } from 'phaser'
import { EventBus } from '../EventBus'
import { GROUND_HEIGHT, BASIC_PIXEL, GRAVITY } from '@/constants'
import { env } from '@/env'

export class Game extends Scene {
  background!: Phaser.GameObjects.TileSprite
  camera!: Phaser.Cameras.Scene2D.Camera
  player!: Phaser.Physics.Arcade.Image
  tiles: Phaser.Physics.Arcade.Sprite[]
  stage!: Obstacle[]
  distanceText!: Phaser.GameObjects.Text

  cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  jumpButton!: Phaser.Input.Keyboard.Key

  goalX!: number
  STAGE_WIDTH!: number
  preparationWidth = 1200

  constructor() {
    super('Game')
    this.tiles = []
  }

  init(): void {
    env.NEXT_PUBLIC_DEBUG && this.physics.world.createDebugGraphic()
    this.physics.world.setBounds(0, 0, this.scale.width, this.scale.height)
    this.camera = this.cameras.main

    // configure keyboard input
    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys()
      this.jumpButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }

    // Load stage data
    const { obstacles } = this.cache.json.get('obstacles')
    this.stage = obstacles

    this.STAGE_WIDTH = this.stage[this.stage.length - 1].x + this.preparationWidth * 2

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

    this.input.addPointer(2)

    this.distanceText = this.add
      .text(28, 28, '0M', {
        font: '18px Silkscreen',
        color: '#ffffff',
      })
      .setScrollFactor(0)

    this.sound.play('main-bgm', { loop: true })

    EventBus.emit('current-scene-ready', this)
  }

  update(): void {
    if (env.NEXT_PUBLIC_DEBUG) {
      this.setupDebug()
    } else {
      this.setupGameLogic()
    }
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
      this.tiles.push(tile)
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
      // 助走期間
      const x = ele.x + this.preparationWidth

      if (ele.type === 'null') {
        this.tiles.forEach((tile) => {
          if (tile.x === x) {
            tile.destroy()
          }
        })
        return
      }
      const asset = this.generateAsset(x, this.scale.height - ele.y - bufferHeight, ele.type)
      if (ele.type === 'spike') {
        asset.setBodySize(asset.width * 0.8, asset.height * 0.8)

        this.physics.add.collider(this.player, asset, () => this.gameOver())
      } else if (ele.type === 'block') {
        this.physics.add.collider(this.player, asset, () => {
          if (this.player.body?.touching.right && asset.body.touching.left) {
            this.gameOver()
          }
        })
      } else {
        this.physics.add.collider(this.player, asset)
      }
    })
  }

  setupGameLogic() {
    const speed = 340
    this.player.setVelocityX(speed)
    this.background.tilePositionX += 5

    if (Input.Keyboard.JustDown(this.jumpButton)) {
      if (this.player.body?.touching.down) {
        this.player.setVelocityY(-700)
      }
    }

    if (this.input.pointer1.isDown) {
      if (this.player.body?.touching.down) {
        this.player.setVelocityY(-700)
      }
    }

    const distanceInMeters = Math.floor(this.player.x / 100) // Assuming 100 pixels = 1 meter
    this.distanceText.setText(`${distanceInMeters}M`)

    if (this.player.x > this.goalX) {
      this.scene.pause()
      this.sound.stopByKey('main-bgm')
      this.sound.play('clear')
      const playResult = {
        distance: Math.floor(this.player.x / 100),
      }
      setTimeout(() => {
        EventBus.emit('game-clear', playResult)
      }, 1000)
    }
  }

  setupDebug() {
    const speed = 340
    this.background.tilePositionX += 5

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-340)
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(340)
    } else {
      this.player.setVelocityX(0)
    }

    if (Input.Keyboard.JustDown(this.jumpButton)) {
      this.player.setVelocityY(-700)
    }

    if (this.input.pointer1.isDown) {
      if (this.input.activePointer.x < this.scale.width / 2) {
        this.player.setVelocityX(speed)
      }
    }

    if (this.input.pointer2.isDown) {
      if (this.input.activePointer.x > this.scale.width / 2) {
        this.player.setVelocityY(-700)
      }
    }

    if (this.player.x > this.goalX) {
      this.scene.pause()
      this.sound.stopByKey('main-bgm')
      this.sound.play('clear')
      const playResult = {
        distance: Math.floor(this.player.x / 100),
      }
      setTimeout(() => {
        EventBus.emit('game-clear', playResult)
      }, 1000)
    }
  }

  gameOver() {
    // game over
    this.physics.pause() // stop physics engine
    this.player.setTint(0xff0000) // make player red
    this.scene.pause() // pause scene
    this.sound.stopByKey('main-bgm')
    this.sound.play('dead')

    const playResult = {
      distance: Math.floor(this.player.x / 100),
    }

    setTimeout(() => {
      EventBus.emit('game-over', playResult)
    }, 1000)
  }
}
