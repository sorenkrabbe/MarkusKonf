/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	app.QuestionsList = Backbone.Collection.extend({
		url: '/api/questions',
		model: app.Question
	});

	app.questions = new app.QuestionsList();
})();

