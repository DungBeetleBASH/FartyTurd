var FartyTurd = FartyTurd || {};

FartyTurd.GameState = {

  init: function() {

    //pool of pipes
    this.pipePool = this.add.group();

    //gravity
    this.game.physics.arcade.gravity.y = 1000;

    //max jump distance
    this.maxJumpDistance = 120;

    //move player with up key
    this.cursors = this.game.input.keyboard.createCursorKeys();

    //score
    this.currentScore = 0;

    //level values
    this.levelScoreBoundary = 10;
    this.levelSpeed = 100;
    this.minPipeSeparation = 50;
    this.maxPipeSeparation = 180;
    this.pipeConfig = {
      maxHeight: 100,
      minHeight: 20,
      maxGap: 130,
      minGap: 80
    };
  },
  create: function() {
    var fartSound,
      style,
      i;
    //moving background
    this.background = this.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'background');
    this.background.tileScale.y = 2.75;
    this.background.tileScale.x = 2.75;
    this.background.autoScroll(-this.levelSpeed/6, 0);
    this.game.world.sendToBack(this.background);

    //create the player
    this.player = this.add.sprite(100, 140, 'turd');
    this.player.anchor.setTo(0.5);
    this.game.physics.arcade.enable(this.player);

    // create the turdParticle emitter
    this.turdExplosion = this.game.add.emitter(0, 0, 200);
    this.turdExplosion.makeParticles('turdParticle');
    this.turdExplosion.minParticleSpeed.setTo(-200, -200);
    this.turdExplosion.maxParticleSpeed.setTo(200, 200);
    this.turdExplosion.minParticleAlpha = 0.4;
    this.turdExplosion.maxParticleAlpha = 0.8;
    this.turdExplosion.minParticleScale = 0.5;
    this.turdExplosion.maxParticleScale = 2;
    this.turdExplosion.gravity = 0;

    //change player bounding box
    this.player.body.setSize(32, 24, 0, 0);

    //hard-code first pipe
    this.currentPipe = new FartyTurd.Pipe(this.game, 250, 0, -this.levelSpeed, this.generateRandomPipe());
    this.pipePool.add(this.currentPipe);

    this.fart = this.game.add.sprite(80, 170, 'fart');
    this.fart.customParams = {
      offset: {
        x: -25,
        y: 23
      }
    };
    this.game.physics.arcade.enable(this.fart);
    this.fart.alpha = 0.5;
    this.fart.body.allowGravity = false;
    this.fart.anchor.setTo(0.5);
    this.fart.kill();

    //fart sound

    this.fartSounds = [];

    for (i = 0; i < 4; i++) {
      fartSound = this.add.audio('fartSound' + i);
      fartSound.isPlaying = false;
      fartSound.onPlay.add(this.onSoundPlay, this);
      fartSound.onStop.add(this.onSoundStop, this);
      this.fartSounds.push(fartSound);
    }

    this.createPipe();

    //moving ground
    this.ground = this.add.tileSprite(0, this.game.world.height - 30, this.game.world.width, 30, 'ground');
    this.ground.autoScroll(-this.levelSpeed/2, 0);

    //show number of coins
    style = {font: '30px Arial', fill: '#fff'};
    this.fartCountLabel = this.add.text(10, 20, '0', style);
  },
  onSoundPlay: function (sound) {
    sound.isPlaying = true;
    this.fart.reset(this.player.x + this.fart.customParams.offset.x, this.player.y + this.fart.customParams.offset.y);
    this.fart.body.velocity.x = -this.levelSpeed;
  },
  onSoundStop: function (sound) {
    sound.isPlaying = false;
    this.fart.kill();
  },
  update: function() {
    if(this.player.alive) {
      this.pipePool.forEachAlive(function(pipe){
        this.game.physics.arcade.overlap(this.player, pipe, this.gameOver, null, this);

        if(!pipe.isScored && pipe.length && pipe.children[0].right < this.player.left) {
          this.incrementScore();
          pipe.isScored = true;
        }

        //check if a pipe needs to be killed
        if(pipe.length && pipe.children[0].right < 0) {
          pipe.kill();
        }

      }, this);

      if(this.cursors.up.isDown || this.game.input.activePointer.isDown) {
        this.playerJump();
        if (!this.isFartSoundPlaying()) {
          this.playFartSound();
        }
      }

      if(this.currentPipe.length && this.currentPipe.children[0].right < this.game.world.width) {
        this.createPipe();
      }

      //check if the player needs to die
      if(this.player.bottom >= this.ground.top) {
        this.gameOver();
      }
    }

  },
  isFartSoundPlaying: function () {
    var isPlaying = false;
    this.fartSounds.some(function (fartSound) {
      if (fartSound.isPlaying) {
        isPlaying = true;
        return true;
      }
    }, this);
    return isPlaying;

  },
  playFartSound: function () {
    var min = 0,
        max = this.fartSounds.length,
        index = Math.floor(Math.random() * (max - min)) + min;
    this.fartSounds[index].play();

  },
  incrementScore: function () {
    this.currentScore++;
    this.fartCountLabel.text = this.currentScore;
    if (this.currentScore % this.levelScoreBoundary === 0) {
      this.levelUp();
    }
  },
  levelUp: function () {
    this.levelSpeed = this.levelSpeed++;
    this.minPipeSeparation = Math.max(10, this.minPipeSeparation - 2);
    this.maxPipeSeparation = Math.min(180, this.maxPipeSeparation - 2);
    this.pipeConfig.maxHeight = Math.min(100, this.pipeConfig.maxHeight - 2);
    this.pipeConfig.minHeight = Math.max(20, this.pipeConfig.minHeight - 2);
    this.pipeConfig.maxGap = Math.min(130, this.pipeConfig.maxGap - 2);
    this.pipeConfig.minGap = Math.max(80, this.pipeConfig.minGap - 2);

  },
  playerJump: function(){
    this.player.body.velocity.y = -150;
  },
  createPipe: function(){
    var nextPipeData = this.generateRandomPipe();

    this.currentPipe = this.pipePool.getFirstDead();

    if(!this.currentPipe) {
      this.currentPipe = new FartyTurd.Pipe(this.game, this.game.world.width + nextPipeData.separation, 0, -this.levelSpeed, nextPipeData);
    } else {
      this.currentPipe.configure(this.game.world.width + nextPipeData.separation, 0, -this.levelSpeed, nextPipeData);
    }

    this.pipePool.add(this.currentPipe);
  },
  generateRandomPipe: function() {
    return {
      separation: this.minPipeSeparation + Math.random() * (this.maxPipeSeparation - this.minPipeSeparation),
      upperPipeHeight: this.pipeConfig.minHeight + Math.random() * (this.pipeConfig.maxHeight - this.pipeConfig.minHeight),
      pipeGap: this.pipeConfig.minGap + Math.random() * (this.pipeConfig.maxGap - this.pipeConfig.minGap)
    };
  },
  gameOver: function() {
    this.explodeTurd();
    this.player.kill();
    this.updateHighscore();

    //game over overlay
    this.overlay = this.add.bitmapData(this.game.width, this.game.height);
    this.overlay.ctx.fillStyle = '#000';
    this.overlay.ctx.fillRect(0, 0, this.game.width, this.game.height);

    //sprite for the overlay
    this.panel = this.add.sprite(0, this.game.height, this.overlay);
    this.panel.alpha = 0.55;

    //overlay raising tween animation
    var gameOverPanel = this.add.tween(this.panel);
    gameOverPanel.to({y: 0}, 500);

    //stop all movement after the overlay reaches the top
    gameOverPanel.onComplete.add(function(){
      this.ground.stopScroll();
      this.background.stopScroll();

      var style = {font: '30px Arial', fill: '#fff'};
      this.add.text(this.game.width/2, this.game.height/2, 'GAME OVER', style).anchor.setTo(0.5);

      style = {font: '15px Arial', fill: '#fff'};
      this.add.text(this.game.width/2, this.game.height/2 + 22, 'Now wash your hands', style).anchor.setTo(0.5);

      style = {font: '20px Arial', fill: '#fff'};
      this.add.text(this.game.width/2, this.game.height/2 + 50, 'High score: ' + this.highScore, style).anchor.setTo(0.5);

      this.add.text(this.game.width/2, this.game.height/2 + 80, 'Your score: ' + this.currentScore, style).anchor.setTo(0.5);

      style = {font: '10px Arial', fill: '#fff'};
      this.add.text(this.game.width/2, this.game.height/2 + 120, 'Tap to play again', style).anchor.setTo(0.5);

      this.game.input.onDown.addOnce(this.restart, this);


    }, this);

    gameOverPanel.start();

  },
  explodeTurd: function () {
    this.turdExplosion.x = this.player.x;
    this.turdExplosion.y = this.player.y;
    this.turdExplosion.explode(750, 200);
  },
  restart: function(){
    //current bug with tileSprite on v2.3, have to manually remove the sprites from the world before launching a different state
    //http://www.html5gamedevs.com/topic/13843-events-linger-after-remove-and-destroy/
    this.game.world.remove(this.background);
    this.game.world.remove(this.ground);

    this.game.state.start('Game');
  },
  updateHighscore: function(){
    this.highScore = +localStorage.getItem('highScore');

    //do we have a new high score
    if(this.highScore < this.currentScore){
      this.highScore = this.currentScore;

      //save new high score
      localStorage.setItem('highScore', this.highScore);
    }
  }


  /*render: function() {
    this.game.debug.body(this.player);
    this.game.debug.bodyInfo(this.player, 0, 30);
  }*/
};
