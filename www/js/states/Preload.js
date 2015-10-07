var FartyTurd = FartyTurd || {};

FartyTurd.PreloadState = {
  preload: function() {
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
    if (navigator && navigator.splashscreen) {
        navigator.splashscreen.hide();
    }
    this.state.start('Game');
  }
};