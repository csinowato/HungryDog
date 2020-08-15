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
      if (this.body.touching.down) {
        this.play("left", true);
      }
    }

    // Move right
    else if (cursors.right.isDown) {
      this.setVelocityX(360);
      if (this.body.touching.down) {
        this.play("right", true);
      }
    }
    // Move up (jump)
    else if (cursors.up.isDown && this.body.touching.down) {
      this.setVelocityY(-300);
    }
    // Neutral (no movement)
    else {
      this.setVelocityX(0);
      if (this.body.touching.down) {
        this.play("forward", true);
      }
    }
  }
}
