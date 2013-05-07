exports.findAll = function(req, res) {
	res.send([
		{
		name: "The Name 1", 
		description: "description",
		answers: [
			{	id: "1.1",
				question_id: "1",
				name: "Answer 1.1",
				votes: 1
			},
			{	id: "1.2",
				question_id: "1",
				name: "Answer 1.2",
				votes: 3
			}
		]
	},
	{
		id: "2", 
		name: "The Name 2", 
		description: "description",
		answers: [
			{	id: "2.1",
				question_id: "2",
				name: "Answer 2.1",
				votes: 1
			},
			{	id: "2.2",
				question_id: "2",
				name: "Answer 2.2",
				votes: 3
			}
		]
	},
		{
		id: "3", 
		name: "The Name 3", 
		description: "description",
		answers: [
			{	id: "3.1",
				question_id: "3",
				name: "Answer 2.1",
				votes: 1
			},
			{	id: "3.2",
				question_id: "3",
				name: "Answer 2.2",
				votes: 3
			}
		]
	},
		{
		id: "4", 
		name: "The Name 4", 
		description: "description",
		answers: [
			{	id: "4.1",
				question_id: "4",
				name: "Answer 2.1",
				votes: 1
			},
			{	id: "4.2",
				question_id: "4",
				name: "Answer 2.2",
				votes: 3
			}
		]
	},
		{
		id: "5", 
		name: "The Name 5", 
		description: "description",
		answers: [
			{	id: "5.1",
				question_id: "5",
				name: "Answer 2.1",
				votes: 1
			},
			{	id: "5.2",
				question_id: "5",
				name: "Answer 2.2",
				votes: 3
			}
		]
	}
		]);
};

exports.findById = function(req, res) {
	res.send({
		id: "1", 
		name: "The Name", 
		description: "description",
		answers: [
			{	id: "1",
				question_id: "1",
				name: "Answer 1",
				votes: 1
			},
			{	id: "2",
				question_id: "1",
				name: "Answer 2",
				votes: 3
			}
		]

	});
};