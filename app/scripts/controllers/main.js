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
                    "answer": "GIRAFFEs",
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
