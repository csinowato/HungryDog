import "phaser";

export default class Ground extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey) {
    super(scene, x, y, spriteKey);

    this.scene = scene;
    // Add ground to scene and enable physics
    // this.scene.physics.world.enable(this);
    // assign the object to scene using add.existing()
    this.scene.add.existing(this);
  }
}
