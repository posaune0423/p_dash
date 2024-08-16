import { Input, Scene } from 'phaser'
import { EventBus } from '../EventBus'
import { GROUND_HEIGHT, BASIC_PIXEL, GRAVITY, SPEED_X, JUMP_SPEED_Y, PREPARATION_WIDTH, BUFFER_HEIGHT} from '@/constants'
import { env } from '@/env'

export class Game extends Scene {
  background!: Phaser.GameObjects.TileSprite
  camera!: Phaser.Cameras.Scene2D.Camera
  player!: Phaser.Physics.Arcade.Image
  tiles: Phaser.Physics.Arcade.Sprite[]
  stage!: Obstacle[]
  distanceText!: Phaser.GameObjects.Text
  playerInteractions: {
    action: 'jump' | 'touch'
    // frame: number
    x: number
    y: number
  }[]
  playerHistory: {
    frame: number
    x: number
    y: number
    vx: number
    vy: number
  }[]
  jumpStartX!: number | null
  isLanding!: boolean

  cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  jumpButton!: Phaser.Input.Keyboard.Key

  goalX!: number
  STAGE_WIDTH!: number

  config_for_noir!: {
    height: number // height of the game screen
    bufferHeight: number
    preparationWidth: number
    gravity: number
    speedX: number
    jump_speed_y: number
  }

  constructor() {
    super('Game')
    this.tiles = []
    this.playerInteractions = []
    this.playerHistory = []
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

    this.STAGE_WIDTH = this.stage[this.stage.length - 1].x + PREPARATION_WIDTH * 2

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

    this.playerHistory.push({
      frame: this.game.getFrame(),
      x: this.player.x,
      y: this.player.y,
      vx: this!.player!.body!.velocity.x,
      vy: this!.player!.body!.velocity.y,
    })

    // console.log("Player info");
    // console.log("frame: " + this.game.getFrame());
    // console.log("x: " + this.player.x);
    // console.log("y: " + this.player.y);
    // console.log(this.player.data);
    // console.log(this.player.body);
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
    // const bufferHeight = 70
    this.stage.forEach((ele) => {
      // 助走期間
      const x = ele.x + PREPARATION_WIDTH

      if (ele.type === 'null') {
        this.tiles.forEach((tile) => {
          if (tile.x === x) {
            tile.destroy()
          }
        })
        return
      }
      const asset = this.generateAsset(x, this.scale.height - ele.y - BUFFER_HEIGHT, ele.type)
      console.log("Asset info: x->"+ ele.x + " y->" + ele.y + " scale_h->" + this.scale.height + " buf_h->" + BUFFER_HEIGHT);
      console.log("asset info: w->" + asset.width + " h->" + asset.height);
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
    // const speed = SPEED_X
    this.player.setVelocityX(SPEED_X)
    this.background.tilePositionX += 5

    if (Input.Keyboard.JustDown(this.jumpButton)) {
      if (this.player.body?.touching.down) {
        this.player.setVelocityY(JUMP_SPEED_Y)
        this.jumpStartX = this.player.x;  // Store the start position of the jump
        this.playerInteractions.push({
          action: 'jump',
          // frame: this.game.getFrame(),
          x: this.player.x,
          y: this.player.y,
        })
      }
    }

    if (this.input.pointer1.isDown) {
      if (this.player.body?.touching.down) {
        this.player.setVelocityY(JUMP_SPEED_Y)
        this.jumpStartX = this.player.x;  // Store the start position of the jump
        this.playerInteractions.push({
          action: 'jump',
          // frame: this.game.getFrame(),
          x: this.player.x,
          y: this.player.y,
        })
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
        interactions: this.playerInteractions,
      }
      console.log("Player History");
      console.log(this.playerHistory);
      console.log("this.scale.height: " + this.scale.height);
      console.log("Buffer Height: " + BUFFER_HEIGHT);
      console.log("Gravity: " + GRAVITY);
      console.log("SpeedX: " + SPEED_X);
      console.log("SpeedY: " + JUMP_SPEED_Y);
      setTimeout(() => {
        EventBus.emit('game-clear', playResult)
      }, 1000)
    }

    if (this.jumpStartX !== null && this.player.body?.touching.down) {
      if (this.isLanding == false) {
        this.isLanding = true;
      } else {
        const jumpDistance = this.player.x - this.jumpStartX;
        console.log(`Jump Distance: ${jumpDistance} pixels (${Math.floor(jumpDistance / 100)} meters)`);
        this.jumpStartX = null;  // Reset jumpStartX after landing
        this.isLanding = false;
      }
    }
  }

  setupDebug() {
    // const speed = 340
    this.background.tilePositionX += 5

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-1 * SPEED_X)
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(SPEED_X)
    } else {
      this.player.setVelocityX(0)
    }

    if (Input.Keyboard.JustDown(this.jumpButton)) {
      this.player.setVelocityY(JUMP_SPEED_Y)
      this.jumpStartX = this.player.x;  // Store the start position of the jump
      this.playerInteractions.push({
        action: 'jump',
        // frame: this.game.getFrame(),
        x: this.player.x,
        y: this.player.y,
      })
    }

    if (this.input.pointer1.isDown) {
      if (this.input.activePointer.x < this.scale.width / 2) {
        this.player.setVelocityX(SPEED_X)
      }
    }

    if (this.input.pointer2.isDown) {
      if (this.input.activePointer.x > this.scale.width / 2) {
        this.player.setVelocityY(JUMP_SPEED_Y)
        this.jumpStartX = this.player.x;  // Store the start position of the jump
        this.playerInteractions.push({
          action: 'jump',
          // frame: this.game.getFrame(),
          x: this.player.x,
          y: this.player.y,
        })
      }
    }

    if (this.player.x > this.goalX) {
      this.scene.pause()
      this.sound.stopByKey('main-bgm')
      this.sound.play('clear')
      const playResult = {
        distance: Math.floor(this.player.x / 100),
        interactions: this.playerInteractions,
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
      interactions: this.playerInteractions,
    }

    setTimeout(() => {
      EventBus.emit('game-over', playResult)
    }, 1000)
  }
}
