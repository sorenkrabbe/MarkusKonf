/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	var Workspace = Backbone.Router.extend({	
	});

	app.AppRouter = new Workspace();
	Backbone.history.start();
})();
