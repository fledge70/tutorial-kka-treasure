module MyApp {

	/**
	 * The Preloader class is used to load game assets.
	 * Because this game is very small, all assets are loaded
	 * up-front, and no additional preloaders are needed
	 */
	export class Preloader extends Phaser.State {

		progressBar: Phaser.Sprite;

		preload() {

			// These are the assets we loaded in Boot.js
			this.progressBar = this.add.sprite(144, 72, 'progressBar');

			// Set the preload bar to use the progress bar loaded in Boot state
			this.load.setPreloadSprite(this.progressBar);

			// Load other assets needed for game
      this.load.image(Const.R.blob);
		}

		create() {
			this.game.state.start('TitleScreen');
		}
	}
}