import "phaser";
import Player from "../entity/Player";

export default class FgScene extends Phaser.Scene {
  constructor() {
    super("FgScene");
  }

  preload() {
    // Preload Sprites
    this.load.image("ground", "assets/sprites/ground.png");

    this.load.spritesheet("player", "assets/spriteSheets/player.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    // Load images
    this.add.image(0, -25, "ground").setOrigin(0).setScale(0.6);

    // Load player
    this.player = new Player(this, 20, 400, "player").setScale(2);
  }
}
