module MyApp {

	export class TitleScreen extends Phaser.State {

		titleText: Phaser.Text;
		instructions: Phaser.Text;
		instructionTimer: number;

		create() {
			this.titleText = this.add.text(
				Const.GAME_WIDTH / 2,
				-16,
			  "Treasure Hunter Demo");
			this.titleText.addColor('#ffff00', 0);
			this.titleText.anchor.set(0.5);

			this.instructions = this.add.text(
				Const.GAME_WIDTH / 2,
				Const.GAME_HEIGHT - 16,
			  "Press any key to begin",
		    {font: "12px Arial"}
    	);
			this.instructions.addColor('#008888', 0);
			this.instructions.anchor.set(0.5);
			// fade in instruction text gradually
			this.instructions.alpha = 0.01;
			this.add.tween(this.instructions).to(
				{ alpha: 1 }, 4000, 'Linear', true
			);
			
		}

		update() {
			let delta = this.time.physicsElapsed;
			this.titleText.y += 64 * delta;
			this.titleText.y = Phaser.Math.clamp(
				this.titleText.y,
				-16,
				Const.GAME_HEIGHT / 2
			);
		}

	}

}