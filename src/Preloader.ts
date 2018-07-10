module MyApp {

	export class Preloader extends Phaser.State {

		progressBar: Phaser.Sprite;
		background: Phaser.Sprite;
		ready: boolean = false;

		preload() {

			// These are the assets we loaded in Boot.js
			this.progressBar = this.add.sprite(144, 72, 'progressBar');

			// Set the preload bar to use the progress bar loaded in Boot state
			this.load.setPreloadSprite(this.progressBar);

			// Load other assets needed for game

		}

		create() {
			this.game.state.start('TitleScreen');
		}
	}
}