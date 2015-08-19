var FartyTurd = FartyTurd || {};

//loading the game assets
FartyTurd.PreloadState = {
  preload: function() {
    //show loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);
    this.preloadBar.scale.setTo(3);

    this.load.setPreloadSprite(this.preloadBar);

    //load game assets    
    this.load.image('playerDead', 'assets/images/player_dead.png');
    this.load.image('floor', 'assets/images/floor.png');
    this.load.image('pipe', 'assets/images/pipe.png');
    this.load.image('pipe-up', 'assets/images/pipe-up.png');
    this.load.image('pipe-down', 'assets/images/pipe-down.png');
    this.load.image('ground', 'assets/images/ground.png');
    this.load.image('background', 'assets/images/background.png');
    this.load.image('turd', 'assets/images/turd.png');
    this.load.audio('fart', ['assets/audio/coin.mp3', 'assets/audio/coin.ogg']);
  },
  create: function() {
    this.state.start('Game');
  }
};