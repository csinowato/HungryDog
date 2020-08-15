import "phaser";
import Player from "../entity/Player";
import Ground from "../entity/Ground";

export default class FgScene extends Phaser.Scene {
  constructor() {
    super("FgScene");
  }

  preload() {
    // Preload images
    this.load.image("ground", "assets/sprites/ground2.png");

    // Preload spritesheet
    this.load.spritesheet("player", "assets/spriteSheets/player.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }
  create() {
    // Create ground group
    this.createGroups();

    // Load entities
    this.player = new Player(this, 20, 400, "player").setScale(2);

    // Create animations

    // Assign cursors
    this.cursors = this.input.keyboard.createCursorKeys();

    // Create collisions for all entities
    this.createCollisions();
  }

  update(time, delta) {
    this.player.update(this.cursors);
  }

  createGround(x, y) {
    // Make ground smaller
    // refreshBody syncs the Body's position and size with its parent Game Object (syncs collision boxes)
    this.groundGroup.create(x, y, "ground").setScale(0.6).refreshBody();
  }

  // Make all groups
  createGroups() {
    this.groundGroup = this.physics.add.staticGroup({ classType: Ground });
    this.createGround(500, 560);
  }

  createCollisions() {
    this.physics.add.collider(this.player, this.groundGroup);
  }
}
