module MyApp {

	export class GameScreen extends Phaser.State {
    
    // keys used by the GameScreen state
    spaceKey: Phaser.Key;
    escKey: Phaser.Key;
    cursorKeys: Phaser.CursorKeys;

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
        // start blob moving in random Y direction at semi-random speed
        let speed = this.game.rnd.integerInRange(Const.MAX_BLOB_SPEED / 3, Const.MAX_BLOB_SPEED);
        // determine if blob will start moving up or down at start
        if (this.game.rnd.integerInRange(0, 1) === 0) {
          this.blobs[i].body.velocity = new Phaser.Point(0, -speed);
        } else {
          this.blobs[i].body.velocity = new Phaser.Point(0, speed);
        }
      }
      this.physics.enable(this.blobGroup);

      // add the player sprite
      this.player = this.add.sprite(16, 80, Const.R.hunter);
      this.physics.enable(this.player);
      

      // register keys used by the current state
      this.spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      this.escKey = this.input.keyboard.addKey(Phaser.Keyboard.ESC);
     
      this.cursorKeys = this.input.keyboard.createCursorKeys();

      this.input.keyboard.addKeyCapture([
        this.spaceKey,
        this.escKey,
        this.cursorKeys
      ]);
		}

		update() {
      this.getInput();
      this.updateEnemies();
      this.checkCollisions();
		}

    getInput(): void {
      this.player.body.velocity.x = 0;
      this.player.body.velocity.y = 0;
      
      // check for keyboard input, particularly the space bar
			if (this.escKey.justDown) {
				// note, quitting is fake-ish in browser, as a user would
				// just close the tab. Just reboot the game
				this.state.start('Boot');
      }

      // build velocity vector based on keyboard input
      if (this.cursorKeys.up.isDown && this.player.y > this.player.height) {
        this.player.body.velocity.y -= 1;
      }
      if (this.cursorKeys.down.isDown && this.player.y < Const.GAME_HEIGHT - (this.player.height * 2)) {
        this.player.body.velocity.y += 1;
      }
      if (this.cursorKeys.left.isDown && this.player.x > this.player.width) {
        this.player.body.velocity.x -= 1;
      }
      if (this.cursorKeys.right.isDown && this.player.x < Const.GAME_WIDTH - (this.player.width * 2)) {
        this.player.body.velocity.x += 1;
      }
      // normalize and apply velocity
      this.player.body.velocity = Phaser.Point.normalize(this.player.body.velocity);
      this.player.body.velocity.x *= Const.PLAYER_SPEED;
      this.player.body.velocity.y *= Const.PLAYER_SPEED;

      // constrain player position to stay in-bounds
      if (this.player.position.x < 16) {
        this.player.position.x = 16;
      } else if (this.player.position.x > Const.GAME_WIDTH - 32) {
        this.player.position.x = Const.GAME_WIDTH - 32;
      }
      if (this.player.position.y < 16) {
        this.player.position.y = 16;
      } else if (this.player.position.y > Const.GAME_HEIGHT - 32) {
        this.player.position.y = Const.GAME_HEIGHT - 32;
      }
    }

    updateEnemies(): void {
      this.blobGroup.forEach( (b: Phaser.Sprite) => {
        // check bounds for blobs; if wall hit, start moving in opposite direction
        if (b.y <= b.height || b.y >= Const.GAME_HEIGHT - (b.height * 2)) {
          b.y = Phaser.Math.clamp(b.y, b.height + 2, Const.GAME_HEIGHT - (b.height * 2) - 2);
          b.body.velocity.y *= -1;
        }
      });
    }

    checkCollisions(): void {
      if (this.physics.arcade.overlap(this.player, this.blobGroup)) {
        // TODO: replace this placeholder with actual game over logic
        this.player.alive = false;
        this.add.text(32, 32, "Game Over!", {fill: '#FFFFFF' });
      }
    }

	}

}