var axios = require('axios');

var id = 'your client-id';
var sec = 'your secret id'
var param = '?client_id=' + id + '&client_secret=' + sec

function getUserInfo (username) {
  return axios.get('https://api.github.com/users/'+ username)
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
  }
};

module.exports = helpers
