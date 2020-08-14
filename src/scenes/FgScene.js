import "phaser";

export default class FgScene extends Phaser.Scene {
  constructor() {
    super("FgScene");
  }

  preload() {
    // Preload Sprites
    this.load.image("ground", "assets/backgrounds/ground.png");
  }

  create() {
    // Load images
    this.add.image(-10, 350, "ground").setOrigin(0).setScale(0.6);
  }
}
