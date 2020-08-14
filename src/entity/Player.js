import "phaser";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey) {
    super(scene, x, y, spriteKey);

    // Add the scene from arguments to the class object's scene
    this.scene = scene;
    // assign the object to it using add.existing()
    this.scene.add.existing(this);

    // Enable physics on this entity (so we can use gravity)
    this.scene.physics.world.enable(this);

    // Prevent player from walking off grid
    this.setCollideWorldBounds(true);
  }

  //for movement and animation
  update(cursors) {
    this.updateMovement(cursors);
  }

  updateMovement(cursors) {
    //Move left
    if (cursors.left.isDown) {
      this.setVelocityX(-360);
    } else if (cursors.right.isDown) {
      this.setVelocityX(360);
    } else {
      this.setVelocityX(0);
    }
  }
}
