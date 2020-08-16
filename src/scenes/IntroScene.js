import "phaser";
import Button from "../entity/Button";

let textStyling = {
  fontFamily: "Tahoma",
  fontSize: "24px",
  fill: "white",
};

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
    this.load.image("introDog", "assets/sprites/introDog.png");
    this.load.image("border", "assets/backgrounds/borderframe.png");
  }

  create() {
    // add images to the scene by giving it the x and y coordinate
    // set scale changes image size
    this.add.image(0, -10, "sky2").setOrigin(0).setScale(0.6);
    this.add.image(0, -120, "clouds2").setOrigin(0).setScale(0.6);
    this.add.image(-10, 350, "mountains").setOrigin(0).setScale(0.6);
    this.add.image(300, 305, "introDog").setOrigin(0).setScale(1.1);
    this.add.image(25, 15, "border").setOrigin(0).setScale(0.63);

    let title = this.add.text(250, 70, "HUNGRY DOG", {
      fontFamily: "Tahoma",
      fontSize: "80px",
      fill: "white",
    });
    title.setShadow(2, 2, "DarkSlateGray", 5);

    let description = this.add.text(250, 200, "Select a level to play", {
      fontFamily: "Tahoma",
      fontSize: "28px",
      fill: "white",
    });
    description.setShadow(2, 2, "DarkSlateGray", 5);

    // Create buttons menu
    this.buttonsGroup = this.physics.add.staticGroup({
      classType: Button,
      key: "button",
      repeat: 4,
      setXY: { x: 700, y: 220, stepY: 70 }, // hearts are placed 70 pixels apart
    });

    this.buttonsGroup.children.iterate((child) => {
      child.setScale(0.25).setInteractive(); // Enable user to click
    });

    let easy = this.add.text(675, 204, "Easy", textStyling);
    let medium = this.add.text(658, 274, "Medium", textStyling);
    let hard = this.add.text(675, 344, "Hard", textStyling);
    let veryHard = this.add.text(647, 414, "Very Hard", textStyling);
    let impossible = this.add.text(642, 484, "Impossible", textStyling);

    let levels = [easy, medium, hard, veryHard, impossible];
    levels.forEach((i) => i.setShadow(2, 2, "DarkSlateGray", 5));

    // Start the game scene after the user clicks a difficulty level
    // second argument is the difficulty
    // (1: easy, 1.5: medium, 2: hard, 2.5: very hard, 3: impossible)

    // Easy
    this.buttonsGroup.children.entries[0].on("pointerdown", () => {
      this.scene.start("MainScene", 1);
    });

    // Medium
    this.buttonsGroup.children.entries[1].on("pointerdown", () => {
      this.scene.start("MainScene", 1.5);
    });

    // Hard
    this.buttonsGroup.children.entries[2].on("pointerdown", () => {
      this.scene.start("MainScene", 2);
    });

    // Very Hard
    this.buttonsGroup.children.entries[3].on("pointerdown", () => {
      this.scene.start("MainScene", 2.5);
    });

    // Impossible
    this.buttonsGroup.children.entries[4].on("pointerdown", () => {
      this.scene.start("MainScene", 3);
    });
  }
}
