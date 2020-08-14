export default {
  type: Phaser.AUTO, // Specify the underlying browser rendering engine (AUTO, CANVAS, WEBGL)
  // AUTO will attempt to use WEBGL, but if not available it'll default to CANVAS
  width: 1000, // Game width in pixels
  height: 600, // Game height in pixels
  render: {
    pixelArt: true,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 1500 }, // Game objects will be pulled down along y-axis
      // The higher the number the stronger the pull (i.e. falls faster)
      debug: false,
    },
  },
};
