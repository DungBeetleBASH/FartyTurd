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
    var adConfig = FartyTurd.config.AdMob;

    if (adConfig.banner.active) {
      AdMob.createBanner({
        adId: adConfig.banner.adId,
        autoShow: adConfig.banner.autoShow,
        isTesting: adConfig.banner.isTesting,
        overlap: adConfig.banner.overlap
      });
    }

    if (adConfig.interstitial.active) {
      AdMob.prepareInterstitial({
        adId: adConfig.interstitial.adId,
        autoShow: adConfig.interstitial.autoShow,
        isTesting: adConfig.interstitial.isTesting,
      });
    }

    FartyTurd.admobLoaded = true;
  }
};