/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	app.Answer = Backbone.RelationalModel.extend({
	});
	app.AnswersList = Backbone.Collection.extend({
		model: app.Answer
	});

	app.Question = Backbone.RelationalModel.extend({
		urlRoot: '/api/questions/',
		idAttribute: '_id',
		relations: [{
			type: Backbone.HasMany,
			key: 'answers',
			createModels: true,
			relatedModel: 'app.Answer',
	        collectionType: 'app.AnswersList',
			reverseRelation: {
				key: 'question',
				includeInJSON: '_id'
			}
		}],

		getSumOfVotes: function() {
			var sum_of_votes = 0;
			for (var i = this.get("answers").size() - 1; i >= 0; i--) {
				sum_of_votes += this.get("answers").at(i).get("votes");
			};
			return sum_of_votes;
		},

		voteForAnswer: function(answer_id) {
			this.save({"vote_for_answer_id": answer_id});
		}
	});

})();
