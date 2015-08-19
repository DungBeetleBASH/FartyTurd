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
    this.load.image('pipe', 'assets/images/pipe.png');
    this.load.image('pipe-up', 'assets/images/pipe-up.png');
    this.load.image('pipe-down', 'assets/images/pipe-down.png');
    this.load.image('ground', 'assets/images/ground.png');
    this.load.image('background', 'assets/images/background.png');
    this.load.image('turd', 'assets/images/turd.png');
    this.load.image('fart', 'assets/images/fart.png');
    this.load.audio('fartSound', ['assets/audio/fart.mp3', 'assets/audio/fart.ogg']);
  },
  create: function() {
    this.state.start('Game');
  }
};