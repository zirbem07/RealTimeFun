'use strict';

/**
 * @ngdoc function
 * @name realTimeTriviaApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the realTimeTriviaApp
 */
angular.module('realTimeTriviaApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
