module MyApp {

	/**
	 * Boot is used primarily to load assets needed by the
	 * Preloader, and also to initialize any system-wide objects
	 * and settings
	 */
	export class Boot extends Phaser.State {

		init() {
			// stop keys used by game from propagating up to the browser
			this.input.keyboard.addKeyCapture([
				Phaser.Keyboard.LEFT,
				Phaser.Keyboard.RIGHT,
				Phaser.Keyboard.UP,
				Phaser.Keyboard.DOWN,
				Phaser.Keyboard.SPACEBAR
			]);
			
			// Effectively disable multi-touch
			this.input.maxPointers = 1;

			// Enable physics
			/*
			this.game.physics.startSystem(Phaser.Physics.ARCADE);
			*/

			// scale game to fill available container, while
			// preserving aspect ratio
			this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			
			// keep crisp "pixel art" look
			Phaser.Canvas.setImageRenderingCrisp(this.game.renderer.view);
			this.game.stage.smoothed = false;

			if (this.game.device.desktop) {
				// Add desktop specific settings here
				// this.scale.pageAlignHorizontally = true;
			}
			else {
				// Add mobile specific settings here
			}
		}

		preload() {
			this.load.image('progressBar', 'assets/img/loader.png');
		}

		create() {
			// Launch the preloader now that its assets are loaded
			this.game.state.start('Preloader');
		}
	}
}
