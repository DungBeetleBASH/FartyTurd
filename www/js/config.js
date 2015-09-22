var FartyTurd = FartyTurd || {};

FartyTurd.config = {

	GameStateStyles: {
		fartCount: {font: '50px Arial', fill: '#fff'},
		gameOver: {font: '30px Arial', fill: '#fff'},
		gameOverSubtitle: {font: '18px Arial', fill: '#fff'},
		score: {font: '20px Arial', fill: '#fff'},
		tap: {font: '14px Arial', fill: '#fff'},
		tapToStart: {font: '30px Arial', fill: '#fff'},
		tapToFart: {font: '30px Arial', fill: '#fff'}
	},

	GameStateStrings: {
		fartCount: '0',
		gameOver: 'GAME OVER',
		gameOverSubtitle: 'Now wash your hands',
		highScore: 'High score: ',
		currentScore: 'Your score: ',
		tap: 'Tap to play again',
		tapToStart: 'Tap to Start',
		tapToFart: 'Tap to Fart'
	},

	GameStateValues: {
		numberOfSounds: 4,
		startingPipes: 3
	},

	AdMob: {
		banner: {
			adId: 'ca-app-pub-4778325687900583/4410146557',
			active: true,
			autoShow: false,
			isTesting: false,
			overlap: false
		},
		interstitial: {
			adId: 'ca-app-pub-4778325687900583/5886879754',
			active: true,
			autoShow: false,
			isTesting: false
		}
	}

};