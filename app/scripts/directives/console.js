angular.module('astorytellingGameApp').directive('console', function () {
  return {
    scope: {
      console: '='
    },
    template: '<p ng-repeat="line in console track by $index">{{line}}</p>',
    link: function (scope, element, attrs) {
      scope.$watch('console', function () {
        $('#console')[0].scrollTop = $('#console').height();
      }, true)
    }
  }
})