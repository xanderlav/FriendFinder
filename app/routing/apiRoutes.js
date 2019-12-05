// API Routes to handle events
var friends = require('../data/friends.js');

module.exports = function(app){

  // GET Request
  app.get('/api/friends', (req, res) => { 
    res.json(friends);
  });

  // client submits a form and it submits data to the app server
  app.post('/api/friends', (req, res) => {
      var bestBuddy = {
      name: "",
      photo: "",
      buddyCompatibility: 1000
    };

    // Took the result of the user's survey POST and parse it.
    var userData = req.body;
    var userScores = userData.scores;

    var totalDif = 0;

    // Loop through all the friend optins in friends array.
    for (var i = 0; i < friends.length; i++) {

      totalDif = 0;
      for (var j = 0; j < friends[i].scores[j]; j++) {

        // Calculates the difference between the scores and acumulate each one
        totalDif += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

        // Determine best match, if sum of differences is less then the differences of the current
        if (totalDif <= bestBuddy.buddyCompatibility) {

          // Reset the bestBuddy to be the new friend.
          bestBuddy.name = friends[i].name;
          bestBuddy.photo = friends[i].photo;
          bestBuddy.buddyCompatibility = totalDif;
        }
      }
    }

    // Storage client data to the DB 
    friends.push(userData);
    // Return with the user's bestBuddy
    res.json(bestBuddy);
  });
};