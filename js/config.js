var FartyTurd = FartyTurd || {};

FartyTurd.config = {

	GameState: {
		currentScore: 0,
		levelScoreBoundary: 10,
		levelSpeed: 100,
		minPipeSeparation: 50,
		maxPipeSeparation: 180,
		pipeConfig: {
	      maxHeight: 100,
	      minHeight: 20,
	      maxGap: 130,
	      minGap: 80
	    }
	},

	GameStateStyles: {
		fartCount: {font: '30px Arial', fill: '#fff'},
		gameOver: {font: '30px Arial', fill: '#fff'},
		gameOverSubtitle: {font: '15px Arial', fill: '#fff'},
		score: {font: '20px Arial', fill: '#fff'},
		tap: {font: '10px Arial', fill: '#fff'} 
	},

	GameStateStrings: {
		fartCount: '0',
		gameOver: 'GAME OVER',
		gameOverSubtitle: 'Now wash your hands',
		highScore: 'High score: ',
		currentScore: 'Your score: ',
		tap: 'Tap to play again'
	}

};