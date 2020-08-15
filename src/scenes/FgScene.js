import "phaser";
import Player from "../entity/Player";
import Ground from "../entity/Ground";
import Edibles from "../entity/Edibles";

export default class FgScene extends Phaser.Scene {
  constructor() {
    super("FgScene");
  }

  preload() {
    this.load.image("ground", "assets/sprites/ground2.png");

    // Preload edibles
    this.load.image("apple", "assets/sprites/edible/apple.png");
    this.load.image("banana", "assets/sprites/edible/banana.png");
    this.load.image("carrot", "assets/sprites/edible/carrot.png");
    this.load.image("strawberry", "assets/sprites/edible/strawberry.png");
    this.load.image("watermelon", "assets/sprites/edible/watermelon.png");

    // Preload inedibles
    this.load.image("cherries", "assets/sprites/inedible/cherries.png");
    this.load.image("garlic", "assets/sprites/inedible/garlic.png");
    this.load.image("grapes", "assets/sprites/inedible/grapes.png");
    this.load.image("onion", "assets/sprites/inedible/onion.png");
    this.load.image("redonion", "assets/sprites/inedible/redonion.png");

    // Preload spritesheet
    this.load.spritesheet("player", "assets/spriteSheets/dog.png", {
      frameWidth: 300,
      frameHeight: 400,
    });
  }

  create() {
    // Create ground group
    this.createGroups();

    // Load entities
    this.player = new Player(this, 220, 350, "player").setScale(0.2);

    //Load food

    // Create animations
    this.createAnimations();

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

  createAnimations() {
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 1 }),
      frameRate: 10,
      repeat: -1, //repeat forever
    });

    this.anims.create({
      key: "forward",
      frames: [{ key: "player", frame: 2 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("player", { start: 3, end: 4 }),
      frameRate: 10,
      repeat: -1, //repeat forever
    });
  }
}
