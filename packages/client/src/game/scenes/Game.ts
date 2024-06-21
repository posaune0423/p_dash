import { Scene, Input } from 'phaser'
import { EventBus } from '../EventBus'

type Obstacle = {
  x: number
  y: number
  type: string
  frame: number
}

const createAligned = (
  scene: Scene,
  camera: Phaser.Cameras.Scene2D.Camera,
  count: number,
  texture: string,
  screenFactor: number,
) => {
  let x = 0
  for (let i = 0; i < count; i++) {
    const img = scene.add.image(x * 2, scene.scale.height / 2, texture)
    img.setScale(Math.max(camera.width / img.width, camera.height / img.height))
    img.setScrollFactor(screenFactor)
    x += img.width
  }
}

export class Game extends Scene {
  camera!: Phaser.Cameras.Scene2D.Camera
  background!: Phaser.GameObjects.Image
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  jumpButton!: Phaser.Input.Keyboard.Key
  character!: Phaser.GameObjects.Image
  player!: Phaser.Physics.Arcade.Image
  jumpCount!: number
  goalX!: number

  STAGE_WIDTH!: number

  constructor() {
    super('Game')
  }

  init() {
    process.env.NEXT_PUBLIC_DEBUG === 'true' && this.physics.world.createDebugGraphic()

    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys()
      this.jumpButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }
    this.jumpCount = 0 // ジャンプ回数の初期化
  }

  create() {
    this.camera = this.cameras.main

    this.background = this.add
      .image(this.scale.width / 2, this.scale.height / 2, 'bg-1')
      .setScrollFactor(0)
    // Resized and centered
    this.background.setScale(
      Math.max(
        this.camera.width / this.background.width,
        this.camera.height / this.background.height,
      ),
    )

    createAligned(this, this.camera, 2, 'bg-2', 0.25)
    createAligned(this, this.camera, 3, 'bg-3', 0.3)
    createAligned(this, this.camera, 5, 'bg-4', 0.5)
    createAligned(this, this.camera, 10, 'bg-5', 1)

    // 障害物の生成
    const { obstacles } = this.cache.json.get('obstacles-2')
    this.STAGE_WIDTH = obstacles[obstacles.length - 1].x + 1000
    this.goalX = this.STAGE_WIDTH - 200

    this.player = this.physics.add
      .sprite(100, this.camera.height - 80, 'character-run')
      .setScale(1.5)
      .setCollideWorldBounds(true)

    this.camera.setBounds(0, 0, this.STAGE_WIDTH, this.scale.height)
    this.physics.world.setBounds(0, 0, this.STAGE_WIDTH, this.scale.height)
    this.camera.startFollow(this.player, true, 0.05, 0.05)

    obstacles.forEach((obstacle: Obstacle) => {
      const buff = obstacle.type === 'tiles' ? 80 : 62
      const sprite = this.physics.add
        .sprite(obstacle.x, this.scale.height - obstacle.y - buff, obstacle.type, obstacle.frame)
        .setImmovable(true)

      if (obstacle.type === 'tiles') {
        sprite.body.setSize(80, 70)
        sprite.body.setOffset(64, 30)
      } else {
        sprite.setDisplaySize(80, 70)
        this.physics.add.collider(this.player, sprite, () => this.gameOver(this.player))
      }
      this.physics.add.collider(this.player, sprite)
    })

    for (let x = 0; x < this.STAGE_WIDTH; x += 136) {
      const tile = this.physics.add
        .sprite(x + 136 / 2, this.camera.height, 'tiles', 10)
        .setImmovable(true)
      tile.body.setSize(136, 30)
      tile.body.setOffset(16, 24)
      this.physics.add.collider(this.player, tile)
    }

    this.player.setCollideWorldBounds(true)
    this.player.setGravityY(2000)

    EventBus.emit('current-scene-ready', this)
  }

  update() {
    // if (this.cursors.left.isDown) {
    //     this.player.setVelocityX(-260);
    // } else if (this.cursors.right.isDown) {
    //     this.player.setVelocityX(260);
    // } else {
    //     this.player.setVelocityX(0);
    // }

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

    this.input.on('pointerup', () => {
      this.player.setVelocityX(0) // 移動を停止
    })

    // 地面に触れたときにジャンプカウントをリセット
    if (this.player.body?.touching.down) {
      this.jumpCount = 0
    }

    if (this.player.x > this.goalX) {
      this.checkGoal()
    }

    // 強制スクロール
    const speed = 340
    this.player.setVelocityX(speed)
  }

  gameOver(player: Phaser.GameObjects.Image) {
    // ゲームオーバーの処理
    this.physics.pause() // 物理エンジンを停止
    player.setTint(0xff0000) // プレイヤーを赤く表示

    this.add.text(this.player.x, this.camera.centerY, 'Game Over', {
      fontSize: '40px',
      fontStyle: 'bold',
    })
    this.scene.pause() // シーンを一時停止
    EventBus.emit('game-over')
  }

  checkGoal() {
    // ゲームクリアのモーダル表示
    this.scene.pause()
    EventBus.emit('game-clear')
  }
}
