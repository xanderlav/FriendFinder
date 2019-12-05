// Define and handle routes in web page
var path = require('path');

module.exports = function (app) {
    // shows survey page
	app.get('/survey', (req, res) => {
		res.sendFile(path.join(__dirname + '/../public/survey.html'));
	});

	// else go to home page
	app.use( (req, res) => {
		res.sendFile(path.join(__dirname + '/../public/home.html'));
	});
};