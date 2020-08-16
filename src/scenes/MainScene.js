import "phaser";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  create(difficulty) {
    // << LOAD BACKGROUND AND FOREGROUND SCENES IN PARALLEL HERE >>
    this.scene.launch("BgScene");
    // this.scene.launch("FgScene", 3); //PASS IN DATA
    this.scene.launch("FgScene", difficulty); //PASS IN DATA
  }
}
