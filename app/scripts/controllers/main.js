'use strict';

/**
 * @ngdoc function
 * @name realTimeTriviaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the realTimeTriviaApp
 */
angular.module('realTimeTriviaApp')
  .controller('MainCtrl', function ($scope, $firebase) {

        //reference to firebase
        var questionsRef = new Firebase("https://maxwellzirbel.firebaseio.com/questions").limit(1);
        $scope.questions = $firebase(questionsRef);
        $scope.quests = '';
        $scope.keyR = '';

        $scope.init = function() {
            $scope.data = $scope.questions;

            $scope.data.$on('loaded', getFirst);
            $scope.data.$on('change', update);
        }

        function getFirst(){
            var keys = $scope.data.$getIndex();
            keys.forEach(function(key, i) {
                console.log(i, $scope.data[key]); // Prints items in order they appear in Firebase.
                console.log($scope.keyR);
                $scope.quests = $scope.data[key];
                $scope.keyR = key;
            });
        }

        function update(){
            var keys = $scope.data.$getIndex();
            keys.forEach(function(key, i) {
                console.log("in update:  " + i, $scope.data[key]); // Prints items in order they appear in Firebase.
                console.log($scope.keyR);
                $scope.quests = $scope.data[key];
                $scope.keyR = key;
            });
        }

        //these items will get added to the firebase
        $scope.addQuestions = function() {
            $scope.q = [
                {q: "This is question 1", answer: 1, level: 3},
                {q: "this is question 2", answer: 1, level: 3},
                {q: "I will make these objects", answer: 1, level: 4},
                {q: "eventually", answer: 1, level: 2}];
            for (var i = 0; i < $scope.q.length; i++) {
                $scope.questions.$add($scope.q[i]);
            }
        }


        //this gets the first item and then deletes all of them. needs work.
        $scope.answer = function() {
            //alert($scope.keyR[0]);
            $scope.questions.$remove($scope.keyR);
        }
  });
