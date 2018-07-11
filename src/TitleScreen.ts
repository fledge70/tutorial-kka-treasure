module MyApp {

	export class TitleScreen extends Phaser.State {

		titleText: Phaser.Text;

		create() {
			this.titleText = this.add.text(16, -16,
			"Treasure Hunter Demo");
			this.titleText.addColor('#ffff00', 0);
		}

		update() {
			let delta = this.time.physicsElapsed;
			this.titleText.y += 64 * delta;
		}

	}

}