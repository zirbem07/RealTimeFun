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


        var questionsRef = new Firebase("https://maxwellzirbel.firebaseio.com/questions");
        $scope.q = ["This is question 1", "this is question 2", "I will make these objects", "eventually"];

        $scope.makeList = function(ref) {

            for (var i = 0; i < $scope.q.length; i++) {
                ref.push($scope.q[i]);
            }
        }

        $scope.getFirstFromList = function(ref, cb) {
            ref.startAt().limit(1).once("child_added", function(snapshot) {
                cb(snapshot.val());
            });
        }

        // Running this should popup an alert with "banana".
        $scope.go = function() {
            $scope.makeList(questionsRef);
            $scope.getFirstFromList(questionsRef, function (val) {
                alert(val);
            });
        }

        $scope.questions = $firebase(questionsRef);
        $scope.addQuestion = function() {

            questionsRef.update({q: "Testing", level: 5, answer: "YES"});
            console.log(questionsRef);
        };


        $scope.answer = function() {
            console.log($scope.questions[0]);
            $scope.q.splice(0, 1);
            console.log($scope.questions[0]);
            questionsRef.remove().limit(1);
        }


  });
