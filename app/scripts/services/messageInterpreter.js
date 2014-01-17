angular.module('astorytellingGameApp').factory('messageInterpreter', function () {
  var messageTypes = {};
  messageTypes.identify = function (scope, data) {
    scope.currentState = 'identify';
    scope.say('Please identify yourself:');
  };
  messageTypes.currentPlayerUpdate = function (scope, data) {
    scope.player = data.player;
  };
  messageTypes.gameUpdate = function (scope, data) {
    scope.gameState = data.game;
    console.log(data.game);
    if(scope.currentState == 'identifyResponse') {
      scope.say('Welcome, ' + scope.player.name);
    }
    scope.currentState = 'gameUpdate';
  };
  messageTypes.playerJoined = messageTypes.gameUpdate;
  messageTypes.submit = function (scope, data) {
    scope.gameState = data.game;
    scope.say('The round is ready to begin!');
    scope.currentState = 'submit;'
  };
  return {
    handle: function (scope, data) {
      console.log('received:' + data.code);
      if(messageTypes[data.code]) {
        return messageTypes[data.code](scope, data);
      } else {
        scope.say('found an unrecognized message:' + JSON.stringify(data));
      }
    }
  }
})