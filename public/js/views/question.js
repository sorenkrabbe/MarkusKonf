var app = app || {};

(function($) {
	'use strict';

	app.QuestionView = Backbone.View.extend({

		tagName: 'div',
		className: 'question',
		template: _.template($('#question-template').html()),

		events: {
			'click .answer-option': 'voteForAnswerElement',
			'click .refresh': 'refresh'
		},

		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
		},

		render: function() {
			this.$el.html(this.template({question: this.model}));
			return this;
		},

		voteForAnswerElement: function(element) {
			var answer_id = element.target.getAttribute("href");
			this.model.voteForAnswer(answer_id);
			return false;			
		},

		refresh: function() {
			this.model.fetch();
			return false;
		}

	});
})(jQuery);