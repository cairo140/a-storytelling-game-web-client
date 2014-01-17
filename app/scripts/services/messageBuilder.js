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