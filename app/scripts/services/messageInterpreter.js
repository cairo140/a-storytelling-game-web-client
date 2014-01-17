angular.module('astorytellingGameApp').factory('messageInterpreter', function () {
  var messageTypes = {};
  messageTypes.identify = function (scope, data) {
    scope.currentState = 'identify';
    scope.say('Please identify yourself:');
  };
  messageTypes.gameUpdate = function (scope, data) {
    scope.gameState = data.game;
    console.log(data.game);
    if(scope.currentState == 'identifyResponse') {
      scope.say('Welcome, ' + scope.player.name);
    }
    scope.currentState = 'gameUpdate';
  };
  return {
    handle: function (scope, data) {
      if(messageTypes[data.code]) {
        return messageTypes[data.code](scope, data);
      } else {
        scope.say('found an unrecognized message:' + JSON.stringify(data));
      }
    }
  }
})