// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();

// configure app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8080; // set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://tg:technologygrows@kahana.mongohq.com:10020/tg'); // connect to our database
var Bird     = require('./app/models/bird');

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'Technology Grows - Welcome to our api!' });	
});

// on routes that end in /birds
// ----------------------------------------------------
router.route('/birds')

	// create a bear (accessed at POST http://localhost:8080/birds)
	.post(function(req, res) {
		
		var bird = new Bird();		// create a new instance of the Bird model
		bird.name = req.body.name;  // set the birds name (comes from the request)

		bird.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Bird created!' });
		});

		
	})

	// get all the birds (accessed at GET http://localhost:8080/api/birds)
	.get(function(req, res) {
		Bird.find(function(err, birds) {
			if (err)
				res.send(err);

			res.json(birds);
		});
	});

// on routes that end in /birds/:bird_id
// ----------------------------------------------------
router.route('/birds/:bird_id')

	// get the bird with that id
	.get(function(req, res) {
		Bird.findById(req.params.bird_id, function(err, bird) {
			if (err)
				res.send(err);
			res.json(bird);
		});
	})

	// update the bear with this id
	.put(function(req, res) {
		Bird.findById(req.params.bird_id, function(err, bird) {

			if (err)
				res.send(err);

			bird.name = req.body.name;
			bird.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Bird updated!' });
			});

		});
	})

	// delete the bear with this id
	.delete(function(req, res) {
		Bird.remove({
			_id: req.params.bird_id
		}, function(err, bird) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
