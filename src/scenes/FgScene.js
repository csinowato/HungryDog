import "phaser";
import Player from "../entity/Player";
import Ground from "../entity/Ground";
import Edibles from "../entity/Edibles";

let score = 0;
let scoreText;

export default class FgScene extends Phaser.Scene {
  constructor() {
    super("FgScene");

    // bind functions
    this.collectEdibles = this.collectEdibles.bind(this);
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
    //create scoretext
    scoreText = this.add.text(16, 16, "score: 0", {
      fontSize: "30px",
      fill: "#000",
    });

    // Create ground group
    this.createGroups();

    // Load entities
    this.player = new Player(this, 220, 350, "player").setScale(0.2);
    this.player.body.setGravityY(500);

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
    this.createGround(480, 560);

    this.ediblesGroup = this.physics.add.group({ classType: Edibles });
    // Make x-coordinate for food drop random
    let foodXaxis = Math.floor(Math.random() * 1000);
    this.createEdibles(foodXaxis, 0);
  }

  // Helper function to drop edible objects
  createEdibles(x, y) {
    // Make object dropped random
    let edibleObjects = [
      "apple",
      "banana",
      "carrot",
      "strawberry",
      "watermelon",
    ];
    let randomIdx = Math.floor(Math.random() * 5);
    // Select random edible object
    this.ediblesGroup.create(x, y, edibleObjects[randomIdx]).setScale(0.09);
    // this.ediblesGroup.body.setGravityY(100); //doesnt work for group
  }

  createCollisions() {
    this.physics.add.collider(this.player, this.groundGroup);
    // this.physics.add.collider(this.player, this.ediblesGroup);

    // when player collides with edibles, use the collectEdibles function to remove (disable) fruit
    this.physics.add.overlap(
      this.player,
      this.ediblesGroup,
      this.collectEdibles,
      null,
      this
    );
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

  // when player collects edible fruit, make fruit disappear, and increase score
  collectEdibles(player, edible) {
    edible.disableBody(true, true);
    score += 10;
    scoreText.setText(`score: ${score}`);
  }
}
