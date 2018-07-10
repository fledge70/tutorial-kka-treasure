module MyApp {

	export class Game extends Phaser.Game {
		
		constructor() {

			super(320, 176, Phaser.AUTO, 'content', null);

			this.state.add('Boot', Boot, false);
			this.state.add('Preloader', Preloader, false);
			this.state.add('TitleScreen', TitleScreen, false);

			this.state.start('Boot');
		}
		
	}

}