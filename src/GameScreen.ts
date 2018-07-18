module MyApp {

	export class GameScreen extends Phaser.State {

    // keys used by the GameScreen state
    spaceKey: Phaser.Key;
    escKey: Phaser.Key;
    upKey: Phaser.Key;
    downKey: Phaser.Key;
    leftKey: Phaser.Key;
    rightKey: Phaser.Key;

    // game objects
    background: Phaser.Image;
    player: Phaser.Sprite;
    blobGroup: Phaser.Group;
    blobs: Phaser.Sprite[];

    // delta variable used to track time between update cycles
    delta: number = 0;

		create() {
      // start the simple physics simulation
      this.physics.startSystem(Phaser.Physics.ARCADE);

      // add the background image
      this.background = this.add.image(0, 0, Const.R.dungeon);

      // create blob 'pool' for holding the blob enemies
      this.blobGroup = this.add.group();
      this.blobGroup.enableBody = true;
      this.blobGroup.physicsBodyType = Phaser.Physics.ARCADE;
      this.blobGroup.createMultiple(Const.NUMBER_OF_BLOBS, Const.R.blob);
      // generate blobs
      this.blobs = new Array(5);
      for (let i = 0; i < Const.NUMBER_OF_BLOBS; i++) {
        this.blobs[i] = this.blobGroup.getFirstExists(false);
        this.blobs[i].reset(
          this.game.rnd.integerInRange((i+1)*2, (i+2)*2 ) * 16,
          this.game.rnd.integerInRange(1, 9) * 16
        );
      }

      // add the player sprite
      this.player = this.add.sprite(16, 80, Const.R.hunter);

      // register keys used by the current state
      this.spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      this.escKey = this.input.keyboard.addKey(Phaser.Keyboard.ESC);
      this.upKey = this.input.keyboard.addKey(Phaser.Keyboard.UP);
      this.downKey = this.input.keyboard.addKey(Phaser.Keyboard.DOWN)
      this.rightKey = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
      this.leftKey = this.input.keyboard.addKey(Phaser.Keyboard.LEFT);
      this.input.keyboard.addKeyCapture([
        this.spaceKey,
        this.escKey,
        this.upKey,
        this.downKey,
        this.rightKey,
        this.leftKey
      ]);

		}

		update() {
      this.delta = this.time.physicsElapsed;
			this.getInput();
		}

    getInput(): void {
      // check for keyboard input, particularly the space bar
			if (this.escKey.justDown) {
				// note, quitting is fake in browser, as a user would
				// just close the tab. Just reboot the game
				this.state.start('Boot');
      }

      // temporary vector to enable the normalizing of movement
      let moveVelocity = new Phaser.Point(0, 0);

      if (this.upKey.isDown) {
        moveVelocity.y -= 1;
      }
      if (this.downKey.isDown) {
        moveVelocity.y += 1;
      }
      if (this.leftKey.isDown) {
        moveVelocity.x -= 1;
      }
      if (this.rightKey.isDown) {
        moveVelocity.x += 1;
      }
      moveVelocity = Phaser.Point.normalize(moveVelocity);
      this.player.position.x += moveVelocity.x * Const.PLAYER_SPEED * this.delta;
      this.player.position.y += moveVelocity.y * Const.PLAYER_SPEED * this.delta;
    }

	}

}