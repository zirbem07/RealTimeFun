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
        var questionsRef = new Firebase("https://maxwellzirbel.firebaseio.com/questions");
        $scope.q = [];

        //these items will get added to the firebase
        $scope.makeList = function(ref) {
            $scope.q = ["This is question 1", "this is question 2", "I will make these objects", "eventually"];
            for (var i = 0; i < $scope.q.length; i++) {
                ref.push($scope.q[i]);
            }
        }

        //this gets the first item from the list for displaying
        $scope.getFirstFromList = function(ref, cb) {
            ref.startAt().limit(1).once("child_added", function(snapshot) {
                cb(snapshot.val());
            });
        }

        //this calls make list and get first item and then alerts the value
        $scope.go = function() {
            $scope.makeList(questionsRef);
            $scope.getFirstFromList(questionsRef, function (val) {
                alert(val);
            });
        }

        $scope.questions = $firebase(questionsRef);

        //this gets the first item and then deletes all of them. needs work.
        $scope.answer = function() {
            $scope.getFirstFromList(questionsRef, function (val) {
                $scope.q.push(val);
            });
            console.log($scope.q);
            questionsRef.remove().limit(1);
        }


  });
