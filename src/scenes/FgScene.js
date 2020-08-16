import "phaser";
import Player from "../entity/Player";
import Ground from "../entity/Ground";
import Edibles from "../entity/Edibles";
import Inedibles from "../entity/Inedibles";
import Hearts from "../entity/Hearts";

let score = 0;
let scoreText;
let lives = 3;
let livesText;
let dropDelay;
let difficultyLvl;

export default class FgScene extends Phaser.Scene {
  constructor() {
    super("FgScene");

    // bind functions
    this.collectEdibles = this.collectEdibles.bind(this);
    this.collectIndibles = this.collectInedibles.bind(this);
  }

  preload() {
    this.load.image("ground", "assets/sprites/ground2.png");
    this.load.image("hearts", "assets/sprites/heart.png");

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

  create(difficulty) {
    // Reset score (after clicking play again)
    score = 0;
    lives = 3;

    // Adjusting difficulty to user specified level (1: easy, 1.5: medium, 2: hard, 2.5: very hard, 3: impossible)
    // Map difficulty to dropDelay and update global difficultyLvl
    let difficultyToDelay = { 1: 2000, 1.5: 1000, 2: 500, 2.5: 200, 3: 100 };
    dropDelay = difficultyToDelay[difficulty];
    difficultyLvl = difficulty;

    //create scoretext
    scoreText = this.add.text(20, 15, "score: 0", {
      fontFamily: "Tahoma",
      fontSize: "30px",
      fill: "white",
    });
    scoreText.setShadow(2, 2, "DarkSlateGray", 2);

    //create box for lives
    livesText = this.add.text(16, 60, "      ", {
      fontSize: "36px",
      fill: "#000",
      backgroundColor: "white",
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

  createHearts(x, y) {
    this.heartsGroup.create(x, y, "hearts").setScale(0.05);
  }

  // Helper function to drop edible objects
  createEdibles(x, y) {
    // Make object dropped random
    let edibles = ["apple", "banana", "carrot", "strawberry", "watermelon"];
    let randomIdx = Math.floor(Math.random() * 5);
    // Select random edible object
    this.ediblesGroup.create(x, y, edibles[randomIdx]).setScale(0.09);
  }

  createInedibles(x, y) {
    let inedibles = ["cherries", "garlic", "grapes", "onion", "redonion"];
    let randomIdx = Math.floor(Math.random() * 5);
    this.inediblesGroup.create(x, y, inedibles[randomIdx]).setScale(0.09);
  }

  // Make all groups
  createGroups() {
    this.groundGroup = this.physics.add.staticGroup({ classType: Ground });
    this.createGround(480, 560);

    this.heartsGroup = this.physics.add.staticGroup({ classType: Hearts });
    this.createHearts(40, 80);
    this.createHearts(82, 80);
    this.createHearts(124, 80);

    this.ediblesGroup = this.physics.add.group({ classType: Edibles });
    // Drop one edible food immediately when game starts
    let edibleXaxis = Math.floor(Math.random() * 950) + 20;
    this.createEdibles(edibleXaxis, 0);

    this.inediblesGroup = this.physics.add.group({ classType: Inedibles });

    // continually make objects fall using timer
    this.time.addEvent({
      delay: dropDelay,
      callback: this.itemDrop, //calling the helper function
      callbackScope: this,
      loop: true,
    });
  }

  //Helper function for continuously dropping items
  itemDrop() {
    let xAxis = Math.floor(Math.random() * 950) + 20;
    let edibleOrInedible = Math.floor(Math.random() * 3);
    // create and drop inedible food 1/3 of the time
    if (edibleOrInedible === 2) {
      this.createInedibles(xAxis, 20);
      // create and drop an edible food 2/3 of the time
    } else {
      this.createEdibles(xAxis, 20);
    }
  }

  createCollisions() {
    this.physics.add.collider(this.player, this.groundGroup);

    // when player collides with edibles, use the collectEdibles function to remove (disable) food
    this.physics.add.overlap(
      this.player,
      this.ediblesGroup,
      this.collectEdibles,
      null,
      this
    );

    // when player collides with inedibles, use the collectIndibles function to remove (disable) food
    this.physics.add.overlap(
      this.player,
      this.inediblesGroup,
      this.collectInedibles,
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

  // when player collects edible food, make food disappear, and increase score
  collectEdibles(player, edible) {
    player.clearTint();
    edible.disableBody(true, true);
    score += difficultyLvl * 10;
    scoreText.setText(`score: ${score}`);
  }

  // if player catches inedible food, make food disappear, decrease lives
  collectInedibles(player, inedible) {
    player.setTint(0xce6161);
    inedible.disableBody(true, true);
    lives -= 1;
    this.player.setBounce(0.2);

    // console.log(this.heartsGroup.children.entries[0]);
    this.heartsGroup.children.entries[lives].destroy();

    if (lives === 0) {
      this.scene.start("GameOverScene", score);
    }
  }
}
