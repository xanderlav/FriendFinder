// API Routes to handle events
var friends = require('../data/friends.js');

module.exports = function(app){

  // API GET Requests
  app.get('/api/friends', function(req, res){
    res.json(friends);
  });

  // user submits a form and it submits data to the server.
  app.post('/api/friends', function(req, res){

    var bestBuddy = {
      name: "",
      photo: "",
      friendDifference: 1000
    };

    // Took the result of the user's survey POST and parse it.
    var userData = req.body;
    var userScores = userData.scores;

    var totalDif = 0;

    // Loop through all the friend optins in friend's array.
    for (var i = 0; i < friends.length; i++) {

      console.log(friends[i].name);
      totalDif = 0;
      for (var j = 0; j < friends[i].scores[j]; j++) {

        // Calculates the difference between the scores and acumulate each 
        totalDif += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

        // Determine best match, if sum of differences is less then the differences of the current
        if (totalDif <= bestBuddy.friendDifference) {

          // Reset the bestBuddy to be the new friend.
          bestBuddy.name = friends[i].name;
          bestBuddy.photo = friends[i].photo;
          bestBuddy.friendDifference = totalDif;
        }
      }
    }

    // Finally save the user's data to the database (this has to happen AFTER the check. otherwise,
    // the database will always return that the user is the user's best friend).
    friends.push(userData);

    // Return a JSON with the user's bestBuddy. This will be used by the HTML in the next page
    res.json(bestBuddy);

  });

};