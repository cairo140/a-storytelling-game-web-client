'use strict';
angular.module('astorytellingGameApp').factory('messageInterpreter', function () {
  var messageTypes = {};
  var getWinner = function(players) {
    var winners = [];
    var maxScore;
    for(var i = 0; i < players.length; i++) {
      if(winners.length === 0 || players[i].score > maxScore) {
        maxScore = players[i].score;
        winners.length = 0;
        winners.push(players[i]);
      } else if (maxScore === players[i].score) {
        winners.push(players[i]);
      }
    }
    return winners;
  };
  messageTypes.identify = function (scope) {
    scope.currentState = 'identify';
    scope.say('Please identify yourself:');
  };
  messageTypes.currentPlayerUpdate = function (scope, data) {
    scope.player = data.player;
  };
  messageTypes.gameUpdate = function (scope, data) {
    scope.gameState = data.game;
    console.log(data.game);
    if(scope.currentState === 'identifyResponse') {
      scope.say('Welcome, ' + scope.player.name);
      scope.currentState = 'gameUpdate';
    }
  };
  messageTypes.playerJoined = messageTypes.gameUpdate;
  messageTypes.submissionReceived = messageTypes.gameUpdate;
  messageTypes.voteReceived = messageTypes.gameUpdate;
  messageTypes.submit = function (scope, data) {
    scope.gameState = data.game;
    scope.say('The round is ready to begin!');
    scope.currentState = 'submit';
    scope.voteId = null;
  };
  messageTypes.vote = function (scope, data) {
    scope.gameState = data.game;
    scope.say('Please vote for your favorite line');
    scope.currentState = 'vote';
  };
  messageTypes.voteRejected = function (scope, data) {
    scope.say(data.message);
    scope.voteId = null;
  };
  messageTypes.finished = function (scope, data) {
    scope.gameState = data.game;
    scope.winner = getWinner(data.game.players);
    scope.currentState = 'finished';
  };
  return {
    handle: function (scope, data) {
      console.log('received:' + data.code);
      if(scope.currentState === 'finished') {
        return;
      }
      if(messageTypes[data.code]) {
        return messageTypes[data.code](scope, data);
      } else {
        scope.say('found an unrecognized message:' + JSON.stringify(data));
      }
    }
  };
});
