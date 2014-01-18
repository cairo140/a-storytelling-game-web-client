angular.module('astorytellingGameApp').factory('messageBuilder', function () {
  var messageTypes = {};
  messageTypes.identify = function (scope, data) {
    var msg = {};
    msg.code = 'identifyResponse';
    msg.name = data;
    scope.player.name = data;
    scope.currentState = 'identifyResponse';
    return msg;
  };
  messageTypes.identifyResponse = function (scope, data) {
    scope.say('Waiting for server response, please be patient');
    return null;
  };
  messageTypes.submit = function (scope, data) {
    var msg = {};
    msg.code = 'submitResponse';
    msg.content = data;
    scope.currentState = 'submitResponse';
    scope.say('Thank you for your submission!');
    return msg;
  };
  messageTypes.submitResponse = function (scope, data) {
    scope.say('You\'ve already sent a response');
    return null;
  };
  messageTypes.gameUpdate = function (scope, data) {
    scope.say('Waiting for other players...');
    return null;
  }
  messageTypes.vote = function (scope, data) {
    scope.say('Please click on your favorite submission');
    return null;
  }
  messageTypes.finished = function (scope, data) {
    return null;
  }
  return {
    build: function (scope, data) {
      if(messageTypes[scope.currentState]) {
        return messageTypes[scope.currentState](scope, data);
      } else {
        scope.say('do not understand how to respond while in state:' + scope.currentState);
      }
    }
  }
})