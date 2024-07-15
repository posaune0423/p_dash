import { Scene } from 'phaser'

export class Preloader extends Scene {
  stageData!: Obstacle[]
  stage!: string

  constructor() {
    super('Preloader')
  }

  init({ stageData, stage }: { stageData: Obstacle[]; stage: string }) {
    this.stageData = stageData
    this.stage = stage

    //  A simple progress bar. This is the outline of the bar.
    this.add
      .rectangle(this.scale.width / 2, this.scale.height / 2, 468, 32)
      .setStrokeStyle(1, 0x6b7280)

    //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
    const bar = this.add.rectangle(
      this.scale.width / 2 - 230,
      this.scale.height / 2,
      4,
      28,
      0x6b7280,
    )

    //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
    this.load.on('progress', (progress: number) => {
      //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
      bar.width = 4 + 460 * progress
    })
  }

  preload() {
    this.load.setPath(`/assets/stage/${this.stage}`)

    this.load.image('block', 'block.png')
    this.load.image('spike', 'spike.png')
    this.load.image('background', 'bg.png')
    this.load.image('player', 'player.png')
    this.load.image('tiles', 'tiles.png')

    this.load.audio('main-bgm', '/sounds/musics/main.mp3')
    this.load.audio('dead', '/sounds/effects/dead.mp3')
    this.load.audio('clear', '/sounds/effects/clear.mp3')

    this.load.json('obstacles', { obstacles: this.stageData })
  }

  create() {
    this.scene.start('Game')
  }
}
