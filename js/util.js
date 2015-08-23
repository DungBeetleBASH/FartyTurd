var FartyTurd = FartyTurd || {};

FartyTurd.util = (function () {
	return {
		extend: function (child, parent) {
			child.prototype = Object.create(parent.prototype);
			child.prototype.constructor = child;

		},
		mixin: function (receiver, giver, overwrite) {
			var p;
			if (giver && receiver) {
				for (p in giver) {
					if (giver.hasOwnProperty(p)) {
						if (!receiver[p] || overwrite) {
							receiver[p] = giver[p];
						}
					}
				}
			}
		}
	}
}());