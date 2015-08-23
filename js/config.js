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
		fartCountLabel: {
			font: '30px Arial', 
			fill: '#fff'
		}
	}

};