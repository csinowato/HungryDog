import "phaser";

let scoreData;
let scoreText;

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super("GameOverScene");
  }

  preload() {
    // Preload Sprites
    this.load.image("sky", "assets/backgrounds/sky.png");
    this.load.image("clouds", "assets/backgrounds/clouds.png");
    this.load.image("mountains", "assets/backgrounds/mountains.png");
  }

  //score is passed in from FgScene
  create(score) {
    if (typeof score !== "number") scoreData = 0;
    else scoreData = score;

    // add images to the scene by giving it the x and y coordinate
    // set scale changes image size
    this.add.image(0, -10, "sky").setOrigin(0).setScale(0.6);
    this.add.image(-100, 0, "clouds").setOrigin(0).setScale(0.6);
    this.add.image(-10, 350, "mountains").setOrigin(0).setScale(0.6);

    let gameOver = this.add.text(300, 170, "GAME OVER", {
      fontFamily: "Tahoma",
      fontSize: "80px",
      fill: "white",
    });
    gameOver.setShadow(2, 2, "DarkSlateGray", 5);

    scoreText = this.add.text(410, 300, `Score: ${scoreData}`, {
      fontFamily: "Tahoma",
      fontSize: "45px",
      fill: "white",
    });
    scoreText.setShadow(2, 2, "DarkSlateGray", 2);
  }
}
