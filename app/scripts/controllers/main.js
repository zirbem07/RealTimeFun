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
        var answersRef = new Firebase('https://maxwellzirbel.firebaseio.com/answers')
        var questionsRef = new Firebase("https://maxwellzirbel.firebaseio.com/questions");

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
        console.log(user)   
       
       

        

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
                // console.log("in update:  " + i, $scope.data[key]); 
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
                    "category": "animal",
                    "answer": " REINDEER",
                    "difficulty": 1,
                    "q": "What is the only kind of deer whose females have antlers?"
                },
                {
                    "category": "animal",
                    "answer": " DRONES",
                    "difficulty": 1,
                    "q": "In the insect world, certain male bees have the enviable task of performing no work. Their primary function is to mate with the queen bee. What are they called?"
                },
                {
                    "category": "animal",
                    "answer": " FROGS or toads",
                    "difficulty": 1,
                    "q": "What are two common names for jumping, tailless amphibia?"
                },
                {
                    "category": "animal",
                    "answer": " GERMAN SHEPHERDS / LABRADOR RETRIEVERS, GOLDEN RETRIEVERS",
                    "difficulty": 1,
                    "q": "What two breeds of dog are most commonly used as seeing-eye dogs or guide dogs for the blind?"
                },
                {
                    "category": "animal",
                    "answer": "Wandering albatross",
                    "difficulty": 1,
                    "q": " With a wing-span of 3.6 meters, or almost 12 feet, what living bird, found mostly in the southern hemisphere, has the largest wingspan?"
                },
                {
                    "category": "animal",
                    "answer": " CATERPILLAR",
                    "difficulty": 1,
                    "q": "From the French term chatepelose, meaning hairy cat,\" comes the appropriate name of what insect?"
                },
                {
                    "category": "animal",
                    "answer": "GALAPAGOS",
                    "difficulty": 1,
                    "q": "Most penguins live in the southernmost lands on earth, such as Antarctica, New Zealand, Australia, and South Africa, and mostly in cold climates, but some penguins can also be found on which islands in the Pacific Ocean near the equator?"
                },
                {
                    "category": "animal",
                    "answer": "GIRAFFE",
                    "difficulty": 1,
                    "q": "New born babies of what animal are six feet tall and weigh almost 200 pounds?"
                },
                {
                    "category": "animal",
                    "answer": "AARDVARK",
                    "difficulty": 1,
                    "q": "What is the first animal listed in the dictionary?"
                },
                {
                    "category": "animal",
                    "answer": " KANGAROO",
                    "difficulty": 1,
                    "q": "A \"joey\" is the baby of what animal?"
                }];
            for (var i = 0; i < $scope.q.length; i++) {
                $scope.questions.$add($scope.q[i]);
            }
        }
        $scope.submitAnswer = function(){
            //get answer from chat input
            var answer = $scope.userAnswer;

            $scope.answers.$add({username: user.username, answer: answer});
            $scope.userAnswer = '';
        }
        $scope.answerCheck = function(){
            var answers = $scope.answers
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
            $scope.quests.answer = $scope.quests.answer.trim();
            if($scope.userAnswer == $scope.quests.answer) {
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
