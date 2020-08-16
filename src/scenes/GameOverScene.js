import "phaser";
import Button from "../entity/Button";

let scoreData;
let scoreText;

let textStyling = {
  fontFamily: "Tahoma",
  fontSize: "24px",
  fill: "white",
};

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super("GameOverScene");
  }

  //score is passed in from FgScene
  create(score) {
    if (typeof score !== "number") scoreData = 0;
    else scoreData = score;

    this.add.image(0, -10, "sky2").setOrigin(0).setScale(0.6);
    this.add.image(-100, 0, "clouds2").setOrigin(0).setScale(0.6);
    this.add.image(-10, 350, "mountains").setOrigin(0).setScale(0.6);

    let xAxisCenter =
      this.cameras.main.worldView.x + this.cameras.main.width / 2;

    let gameOver = this.add
      .text(xAxisCenter, 160, "GAME OVER", {
        fontFamily: "Tahoma",
        fontSize: "80px",
        fill: "white",
      })
      .setOrigin(0.5);
    gameOver.setShadow(2, 2, "DarkSlateGray", 5);

    scoreText = this.add
      .text(xAxisCenter, 280, `Score: ${scoreData}`, {
        fontFamily: "Tahoma",
        fontSize: "45px",
        fill: "white",
      })
      .setOrigin(0.5);
    scoreText.setShadow(2, 2, "DarkSlateGray", 2);

    this.playAgainButton = new Button(this, xAxisCenter, 430, "button")
      .setScale(0.28)
      .setInteractive(); //allows user to click

    let buttonText = this.add
      .text(xAxisCenter, 428, "Play Again", textStyling)
      .setOrigin(0.5);
    buttonText.setShadow(2, 2, "DarkSlateGray", 5);

    // If play again button is clicked, go back to intro page
    this.playAgainButton.on("pointerdown", () => {
      this.scene.start("IntroScene");
    });
  }
}
