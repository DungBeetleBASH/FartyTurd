var FartyTurd = FartyTurd || {};

FartyTurd.GameState = {

  init: function() {
    //references to config
    this.styles = FartyTurd.config.GameStateStyles;
    this.strings = FartyTurd.config.GameStateStrings;
    //pool of pipes
    this.pipePool = this.add.group();
    //gravity
    this.game.physics.arcade.gravity.y = 1000;

    //enable cursor keys
    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.currentScore = 0;
    this.levelScoreBoundary = 5;
    this.levelSpeed = 100;
    this.minPipeSeparation = 80;
    this.maxPipeSeparation = 180;
    this.pipeConfig = {
      maxHeight: 260,
      minHeight: 20,
      maxGap: 140,
      minGap: 90
    };

    this.isFarting = false;
  },
  create: function() {
    this.createBackground();
    this.createPlayer();
    this.createTurdExplosion();
    this.createFart();
    this.createFartSounds();
    this.splatSound = this.add.audio('splat');
    this.createPipe();
    this.fartCountLabel = this.add.text(this.game.world.width / 2, this.game.world.height - 50, this.strings.fartCount, this.styles.fartCount);
    this.fartCountLabel.anchor.setTo(0.5);
    this.fartCountLabel.alpha = 0.7;
  },
  createBackground: function () {
    this.background = this.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'background');
    this.background.tileScale.y = 2;
    this.background.tileScale.x = 2;
    this.background.autoScroll(-this.levelSpeed/6, 0);
    this.game.world.sendToBack(this.background);
  },
  createPlayer: function () {
    this.player = this.add.sprite(100, 140, 'turd');
    this.player.anchor.setTo(0.5);
    this.game.physics.arcade.enable(this.player);
    this.player.body.setSize(30, 22, 0, 0);
  },
  createFart: function () {
    this.fart = this.game.add.sprite(80, 170, 'fart');
    this.fart.customParams = {
      offset: {
        x: -25,
        y: 23
      }
    };
    this.game.physics.arcade.enable(this.fart);
    this.fart.alpha = 0.4;
    this.fart.body.allowGravity = false;
    this.fart.anchor.setTo(0.5);
    this.fart.kill();
  },
  createFartSounds: function () {
    var fartSound,
      i;

    this.fartSounds = [];

    for (i = 0; i < 4; i++) {
      fartSound = this.add.audio('fartSound' + i);
      fartSound.isPlaying = false;
      fartSound.onPlay.add(this.onSoundPlay, this);
      fartSound.onStop.add(this.onSoundStop, this);
      this.fartSounds.push(fartSound);
    }
  },
  onSoundPlay: function (sound) {
    this.fart.reset(this.player.x + this.fart.customParams.offset.x, this.player.y + this.fart.customParams.offset.y);
    this.fart.body.velocity.x = -this.levelSpeed;
    this.isFarting = true;
  },
  onSoundStop: function (sound) {
    this.fart.kill();
    this.isFarting = false;
  },
  update: function() {
    if(this.player.alive) {
      this.pipePool.forEachAlive(this.checkEachPipe, this);

      if(this.cursors.up.isDown || this.game.input.activePointer.isDown) {
        this.playerJump();
      }
      
      this.rotatePlayer();

      if(this.currentPipe.length && this.currentPipe.children[0].right < this.game.world.width) {
        this.createPipe();
      }

      //check if the player needs to die
      if(this.player.bottom >= this.game.world.height) {
        this.gameOver();
      }
    }

  },
  checkEachPipe: function(pipe){
    this.game.physics.arcade.overlap(this.player, pipe, this.gameOver, null, this);

    if(!pipe.isScored && pipe.length && pipe.children[0].right < this.player.left) {
      this.incrementScore();
      pipe.isScored = true;
    }

    //check if a pipe needs to be killed
    if(pipe.length && pipe.children[0].right < 0) {
      pipe.kill();
    }

  },
  playFartSound: function () {
    //var index = Math.floor(Math.random() * (this.fartSounds.length));
    //this.fartSounds[index].play();
    this.fartSounds[Math.floor(Math.random() * (this.fartSounds.length))].play();

  },
  incrementScore: function () {
    this.currentScore++;
    this.fartCountLabel.text = this.currentScore;
    if (this.currentScore % this.levelScoreBoundary === 0) {
      this.levelUp();
    }
  },
  levelUp: function () {
    this.levelSpeed += 2;
    this.maxPipeSeparation = Math.max(50, this.maxPipeSeparation - 2);
    this.minPipeSeparation = Math.max(30, this.minPipeSeparation + 2);
    this.pipeConfig.maxHeight = Math.max(20, this.pipeConfig.maxHeight + 2);
    //this.pipeConfig.minHeight = Math.max(20, this.pipeConfig.minHeight - 2);
    this.pipeConfig.maxGap = Math.max(50, this.pipeConfig.maxGap - 2);
    this.pipeConfig.minGap = Math.max(50, this.pipeConfig.minGap + 2);
  },
  playerJump: function() {
    if (this.player.top > 0) {
      this.player.body.velocity.y = -150;
    }
    if (!this.isFarting) {
      this.playFartSound();
    }
  },
  rotatePlayer: function () {
    this.player.rotation = (this.player.body.velocity.y > 0) ? 0.25 : -0.25;
  },
  createPipe: function(){
    this.generateNextPipe();

    this.currentPipe = this.pipePool.getFirstDead();

    if(!this.currentPipe) {
      this.currentPipe = new FartyTurd.Pipe(this.game, this.game.world.width + this.nextPipeData.separation, 0, -this.levelSpeed, this.nextPipeData);
    } else {
      this.currentPipe.configure(this.game.world.width + this.nextPipeData.separation, 0, -this.levelSpeed, this.nextPipeData);
    }

    this.pipePool.add(this.currentPipe);
  },
  generateNextPipe: function() {
    this.nextPipeData = {
      separation: this.minPipeSeparation + Math.random() * (this.maxPipeSeparation - this.minPipeSeparation),
      upperPipeHeight: this.pipeConfig.minHeight + Math.random() * (this.pipeConfig.maxHeight - this.pipeConfig.minHeight),
      pipeGap: this.pipeConfig.minGap + Math.random() * (this.pipeConfig.maxGap - this.pipeConfig.minGap)
    };
    if (this.currentPipe && Math.abs(this.currentPipe.pipeData.upperPipeHeight - this.nextPipeData.upperPipeHeight) >= 100) {
      this.nextPipeData.separation += 60;
    }
  },
  gameOver: function() {
    this.splatSound.play();
    this.explodeTurd();
    this.player.kill();
    this.updateHighscore();
    this.game.time.events.add(500, this.displayGameOverPanel, this);

  },
  displayGameOverPanel: function() {
    var gameOverPanel = {};

    this.overlay = this.add.bitmapData(this.game.width, this.game.height);
    this.overlay.ctx.fillStyle = '#000';
    this.overlay.ctx.fillRect(0, 0, this.game.width, this.game.height);

    //sprite for the overlay
    this.panel = this.add.sprite(0, this.game.height, this.overlay);
    this.panel.alpha = 0.55;

    //overlay raising tween animation
    gameOverPanel = this.add.tween(this.panel);
    gameOverPanel.to({y: 0}, 600);

    //stop all movement after the overlay reaches the top
    gameOverPanel.onComplete.add(function(){
      this.background.stopScroll();
      this.add.text(this.game.width/2, this.game.height/2 - 40, this.strings.gameOver, this.styles.gameOver).anchor.setTo(0.5);
      this.add.text(this.game.width/2, this.game.height/2 - 10, this.strings.gameOverSubtitle, this.styles.gameOverSubtitle).anchor.setTo(0.5);
      this.add.text(this.game.width/2, this.game.height/2 + 50, this.strings.highScore + this.highScore, this.styles.score).anchor.setTo(0.5);
      this.add.text(this.game.width/2, this.game.height/2 + 80, this.strings.currentScore + this.currentScore, this.styles.score).anchor.setTo(0.5);
      this.add.text(this.game.width/2, this.game.height/2 + 120, this.strings.tap, this.styles.tap).anchor.setTo(0.5);
      this.game.input.onDown.addOnce(this.restart, this);
      this.cursors.up.onDown.addOnce(this.restart, this);
    }, this);

    gameOverPanel.start();
  },
  createTurdExplosion: function() {
    this.turdExplosion = this.game.add.emitter(0, 0, 200);
    this.turdExplosion.makeParticles('turdParticle');
    this.turdExplosion.minParticleSpeed.setTo(-200, -200);
    this.turdExplosion.maxParticleSpeed.setTo(200, 200);
    this.turdExplosion.minParticleAlpha = 0.4;
    this.turdExplosion.maxParticleAlpha = 0.8;
    this.turdExplosion.minParticleScale = 0.5;
    this.turdExplosion.maxParticleScale = 2;
    this.turdExplosion.gravity = 0;
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
  }/*,


  render: function() {
    this.game.debug.body(this.player);
    //this.game.debug.bodyInfo(this.player, 0, 30);
  }*/
};
