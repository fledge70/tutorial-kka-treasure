module MyApp {

  /**
   * Main entry point for the Treasure Hunter game
   */
	export class Game extends Phaser.Game {

		constructor() {

			super({
				width: Const.GAME_WIDTH,
				height: Const.GAME_HEIGHT,
				renderer: Phaser.AUTO,
				antialias: false
			});

			// add game states
			this.state.add('Boot', Boot, false);
			this.state.add('Preloader', Preloader, false);
			this.state.add('TitleScreen', TitleScreen, false);
			this.state.add('GameScreen', GameScreen, false);

			this.state.start('Boot');
		}
		
	}

}