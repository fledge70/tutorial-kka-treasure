module MyApp {

	/**
	 * Boot is used primarily to load assets needed by the
	 * Preloader, and also to initialize any system-wide objects
	 * and settings
	 */
	export class Boot extends Phaser.State {

		init() {
			// Effectively disable multitouch
			this.input.maxPointers = 1;

			// Enable physics
			/*
			this.game.physics.startSystem(Phaser.Physics.ARCADE);
			*/

			if (this.game.device.desktop) {
				// Add desktop specific settings here
				this.scale.pageAlignHorizontally = true;
			}
			else {
				// Add mobile specific settings here
				
				/* ScaleManager example
				this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
				this.scale.setMinMax(480, 260, 1024, 768);
				this.scale.forceLandscape = true;
				this.scale.pageAlignHorizontally = true;
				*/
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
