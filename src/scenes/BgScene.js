import "phaser";

export default class BgScene extends Phaser.Scene {
  constructor() {
    super("BgScene");
  }

  preload() {
    // Preload Sprites
    this.load.image("sky", "assets/backgrounds/sky.png");
    this.load.image("clouds", "assets/backgrounds/clouds.png");
    this.load.image("mountains", "assets/backgrounds/mountains.png");
    this.load.image("tree", "assets/backgrounds/tree.png");
  }

  create() {
    // add images to the scene by giving it the x and y coordinate
    // set scale changes image size
    this.add.image(0, -10, "sky").setOrigin(0).setScale(0.6);
    this.add.image(-100, 0, "clouds").setOrigin(0).setScale(0.6);
    this.add.image(-10, 350, "mountains").setOrigin(0).setScale(0.6);
    this.add.image(20, 250, "tree").setOrigin(0).setScale(0.4);
    this.add.image(750, 200, "tree").setOrigin(0).setScale(0.5);
  }
}
