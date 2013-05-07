var express = require('express'),
	http = require('http'),
	path = require('path'),
	pg = require('pg').native, 
	connectionString = process.env.HEROKU_POSTGRESQL_ONYX_URL || 'postgres://localhost:5432/likeMarkus', 
	client, 
	query;

var app = express();

client = new pg.Client(connectionString);
client.connect();

app.configure(function() {
	app.set('port', process.env.PORT || 3000);
	app.use(express.logger('dev')); /* 'default', 'short', 'tiny', 'dev' */
	app.use(express.bodyParser()),
	app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/api/questions/:id', function(req, res) {

	query = client.query(
		'SELECT q.order as question_order, q._id as question_id, q.description AS question_description, a._id AS answer_id, a.description AS answer_description, a.votes AS answer_votes from question q LEFT JOIN answer a ON (q._id = a.question_id) WHERE q._id = $1 ORDER BY q.order, q._id, a._id', 
		[req.params.id]
	);
	query.on('row', function(row, result) {
		result.addRow(row);
	});
	query.on('end', function(result) {
		res.set({
			"Cache-Control": "no-cache, must-revalidate",
			"Expires": "Sat, 26 Jul 1997 05:00:00 GMT"
		});
		res.send(pgQuestionToJson(result)[0]);
	});

});

app.put('/api/questions/:id', function(req, res) {

	if(req.body.vote_for_answer_id != undefined) {
		update_query = client.query(
			'UPDATE answer a SET votes = votes+1 WHERE a.question_id = $1 AND a._id = $2', 
			[req.params.id, req.body.vote_for_answer_id]
		);

		update_query.on('end', function(row, result){
			query = client.query(
				'SELECT q.order as question_order, q._id as question_id, q.description AS question_description, a._id AS answer_id, a.description AS answer_description, a.votes AS answer_votes from question q LEFT JOIN answer a ON (q._id = a.question_id) WHERE q._id = $1 ORDER BY q.order, q._id, a._id', 
				[req.params.id]
			);
			query.on('row', function(row, result) {
				result.addRow(row);
			});
			query.on('end', function(result) {
				res.set({
					"Cache-Control": "no-cache, must-revalidate",
					"Expires": "Sat, 26 Jul 1997 05:00:00 GMT"
				});
				res.send(pgQuestionToJson(result)[0]);
			});
		});
	}

});

pgQuestionToJson = function(result) {
	var response = [];
		
	var current_question_index = -1;
	var previous_question_id = null;
	for (var i = 0; i < result.rows.length; i++) {
		var row = result.rows[i];

		if(previous_question_id != row.question_id) {
			current_question_index++;
			previous_question_id = row.question_id;

			response[current_question_index] = {
				_id: row.question_id,
				description: row.question_description,
				order: row.question_order,
				answers: []
			}
		}

		if(row.answer_id != null) {
			response[current_question_index].answers[response[current_question_index].answers.length] = {
				_id: row.answer_id,
				votes: row.answer_votes,
				description: row.answer_description
			}
		}
	}
	return response;
}

app.get('/api/questions', function(req, res) {

	query = client.query('SELECT q.order as question_order, q._id as question_id, q.description AS question_description, a._id AS answer_id, a.description AS answer_description, a.votes AS answer_votes from question q LEFT JOIN answer a ON (q._id = a.question_id) ORDER BY q.order, q._id, a._id');

	query.on('row', function(row, result) {
		result.addRow(row);
	});
	query.on('end', function(result) {
		res.send(pgQuestionToJson(result));
	});
	query.on('error', function(error) {
		res.send(error);
	});
});

http.createServer(app).listen(app.get('port'), function() {
	console.log("Express server listening on port " + app.get('port'));
});