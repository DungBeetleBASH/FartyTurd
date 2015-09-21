var FartyTurd = FartyTurd || {};

//setting game configuration and loading the assets for the loading screen
FartyTurd.BootState = {
  init: function() {
    this.game.stage.backgroundColor = '#000';

    //scaling options
    this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.scale.forceOrientation(false, true);

    //physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // AdMob
    this.game.device.whenReady(function() {
      if (this.game.device.cordova || this.game.device.crosswalk) {
        if (typeof AdMob !== 'undefined' && AdMob) {
          this.setupAdmob();
        }
      }
    }, this);
  },
  create: function() {
    this.state.start('Preload');
  },
  setupAdmob: function() {
    var admobSettings = {};

    if (this.game.device.android) {
      admobSettings = {
        banner: 'ca-app-pub-4778325687900583/4410146557',
        interstitial: 'ca-app-pub-4778325687900583/5886879754'
      };
    }

    AdMob.createBanner({
      adId: admobSettings.banner,
      autoShow: false,
      isTesting: true,
      overlap: false
    });

    AdMob.prepareInterstitial({
      adId: admobSettings.interstitial,
      autoShow: false,
      isTesting: true
    });

    FartyTurd.admobLoaded = true;
  }
};