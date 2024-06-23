import { Scene } from 'phaser'

export class Preloader extends Scene {
  constructor() {
    super('Preloader')
  }

  init() {
    //  We loaded this image in our Boot Scene, so we can display it here
    this.add.image(this.scale.width / 2, this.scale.height / 2, 'base')
  }

  preload() {
    //  Load the assets for the game - Replace with your own assets
    this.load.setPath('/assets')

    // Load images for MainGame
    this.load.image('block', 'block.png')
    this.load.image('spike', 'spike.png')
    this.load.image('background', 'bg.png')
    this.load.image('player', 'player.png')
    this.load.image('tiles', 'tiles.png')

    // this.load.json("obstacles-1", "/obstacle-1.json");
    this.load.json('obstacles-2', '/obstacle-2.json')
  }

  create() {
    this.scene.start('Game')
  }
}
