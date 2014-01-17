'use strict';

angular.module('astorytellingGameApp')
  .controller('MainCtrl', function ($scope) {
  $scope.consoleText = ['Welcome to a storytelling game'];
  $scope.currentInput = '';
  $scope.connected = false;
  var ws;
  var onopen = function (evt) {
    console.log('onopen!');
    $scope.consoleText.push('Connected to server');
    $scope.connected = true;
    $scope.$digest();
  };

  var onclose = function (evt) {
    console.log('onclose!');
    $scope.consoleText.push('Connection closed.');
    $scope.connected = false;
    $scope.$digest();
  };
  var onmessage = function (evt) {
    console.log('onmessage!');
    $scope.consoleText.push(evt.data);
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
    var msg = {};
    console.log('send!');
    if(!$scope.connected) {
      return;
    }
    msg.code = 'identifyResponse';
    msg.name = $scope.currentInput;
    $scope.currentInput = '';
    $scope.consoleText.push('You sent:' + JSON.stringify(msg));
    ws.send(JSON.stringify(msg));
  };
  getConnection();
  });
