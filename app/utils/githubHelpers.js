var axios = require('axios');

var id = 'your client-id';
var sec = 'your secret id'
var param = '?client_id=' + id + '&client_secret=' + sec

function getUserInfo (username) {
  return axios.get('https://api.github.com/users/'+ username)
}

function getRepos (username) {
  //fetch username repos
  return axios.get('https://api.github.com/users/'+ username+ '/repos');

};

function getTotalStars (repos) {
  //calculate all the stars that the user has
  return repos.data.reduce(function(prev, current) {
    return prev + current.stargazers_count
  }, 0)
};

function getPlayersData (player) {
  //get repos
  //getTotalStars
  //return object with the data
  return getRepos(player.login)
    .then(getTotalStars)
    .then(function(totalStars) {
      return {
        followers: player.followers,
        totalStars: totalStars
      }
    })
};

function calculateScores(players) {
  //return an array, after doing some fancy algorithms to determine a winner
  return [
    players[0].followers * 3 + players[0].totalStars,
    players[1].followers * 3 + players[1].totalStars
  ]
}

var helpers = {
  getPlayersInfo: function(players) {
    //fetch data from github
    return axios.all(players.map(function( username) {
      return getUserInfo(username)
    })).then(function(info) {
      console.log('Info', info)
      return info.map(function(user) {
        return user.data;
      })
    }).catch(function() {
      console.log('Error in getPlayersInfo', err)
    })
  },
  battle: function(players) {
    var playerOneData = getPlayersData(players[0]);
    var playerTwoData = getPlayersData(players[1]);

    return axios.all([playerOneData, playerTwoData])
      .then(calculateScores)
      .catch(function(err) {
        console.warn('Error in getPlayersInfo: ', err )
      })

  }
};

module.exports = helpers
