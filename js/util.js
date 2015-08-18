var FartyTurd = FartyTurd || {};

FartyTurd.util = (function () {
	return {
		extend: function (child, parent) {
			child.prototype = Object.create(parent.prototype);
			child.prototype.constructor = child;

		}
	}
}());