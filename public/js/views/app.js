var app = app || {};

(function($) {
	'use strict';

	$.ajaxSetup({ cache: false });

	app.AppView = Backbone.View.extend({

		el: '#app',

		events: {
		},

		initialize: function() {
			this.$questions = this.$('#questions');
			this.$questions_content = this.$('#questions .carousel-inner');
			this.listenTo(app.questions, 'add', this.addOne);
			app.questions.fetch();
		},

		addOne: function (question) {
			var view = new app.QuestionView({ model: question });
			$('#questions').append(view.render().el);	
		},

		refreshAll: function () {
			app.questions.fetch();
		},

		render: function() {}

	});
})(jQuery);