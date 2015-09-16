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
    this.load.image('pipe', 'asset/images/pipe.png');
    this.load.image('pipe-up', 'asset/images/pipe-up.png');
    this.load.image('pipe-down', 'asset/images/pipe-down.png');
    this.load.image('background', 'asset/images/background.png');
    this.load.image('turd', 'asset/images/turd.png');
    this.load.image('turdParticle', 'asset/images/turdParticle.png');
    this.load.image('fart', 'asset/images/fart.png');
    this.load.audio('splat', ['asset/audio/splat.mp3', 'asset/audio/splat.ogg']);
    this.load.audio('fartSound0', ['asset/audio/fart.mp3', 'asset/audio/fart.ogg']);
    this.load.audio('fartSound1', ['asset/audio/fart2.mp3', 'asset/audio/fart2.ogg']);
    this.load.audio('fartSound2', ['asset/audio/fart3.mp3', 'asset/audio/fart3.ogg']);
    this.load.audio('fartSound3', ['asset/audio/fart4.mp3', 'asset/audio/fart4.ogg']);
  },
  create: function() {
    if (intel && intel.xdk && intel.xdk.device) {
        intel.xdk.device.hideSplashScreen();   
    }
    this.state.start('Game');
  }
};