
angular.module('realTimeTriviaApp')
  .controller('loginCtrl', function ($scope, $firebase) {
    $scope.tagline = "YOYOYO";
    var chatRef = new Firebase("https://maxwellzirbel.firebaseio.com/");
    var usersRef = new Firebase("https://maxwellzirbel.firebaseio.com/users");
        var auth = new FirebaseSimpleLogin(chatRef, function(err, user){
            if(err){
                throw err;
            }
            if(user){
                usersRef.set({uid: user.uid, username: user.username, points: 0});
            }
        });

        $scope.login = function(type){
            console.log($('button').data('type'));
            if ($('button').data('type') == 'twitter'){
                auth.login('twitter');
            }
        };

  });