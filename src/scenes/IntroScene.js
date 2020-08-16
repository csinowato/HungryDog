import "phaser";
import Button from "../entity/Button";

export default class IntroScene extends Phaser.Scene {
  constructor() {
    super("IntroScene");
  }

  preload() {
    // Preload Sprites
    this.load.image("sky2", "assets/backgrounds/sky2.png");
    this.load.image("clouds2", "assets/backgrounds/clouds2.png");
    this.load.image("mountains", "assets/backgrounds/mountains.png");
    this.load.image("button", "assets/sprites/button.png");
  }

  create() {
    // add images to the scene by giving it the x and y coordinate
    // set scale changes image size
    this.add.image(0, -10, "sky2").setOrigin(0).setScale(0.6);
    this.add.image(0, -100, "clouds2").setOrigin(0).setScale(0.6);
    this.add.image(-10, 350, "mountains").setOrigin(0).setScale(0.6);

    // this.scene.start("MainScene"); //UNCOMMENT TO START MAIN SCENE ----->
    this.buttonsGroup = this.physics.add.staticGroup({ classType: Button });
    this.createButton(700, 220);
    this.createButton(700, 290);
    this.createButton(700, 360);
    this.createButton(700, 430);
    this.createButton(700, 500);

    //Easy
    this.buttonsGroup.children.entries[0].on("pointerdown", () => {
      this.scene.start("MainScene", 1);
    });

    //Medium
    this.buttonsGroup.children.entries[1].on("pointerdown", () => {
      this.scene.start("MainScene", 1.5);
    });

    //Hard
    this.buttonsGroup.children.entries[2].on("pointerdown", () => {
      this.scene.start("MainScene", 2);
    });

    //Very Hard
    this.buttonsGroup.children.entries[3].on("pointerdown", () => {
      this.scene.start("MainScene", 2.5);
    });

    //Impossible
    this.buttonsGroup.children.entries[4].on("pointerdown", () => {
      this.scene.start("MainScene", 3);
    });
  }

  createButton(x, y) {
    this.buttonsGroup.create(x, y, "button").setScale(0.25).setInteractive();
  }
}
