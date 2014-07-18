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

        //reference to firebase
        var answersRef = new Firebase('https://maxwellzirbel.firebaseio.com/answers');
        var questionsRef = new Firebase("https://maxwellzirbel.firebaseio.com/questions").limit(1);
        $scope.questions = $firebase(questionsRef);
        $scope.quests = '';
        $scope.keyR = '';


        $scope.init = function() {
            alert("I got called");
            $scope.data = $scope.questions;

            $scope.data.$on('loaded', $scope.getFirst);
            $scope.data.$on('change', $scope.update);
        }
        

        $scope.getFirst= function(){
            var keys = $scope.data.$getIndex();
            keys.forEach(function(key, i) {
                console.log(i, $scope.data[key]); // Prints items in order they appear in Firebase.
                console.log($scope.keyR);
                $scope.quests = $scope.data[key];
                $scope.keyR = key;
            });
        };

        $scope.update = function(){
            var keys = $scope.data.$getIndex();
            keys.forEach(function(key, i) {
                console.log("in update:  " + i, $scope.data[key]); // Prints items in order they appear in Firebase.
                console.log($scope.keyR);
                $scope.quests = $scope.data[key];
                $scope.keyR = key;
            });
        };

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
