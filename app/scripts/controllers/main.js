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


    var chatRef = new Firebase('https://maxwellzirbel.firebaseio.com/');
    var auth = new FirebaseSimpleLogin(chatRef, function(error, user) {
      if (error) {
        // an error occurred while attempting login
        console.log(error);
      } else if (user) {
        // user authenticated with Firebase, PUT ALL MAIN STUFF HERE-------------------------------------
        console.log(user)   
        //references to firebase
        var answersRef = new Firebase('https://maxwellzirbel.firebaseio.com/answers')
        var questionsRef = new Firebase("https://maxwellzirbel.firebaseio.com/questions");
        $scope.q = [];

        //these items will get added to the firebase
        $scope.makeList = function(ref) {
            $scope.q = ["This is question 1", "this is question 2", "I will make these objects", "eventually"];
            for (var i = 0; i < $scope.q.length; i++) {
                ref.push($scope.q[i]);
            }
        };

        //this gets the first item from the list for displaying
        $scope.getFirstFromList = function(ref, cb) {
            ref.startAt().limit(1).once("child_added", function(snapshot) {
                cb(snapshot.val());
            });
        };

        //this calls make list and get first item and then alerts the value
        $scope.go = function() {
            $scope.makeList(questionsRef);
            $scope.getFirstFromList(questionsRef, function (val) {
                alert(val);
            });
        };

        $scope.questions = $firebase(questionsRef);

        //this gets the first item and then deletes all of them. needs work.
        $scope.answer = function() {
            var answer = $scope.userAnswer;
            answersRef.set({username: user.username, answer: answer});
            //after setting answer, retrieve it from firebase one time
            answersRef.once('value', function(snapshot){
                var data = snapshot.val();
                $('.chat').append('<li>' + data.username + ': ' + data.answer + '</li>');
            });
            //this will make it so the chat box is always scrolled to the bottom to see newest additions
            $('.chat li:last-child').show('fast', function(){
                $('.chat').animate({
                    scrollTop: $('.chat')[0].scrollHeight}, 'fast');
                });
            //reset userAnswer input box
            $scope.userAnswer = '';

            $scope.getFirstFromList(questionsRef, function (val) {
                $scope.q.push(val);
                console.log($scope.q);
            });
            console.log($scope.q);
            questionsRef.remove().limit(1);
            
        };
        //if user hits 'enter' to submit, call answer function, reset input text
        $('.textAnswer').on('keypress', function(e){
            if(e.keyCode == 13){
                $scope.answer();
                $(this).val('');
            }
        });

          } else {
            // user is logged out

          }
        });
  });
