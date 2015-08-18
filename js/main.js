var FartyTurd = FartyTurd || {};

FartyTurd.game = new Phaser.Game(480, 320, Phaser.CANVAS);

FartyTurd.game.state.add('Boot', FartyTurd.BootState);
FartyTurd.game.state.add('Preload', FartyTurd.PreloadState);
FartyTurd.game.state.add('Game', FartyTurd.GameState);

FartyTurd.game.state.start('Boot');
