'use strict';

angular.module('astorytellingGameApp')
  .controller('MainCtrl', function ($scope, messageInterpreter, messageBuilder) {
  $scope.consoleText = ['Welcome to a storytelling game'];
  $scope.say = function (msg) { $scope.consoleText.push(msg); };
  $scope.currentState;
  $scope.gameState;
  $scope.notMine = function (obj) {
    return !obj.player;
  };
  $scope.vote = function (id) {
    var msg = {};
    console.log('Voting for: ' + id);
    if($scope.voteId) {
      $scope.say('You already voted!');
      return;
    }
    msg.submission = id;
    msg.code = 'voteResponse';
    ws.send(JSON.stringify(msg));
    $scope.say('Thank you for your vote');
    $scope.currentState = 'voteResponse';
    $scope.voteId = id;
  }
  $scope.player = {};
  $scope.currentInput = '';
  $scope.connected = false;

  var ws;
  var onopen = function (evt) {
    $scope.say('Connected to server');
    $scope.connected = true;
    $scope.$digest();
  };

  var onclose = function (evt) {
    $scope.say('Connection closed.');
    $scope.connected = false;
    $scope.$digest();
  };
  var onmessage = function (evt) {
    messageInterpreter.handle($scope, JSON.parse(evt.data));
    $scope.$digest();
  };
  var getConnection = function () {
    if($scope.connected) {
      return ws;
    }
    ws = new WebSocket('ws://localhost:8080/');
    ws.onclose = onclose;
    ws.onopen = onopen;
    ws.onmessage = onmessage;
    $scope.ws = ws;
  };

  $scope.send = function () {
    var msg;
    if(!$scope.connected) {
      return;
    }
    msg = messageBuilder.build($scope, $scope.currentInput);
    $scope.currentInput = '';
    if(msg) {
      ws.send(JSON.stringify(msg));
    }
  };
  getConnection();
  });
