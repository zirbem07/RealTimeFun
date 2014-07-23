'use strict';

/**
 * @ngdoc function
 * @name realTimeTriviaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the realTimeTriviaApp
 */

angular.module('realTimeTriviaApp')
  .controller('MainCtrl', function ($scope, $firebase, $filter) {
     //references to firebase
        var answersRef = new Firebase('https://maxwellzirbel.firebaseio.com/answers');
        var questionsRef = new Firebase('https://maxwellzirbel.firebaseio.com/questions');

        $scope.quests = '';
        $scope.currentKey = '';
        $scope.userAnswer = '';
        $scope.answerArr = [];
        $scope.rating = 3;
        $scope.questions = $firebase(questionsRef);
        $scope.answers = $firebase(answersRef);
        console.log($scope.answers);


        $scope.init = function() {
            $scope.data = $scope.questions;
            //binds firebase to controller
            $scope.answers.$remove();
            $scope.data.$on('loaded', $scope.getFirst);
            $scope.data.$on('change', $scope.update);
            $scope.answers.$on('change', $scope.answerCheck);
        }

    var chatRef = new Firebase('https://maxwellzirbel.firebaseio.com/');
    var auth = new FirebaseSimpleLogin(chatRef, function(error, user) {
      if (error) {
        // an error occurred while attempting login
        console.log(error);
      } else if (user) {

        // user authenticated with Firebase, PUT ALL MAIN STUFF HERE-------------------------------------
        console.log(user);
       
       

        

        $scope.getFirst= function(){
            var keys = $scope.data.$getIndex();
            keys.forEach(function(key, i) {
                // Prints items in order they appear in Firebase.
                // console.log(i, $scope.data[key]);
                // console.log($scope.currentKey);
                $scope.quests = $scope.data[key];
                $scope.currentKey = key;
                $scope.rating = 3;//$scope.data[key].difficulty;
            });
        };

        $scope.update = function(){
            var keys = $scope.data.$getIndex();
            keys.forEach(function(key, i) {
                // Prints items in order they appear in Firebase.
                // console.log('in update:  ' + i, $scope.data[key]); 
                // console.log($scope.currentKey);
                $scope.quests = $scope.data[key];
                $scope.currentKey = key;
                $scope.rating = 5; //$scope.data[key].difficulty;
            });
        };

        //these items will get added to the firebase
        $scope.addQuestions = function() {
            $scope.q = [
                {
                    'category': 'animal',
                    'answer': ' REINDEER',
                    'difficulty': 1,
                    'q': 'Taplow United Football Club is an English football club based in the village of Taplow, in the county of Buckinghamshire.'
                },
                {
                    'category': 'animal',
                    'answer': ' DRONES',
                    'difficulty': 1,
                    'q': 'Jeff Swampy Marsh is an American television director, writer, producer, storyboard artist, and actor associated with several animated television series. Marsh was born in Santa Monica, California, where he grew up with a heavily blended family dynamic.'
                },
                {
                    'category': 'animal',
                    'answer': ' FROGS or toads',
                    'difficulty': 1,
                    'q': 'hello'
                },
                {
                    'category': 'animal',
                    'answer': ' GERMAN SHEPHERDS / LABRADOR RETRIEVERS, GOLDEN RETRIEVERS',
                    'difficulty': 1,
                    'q': 'It is filed in the office of the clerk of the court to commence the action. It is in the form of a petition addressed to the judge of the court by name, setting forth the nature and facts of the claim and containing a prayer that process issue in the proper manner.'
                },
                {
                    'category': 'animal',
                    'answer': 'MAX',
                    'difficulty': 1,
                    'q': ' Palacio was born and raised in Los Angeles, California, to Belizean parents and is a Belizean citizen.'
                },
                {
                    'category': 'animal',
                    'answer': ' CATERPILLAR',
                    'difficulty': 1,
                    'q': 'Being There is an album by Norwegian jazz pianist and composer Tord Gustavsen'
                },
                {
                    'category': 'animal',
                    'answer': 'GALAPAGOS',
                    'difficulty': 1,
                    'q': 'I believe in the profession of Journalism.'
                }];

            for (var i = 0; i < $scope.q.length; i++) {
                $scope.questions.$add($scope.q[i]);
            }
        };
        $scope.submitAnswer = function(){
            //get answer from chat input
            var answer = $scope.userAnswer;

            $scope.answers.$add({username: user.username, answer: answer});
            $scope.userAnswer = '';
        };
        $scope.answerCheck = function(){
            var answers = $scope.answers;
            console.log(answers);
            $scope.answerArr = [];
            //after setting answer, retrieve it from firebase one 
            for (var key in answers){
                var obj = answers[key];
                console.log(answers[key]);
                for(var prop in obj){
                    console.log(prop);
                    if(prop == 'answer'){
                        $scope.answerArr.push(obj);
                    }
                }
            }
            console.log($scope.answerArr);
            //this will make it so the chat box is always scrolled to the bottom to see newest additions
            $('.chat li:last-child').show('fast', function(){
                $('.chat').animate({
                    scrollTop: $('.chat')[0].scrollHeight}, 'fast');
                });
        }

        //this gets the first item and then deletes all of them. needs work.
        $scope.answer = function() {
            $scope.userAnswer=$filter('uppercase')($scope.userAnswer);
            $scope.realAnswer=$filter('uppercase')($scope.quests.q);
            //$scope.quests.answer = $scope.quests.answer.trim();
            console.log($scope.userAnswer);
            console.log($scope.realAnswer);
            if($scope.userAnswer == $scope.realAnswer) {
                $scope.questions.$remove($scope.currentKey);
                $scope.quests.answer = '';
            }
        };

        //if user hits 'enter' to submit, call answer function, reset input text
        $('.textAnswer').on('keypress', function(e){
            if(e.keyCode == 13){
                $scope.submitAnswer();
                $(this).val('');
            }
        });

          } else {
            // user is logged out

          }
        });
  });
