import { Scene } from 'phaser'

export class Preloader extends Scene {
  constructor() {
    super('Preloader')
  }

  init() {
    //  We loaded this image in our Boot Scene, so we can display it here
    this.add.image(this.scale.width / 2, this.scale.height / 2, 'background')

    //  A simple progress bar. This is the outline of the bar.
    this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff)

    //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
    const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff)

    //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
    this.load.on('progress', (progress: number) => {
      //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
      bar.width = 4 + 460 * progress
    })
  }

  preload() {
    //  Load the assets for the game - Replace with your own assets
    this.load.setPath('/assets')

    this.load.image('bg-1', '/parallax-background/plx-1.png')
    this.load.image('bg-2', '/parallax-background/plx-2.png')
    this.load.image('bg-3', '/parallax-background/plx-3.png')
    this.load.image('bg-4', '/parallax-background/plx-4.png')
    this.load.image('bg-5', '/parallax-background/plx-5.png')
    this.load.image('character-run', '/character/sprites/run.gif')

    this.load.spritesheet('tiles', '/jungle-tileset/tileset.png', {
      frameWidth: 150,
      frameHeight: 100,
    })

    // this.load.json("obstacles-1", "/obstacle-1.json");
    this.load.json('obstacles-2', '/obstacle-2.json')
    this.load.image('objects', '/objects.png')
  }

  create() {
    this.scene.start('Game')
  }
}
