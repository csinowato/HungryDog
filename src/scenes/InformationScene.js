import "phaser";
import Button from "../entity/Button";

export default class InformationScene extends Phaser.Scene {
  constructor() {
    super("InformationScene");
  }

  preload() {
    this.load.image("instructions", "assets/sprites/instructions.png");
  }

  create() {
    this.add.image(0, -10, "sky2").setOrigin(0).setScale(0.6);
    this.add.image(0, -120, "clouds2").setOrigin(0).setScale(0.6);
    this.add.image(-10, 350, "mountains").setOrigin(0).setScale(0.6);
    this.add.image(35, 8, "instructions").setOrigin(0).setScale(0.4);

    let xAxisCenter =
      this.cameras.main.worldView.x + this.cameras.main.width / 2;

    this.mainMenuButton = new Button(this, xAxisCenter, 550, "button")
      .setScale(0.25)
      .setInteractive(); //allows user to click

    let mainMenuButtonText = this.add
      .text(xAxisCenter, 550, "Main Menu", {
        fontFamily: "Tahoma",
        fontSize: "24px",
        fill: "white",
      })
      .setOrigin(0.5);
    mainMenuButtonText.setShadow(2, 2, "DarkSlateGray", 5);

    // If play again button is clicked, go back to intro page
    this.mainMenuButton.on("pointerdown", () => {
      this.scene.start("IntroScene");
    });
  }
}
