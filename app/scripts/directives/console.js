'use strict';
angular.module('astorytellingGameApp').directive('console', function ($window) {
  return {
    scope: {
      console: '='
    },
    template: '<p ng-repeat="line in console track by $index">{{line}}</p>',
    link: function (scope, element) {
      scope.$watch('console', function () {
        element.scrollTop = $window.jQuery(element).height();
      }, true);
    }
  };
});
