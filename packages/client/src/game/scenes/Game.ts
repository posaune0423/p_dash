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
    player_width_half: number | undefined
    player_height_half: number | undefined
    block_width_half: number | undefined
    block_height_half: number | undefined
    needle_width_half: number | undefined
    needle_height_half: number | undefined
  }

  constructor() {
    super('Game')
    this.tiles = []
    this.playerInteractions = []
    this.playerHistory = []
    this.config_for_noir = {
      height: 0,
      bufferHeight: BUFFER_HEIGHT,
      preparationWidth: PREPARATION_WIDTH,
      gravity: GRAVITY,
      speedX: SPEED_X,
      jump_speed_y: -1 * JUMP_SPEED_Y,
      player_width_half: 0,
      player_height_half: 0,
      block_width_half: 0,
      block_height_half: 0,
      needle_width_half: 0,
      needle_height_half: 0,
    }
  }

  init(): void {
    env.NEXT_PUBLIC_DEBUG && this.physics.world.createDebugGraphic()
    this.physics.world.setBounds(0, 0, this.scale.width, this.scale.height)
    this.config_for_noir.height = this.scale.height;
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
    // this.physics.world.createDebugGraphic(); // debug graphic mode


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

    console.log("stage info: height->" + this.scale.height + "buf_h->" + BUFFER_HEIGHT);
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
      console.log("Asset info:");
      console.log("x->"+ ele.x + " y->" + ele.y);
      // console.log("w->" + asset.width + " h->" + asset.height);
      console.log("x->" + asset.x + " y->" + asset.y);
      console.log("topleft.x: " + asset.getTopLeft().x + " topleft.y: " + asset.getTopLeft().y + " bottomright.x: " + asset.getBottomRight().x + " bottomright.y: " + asset.getBottomRight().y);
      // console.log("body_width: " + asset.body.width + " body_height: " + asset.body.height);
      // console.log("body_top: " + asset.body.top + " body_bottom: " + asset.body.bottom);
      console.log("display_w->" + asset.displayWidth + " display_h->" + asset.displayHeight);
      // console.log("display_x->" + asset.displayOriginX + " display_y->" + asset.displayOriginY);
      // console.log("body_bottom: " + asset.body.bottom + " body_top: " + asset.body.top + " body_left: " + asset.body.left + " body_right: " + asset.body.right);
      // console.log("body_width: " + asset.body.width + " body_height: " + asset.body.height);
      // console.log("body_x: " + asset.body.x + " body_y: " + asset.body.y);
      
      if (ele.type === 'spike') {
        asset.setBodySize(asset.width * 0.8, asset.height * 0.8)
        this.config_for_noir.needle_width_half = asset.displayWidth / 2;
        this.config_for_noir.needle_height_half = asset.displayHeight / 2;

        this.physics.add.collider(this.player, asset, () => this.gameOver())
      } else if (ele.type === 'block') {
        this.config_for_noir.block_width_half = asset.displayWidth  / 2;
        this.config_for_noir.block_height_half = asset.displayHeight / 2;

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
    this.config_for_noir.player_height_half = this.player.body?.height ? this.player.body.height / 2 : 0;
    this.config_for_noir.player_width_half = this.player.body?.width ? this.player.body.width / 2 : 0;

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
      console.log("config_for_noir:");
      console.log(this.config_for_noir);
      // console.log("Player History");
      // console.log(this.playerHistory);
      // console.log("this.scale.height: " + this.scale.height);
      // console.log("Buffer Height: " + BUFFER_HEIGHT);
      // console.log("Gravity: " + GRAVITY);
      // console.log("SpeedX: " + SPEED_X);
      // console.log("SpeedY: " + JUMP_SPEED_Y);
      // console.log("player_body_height: " + this.player.body?.height);
      // console.log("player_body_width: " + this.player.body?.width);
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

    console.log("game over");
    console.log("config_for_noir:");
    console.log(this.config_for_noir);
    // console.log("player info: x->" + this.player.x + " y->" + this.player.y);
    // console.log("player body: x->" + this.player.body?.x + " " + this.player.body?.y);
    // console.log("player body: w->" + this.player.body?.width + " h->" + this.player.body?.height);
    // console.log("player body: bottom->" + this.player.body?.bottom + " top->" + this.player.body?.top + " left->" + this.player.body?.left + " right->" + this.player.body?.right);

    const playResult = {
      distance: Math.floor(this.player.x / 100),
      interactions: this.playerInteractions,
    }

    setTimeout(() => {
      EventBus.emit('game-over', playResult)
    }, 1000)
  }
}
