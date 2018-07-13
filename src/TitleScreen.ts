module MyApp {

	export class TitleScreen extends Phaser.State {

		titleText: Phaser.Text;
		instructions: Phaser.Text;
		spaceKey: Phaser.Key;
		escKey: Phaser.Key;

		create() {
			
			// Title text
			this.titleText = this.add.text(
				Const.GAME_WIDTH / 2,
				-16,
			  "Treasure Hunter Demo");
			this.titleText.addColor('#ffff00', 0);
			this.titleText.anchor.set(0.5);

			// Instruction text, how to start game
			this.instructions = this.add.text(
				Const.GAME_WIDTH / 2,
				Const.GAME_HEIGHT - 16,
			  "Press the SPACE BAR to begin",
		    {font: "12px Arial"}
    	);
			this.instructions.addColor('#008888', 0);
			this.instructions.anchor.set(0.5);
			// fade in instruction text gradually
			this.instructions.alpha = 0.01;
			this.add.tween(this.instructions).to(
				{ alpha: 1 }, 4000, 'Linear', true
			);
			
			// register keys used by the TitleScreen state
			this.spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
			this.escKey = this.input.keyboard.addKey(Phaser.Keyboard.ESC);
		}

		update() {
			let delta = this.time.physicsElapsed;

			// check for keyboard input, particularly the space bar
			if (this.escKey.justDown) {
				// note, quitting is fake in browser, as a user would
				// just close the tab. Just reboot the game
				this.state.start('Boot');
			}
			if (this.spaceKey.justDown) {
				this.state.start('GameScreen');
			}

			// move the title text
			this.titleText.y += 64 * delta;
			this.titleText.y = Phaser.Math.clamp(
				this.titleText.y,
				-16,
				Const.GAME_HEIGHT / 2
			);
		}

	}

}