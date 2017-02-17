var React = require('react')
var ConfirmBattle = require('../components/ConfirmBattle');
var githubHelpers = require("../utils/githubHelpers");

var ConfirmBattleContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function() {
    console.log('getInitialState')
    return {
      isLoading: true,
      playersInfo: []
    }
  },
  componentWillMount: function() {
    console.log('component will mount')
  },
  componentDidMount: function() {
    //fetch info from github then update state
    var query = this.props.location.query;
    console.log('component did mount')
    githubHelpers.getPlayersInfo([query.playerOne, query.playerTwo])
      .then(function(players) {
        this.setState({
          isLoading: false,
          playersInfo: [players[0], players[1]]
        })
      }.bind(this))
  },
  componentWillReceiveProps: function() {
    console.log('componentWillRecieveProps')
  },
  componentWillUnmount: function() {
    console.log('componentWillUnmount')
  },
  render: function() {
    return (
      <ConfirmBattle
        isLoading={this.state.isLoading}
        playersInfo={this.state.playersInfo} />
    )
  }
});

module.exports = ConfirmBattleContainer
