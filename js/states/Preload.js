var FartyTurd = FartyTurd || {};

//loading the game assets
FartyTurd.PreloadState = {
  preload: function() {
    //show loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loadingBar');
    this.preloadBar.anchor.setTo(0.5);
    this.preloadBar.scale.setTo(3);

    this.load.setPreloadSprite(this.preloadBar);

    //load game assets
    this.load.image('pipe', 'assets/images/pipe.png');
    this.load.image('pipe-up', 'assets/images/pipe-up.png');
    this.load.image('pipe-down', 'assets/images/pipe-down.png');
    this.load.image('background', 'assets/images/background.png');
    this.load.image('turd', 'assets/images/turd.png');
    this.load.image('turdParticle', 'assets/images/turdParticle.png');
    this.load.image('fart', 'assets/images/fart.png');
    this.load.audio('fartSound0', ['assets/audio/fart.mp3', 'assets/audio/fart.ogg']);
    this.load.audio('fartSound1', ['assets/audio/fart2.mp3', 'assets/audio/fart2.ogg']);
    this.load.audio('fartSound2', ['assets/audio/fart3.mp3', 'assets/audio/fart3.ogg']);
    this.load.audio('fartSound3', ['assets/audio/fart4.mp3', 'assets/audio/fart4.ogg']);
  },
  create: function() {
    this.state.start('Game');
  }
};