angular.module('astorytellingGameApp').directive('winningLine', function () {
  return {
    scope: {
      'winningLine': '='
    },
    template: '<p>{{winner()}}</p>',
    link: function (scope, element, attrs) {
      scope.winner = function () {
        var i;
        var maxScore = -1;
        var winner;
        var currentLine;
        for(i = 0; i < scope.winningLine.length; i++) {
          currentLine = scope.winningLine[i];
          if(!winner || currentLine.score > maxScore) {
            maxScore = currentLine.score;
            winner = currentLine;
          } else if(currentLine.score == maxScore) {
            if(currentLine.content.length < winner.content.length) {
              winner = currentLine;
            }
          }
        }
        return winner.content;
      }
    }
  }
});
